import { BellIcon, HomeIcon, UserIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { currentUser } from "@clerk/nextjs/server";


async function DesktopNavbar() {

  const user = await currentUser();
  return (
    <div className="hidden md:flex w-full items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <ModeToggle />
      </div>

      {/* Center Section */}
      <div className="flex justify-center flex-1">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary font-mono tracking-wider">The Univillage </span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-1">
        <div className="relative mr-1">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/">
              <HomeIcon className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
        </div>

        {user ? (
          <>
            <div className="relative">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="/notifications">
                  <BellIcon className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Link>
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="/search">
                <SearchIcon className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>

            <div className="relative ml-1">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link
                  href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
                    }`}
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
            </div>

            <div className="pl-2 border-l ml-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8"
                  }
                }}
              />
            </div>
          </>
        ) : (
          <SignInButton mode="modal">
            <Button variant="default" size="sm" className="rounded-full px-4">
              Sign In
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default DesktopNavbar;
