import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { SignInButton, SignUpButton } from "@/components/auth";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, MailIcon, GithubIcon } from "lucide-react";

const GuestSidebar = ({ title = "Welcome Back!" }) => {
  return (
    <>
      <div className="sticky top-20 w-full max-w-md mx-auto">
        <Card className="shadow-md border-opacity-50 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-xl font-semibold">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground mb-4">
              Login to access your profile and connect with others.
            </p>

            <SignInButton mode="modal">
              <Button
                className="w-full flex justify-between items-center"
                variant="outline"
              >
                <span className="flex items-center">
                  <img
                    src="/api/placeholder/20/20"
                    alt="Google"
                    className="h-4 w-4 mr-2"
                  />
                  Continue with Google
                </span>
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </SignInButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-card text-xs text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            <SignInButton mode="modal">
              <Button
                className="w-full flex justify-between items-center"
                variant="outline"
              >
                <span className="flex items-center">
                  <MailIcon className="h-4 w-4 mr-2" />
                  Login with Email
                </span>
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </SignInButton>
          </CardContent>
          <CardFooter className="flex-col space-y-2 pt-0">
            <p className="text-xs text-center text-muted-foreground">
              Don't have an account?
            </p>
            <SignUpButton mode="modal">
              <Button className="w-full" variant="default">
                Create Account
              </Button>
            </SignUpButton>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default GuestSidebar;
