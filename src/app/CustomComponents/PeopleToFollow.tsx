import {
  getRandomUsers,
  getDbUserId,
  getRandomUsersForGuests,
} from "@/actions/user.action";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "./FollowButton";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

async function PeopleToFollow() {
  const dbUserId = await getDbUserId();

  let users;

  if (!dbUserId) {
    users = await getRandomUsersForGuests();
  } else {
    users = await getRandomUsers();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>People To Follow</CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <p className="text-muted-foreground text-sm">No users available</p>
        ) : (
          <div
            className={` ${!dbUserId ? " space-y-4 cursor-not-allowed pointer-events-none backdrop-blur-md opacity-50" : "space-y-4"}    `}
          >
            {users.map((user) => (
              <div
                key={user.id}
                className="flex gap-2 items-center justify-between  "
              >
                <div className="flex items-center gap-1">
                  <Link href={`/profile/${user.username}`}>
                    <Avatar>
                      <AvatarImage src={user.image ?? "/avatar.png"} />
                    </Avatar>
                  </Link>
                  <div className="text-xs">
                    <Link
                      href={`/profile/${user?.username ?? ""}`}
                      className="font-medium cursor-pointer"
                    >
                      {(user?.name?.length ?? 0) > 15
                        ? `${user?.name?.slice(0, 15)}...`
                        : (user?.name ?? "")}
                    </Link>
                    <p className="text-muted-foreground">
                      @
                      {(user?.username?.length ?? 0) > 10
                        ? `${user?.username?.slice(0, 10)}...`
                        : (user?.username ?? "")}
                    </p>

                    <p className="text-muted-foreground">
                      {user._count.followers} followers
                    </p>
                  </div>
                </div>

                <FollowButton userId={user.id} />
              </div>
            ))}
          </div>
        )}
        {!dbUserId && users.length > 0 && (
          <div className="mt-4 pt-4 border-t text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Create an account to connect with people
            </p>
            <div className="flex justify-center gap-2">
              <SignInButton mode="modal">
                <Button className="w-auto" variant="default">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PeopleToFollow;
