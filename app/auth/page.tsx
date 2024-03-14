"use client";

import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { Chrome, Github } from "lucide-react";
import Link from "next/link";

const Auth = () => {
  const handleLoginWithOAuth = (provider: "google" | "github") => {
    const supabase = supabaseClient();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Login using 📲🔐
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-col gap-6">
          <Button
            onClick={() => {
              handleLoginWithOAuth("google");
            }}
          >
            <Chrome className="h-4 w-4 mr-2" />
            Google
          </Button>
          <Button
            onClick={() => {
              handleLoginWithOAuth("github");
            }}
          >
            <Github className="h-4 w-4 mr-2" />
            Github
          </Button>
        </div>
        <p className="mt-10 text-center text-sm">
          Go back to{" "}
          <Link
            href="/"
            className="font-semibold leading-6 text-primary hover:text-popover-foreground"
          >
            Home
          </Link>{" "}
          🏠🤝
        </p>
      </div>
    </div>
  );
};

export default Auth;
