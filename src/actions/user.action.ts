"use server";

import FollowButton from "@/app/CustomComponents/FollowButton";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
type ToggleFollowResponse = {
  success: boolean;
  isFollowing?: boolean;
  message?: string;
  error?: string;
};

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) return;
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (existingUser) return existingUser;
    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });
    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export const getUserByClerkId = async (clerkId: string) => {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });
};

export const getDbUserId = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not Found");
  return user.id;
};

export async function getRandomUsersForGuests() {
  try {
    const randomUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 3,
      orderBy: {
        // descending ordering
        createdAt: "desc",
      },
    });
    return randomUsers;
  } catch (error) {
    console.log("Error fetching random users", error);
    return [];
  }
}
export const getRandomUsers = async () => {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    // get 3 random users exclude ourselves & users that we already follow
    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [
          { NOT: { id: userId } },
          {
            NOT: {
              followers: {
                some: {
                  followingId: userId,
                },
              },
            },
          },
        ],
      },

      select: {
        id: true,
        name: true,
        username: true,
        image: true,

        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 3,
    });
    return randomUsers;
  } catch (error) {
    console.log("Error fetching Suggested Users", error);
    return [];
  }
};

export const toggleFollow = async (
  targetUserId: string,
): Promise<ToggleFollowResponse> => {
  try {
    // Get the current user ID from auth
    const userId = await getDbUserId();

    // Add proper validation
    if (!userId) {
      return { success: false, error: "Authentication required" };
    }

    if (userId === targetUserId) {
      return { success: false, error: "You can't follow yourself" };
    }

    // Check if already following
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followingId_followerId: {
          followingId: targetUserId,
          followerId: userId,
        },
      },
    });

    let isNowFollowing = false;

    if (existingFollow) {
      // Unfollow
      await prisma.follows.delete({
        where: {
          followingId_followerId: {
            followingId: targetUserId,
            followerId: userId,
          },
        },
      });
      isNowFollowing = false;
    } else {
      // Follow and create notification
      await prisma.$transaction([
        prisma.follows.create({
          data: {
            followingId: targetUserId,
            followerId: userId,
          },
        }),
        prisma.notification.create({
          data: {
            type: "FOLLOW",
            userId: targetUserId,
            creatorId: userId,
          },
        }),
      ]);
      isNowFollowing = true;
    }

    // Make sure to revalidate relevant paths
    revalidatePath(`/profile/${targetUserId}`);
    revalidatePath(`/profile/${userId}`);
    revalidatePath("/");

    return {
      success: true,
      isFollowing: isNowFollowing,
      message: isNowFollowing
        ? "Followed successfully"
        : "Unfollowed successfully",
    };
  } catch (error) {
    console.error("Error toggling follow:", error);

    // Return meaningful error
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update follow status" };
  }
};

export async function checkIfFollowing(targetUserId: string): Promise<boolean> {
  try {
    const userId = await getDbUserId();

    if (!userId) {
      return false;
    }

    const follow = await prisma.follows.findUnique({
      where: {
        followingId_followerId: {
          followingId: targetUserId,
          followerId: userId,
        },
      },
    });

    return !!follow; // Convert to boolean
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
}
