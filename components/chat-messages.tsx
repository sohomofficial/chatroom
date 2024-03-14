import { Suspense } from "react";
import MessagesList from "./message-list";
import { supabaseServer } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/initMessages";
import { LIMIT_MESSAGE } from "@/constants";

const ChatMessages = async () => {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from("messages")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", { ascending: false });

  return (
    <Suspense fallback={"Loading..."}>
      <MessagesList />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
};

export default ChatMessages;
