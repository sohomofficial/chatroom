"use client";

import { Button } from "./ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPresence from "./chat-presence";
import { ModeToggle } from "./mode toggle";
import Link from "next/link";
import { LucideLogIn, LucideLogOut } from "lucide-react";

const ChatHeader = ({ user }: { user: User | undefined }) => {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = supabaseClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">Chatroom</h1>
          <ChatPresence />
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          {user ? (
            <Button onClick={handleLogout}>
              <span className="hidden sm:block">Logout</span>
              <LucideLogOut className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Link href="/auth">
              <Button>
                <span className="hidden sm:block">Login</span>
                <LucideLogIn className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
