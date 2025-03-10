"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon, UserCheckIcon, UserPlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow, checkIfFollowing } from "@/actions/user.action";

// Define response types for better type safety
type ToggleFollowResponse = {
  success: boolean;
  isFollowing?: boolean;
  message?: string;
  error?: string;
};

function FollowButton({
  userId,
  initialFollowState = false,
}: {
  userId: string;
  initialFollowState?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialFollowState);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Fetch the actual follow state on component mount
  useEffect(() => {
    // Skip if we've already initialized or if we're in a loading state
    if (hasInitialized || isLoading) return;

    const fetchFollowState = async () => {
      try {
        const followState = await checkIfFollowing(userId);
        setIsFollowing(followState);
      } catch (error) {
        console.error("Error fetching follow state:", error);
      } finally {
        setHasInitialized(true);
      }
    };

    fetchFollowState();
  }, [userId, hasInitialized, isLoading]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const response = (await toggleFollow(userId)) as ToggleFollowResponse;

      if (response?.success) {
        // Only update state if isFollowing is defined
        if (typeof response.isFollowing === "boolean") {
          setIsFollowing(response.isFollowing);
        } else {
          // If backend doesn't return state, toggle locally
          setIsFollowing(!isFollowing);
        }

        toast.success(
          response.message ||
            (!isFollowing
              ? "Followed successfully"
              : "Unfollowed successfully"),
        );
      } else {
        throw new Error(response?.error || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message || "Error toggling follow status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={isFollowing ? "default" : "secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-24 flex items-center gap-1"
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : isFollowing ? (
        <>
          <UserCheckIcon className="size-4" />
          <span>Following</span>
        </>
      ) : (
        <>
          <UserPlusIcon className="size-4" />
          <span>Follow</span>
        </>
      )}
    </Button>
  );
}

export default FollowButton;
