import { Imessage, useMessage } from "@/lib/store/messages";
import React from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/lib/store/user";

const Message = ({ message }: { message: Imessage }) => {
  const user = useUser((state) => state.user);

  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.users?.avatar_url!}
          alt={message.users?.display_name!}
          width={40}
          height={40}
          className="rounded-full shadow-xl"
        />
      </div>
      <div className="flex-1 overflow-x-hidden">
        <div className="flex items-center justify-between">
          <div className="mb-2">
            <h1 className="font-bold">{message.users?.display_name}</h1>
            <h1 className="text-xs text-secondary-foreground">
              {new Date(message.created_at).toLocaleString()}
            </h1>
            {message.is_edit && (
              <h1 className="text-xs text-secondary-foreground">edited</h1>
            )}
          </div>
          {message.users?.id === user?.id && <MessageMenu message={message} />}
        </div>
        <p className="break-words font-medium bg-primary text-black rounded-r-3xl rounded-bl-3xl p-4 w-fit">
          {message.text}
        </p>
      </div>
    </div>
  );
};

const MessageMenu = ({ message }: { message: Imessage }) => {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-edit")?.click();
            setActionMessage(message);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-delete")?.click();
            setActionMessage(message);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Message;
