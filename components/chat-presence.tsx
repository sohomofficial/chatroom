"use client";
import { useUser } from "@/lib/store/user";
import { supabaseClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { UserRound, UsersRound } from "lucide-react";

const ChatPresence = () => {
  const user = useUser((state) => state.user);
  const supabase = supabaseClient();
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const channel = supabase.channel("room1");
    channel
      .on("presence", { event: "sync" }, () => {
        const userIds = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
        }
        setOnlineUsers(Array.from(new Set(userIds)).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) {
    return <div className=" h-3 w-1"></div>;
  }

  return (
    <Badge>
      {onlineUsers > 1 ? (
        <UsersRound className="h-4 w-4" />
      ) : (
        <UserRound className="h-4 w-4" />
      )}
      <h1 className="text-sm ml-1">{onlineUsers} online</h1>
    </Badge>
  );
};

export default ChatPresence;
