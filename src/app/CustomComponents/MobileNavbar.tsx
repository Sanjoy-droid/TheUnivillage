
"use client";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn, userId } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center w-full justify-between">
      {/* Left-aligned menu icon */}
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-2">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        {/* Menu slides in from left */}
        <SheetContent side="left" className="w-[280px]">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle>The Univillage</SheetTitle>
          </SheetHeader>

          {/* Theme Toggle */}
          <div className="flex justify-between items-center my-4 px-2">
            <span className="text-sm text-muted-foreground">Theme</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-2 mt-4">
            <Button variant="ghost" className="flex items-center gap-3 justify-start px-2" asChild>
              <Link href="/" onClick={() => setShowMobileMenu(false)}>
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button variant="ghost" className="flex items-center gap-3 justify-start px-2" asChild>
                  <Link href="/notifications" onClick={() => setShowMobileMenu(false)}>
                    <BellIcon className="w-5 h-5" />
                    Notifications
                  </Link>
                </Button>

                <Button variant="ghost" className="flex items-center gap-3 justify-start px-2" asChild>
                  <Link href={`/profile/${userId}`} onClick={() => setShowMobileMenu(false)}>
                    <UserIcon className="w-5 h-5" />
                    Profile
                  </Link>
                </Button>

                {/* Account & Logout Section */}
                <div className="pt-2 border-t mt-4 px-2">
                  <div className="flex items-center gap-3 py-3">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-sm font-medium">Account</span>
                  </div>

                  <SignOutButton>
                    <Button variant="ghost" className="flex items-center gap-3 justify-start w-full px-2">
                      <LogOutIcon className="w-5 h-5" />
                      Logout
                    </Button>
                  </SignOutButton>
                </div>
              </>
            ) : (
              <SheetFooter className="mt-4 sm:mt-0">
                <SignInButton mode="modal">
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </SignInButton>
              </SheetFooter>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Title in center */}
      <h1 className="text-lg font-semibold">The Univillage</h1>
    </div>
  );
}

export default MobileNavbar;
