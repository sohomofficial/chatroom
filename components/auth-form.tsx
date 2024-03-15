"use client";

import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AuthForm = () => {
  const [logging, setLogging] = useState(false);
  const handleLoginWithOAuth = (provider: "github") => {
    setLogging(true);
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
          🔐 Login using 📲
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-col gap-6">
          {logging ? (
            <Button disabled>
              Logging In
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleLoginWithOAuth("github");
              }}
            >
              <Github className="h-4 w-4 mr-2" />
              Github
            </Button>
          )}
        </div>
        <p className="mt-10 text-center text-sm">
          For now, we only have Github as the OAuth provider but, will be adding
          others like Google, Facebook, Discord soon. 🌟🔜
        </p>
        <p className="mt-10 text-center">
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

export default AuthForm;
