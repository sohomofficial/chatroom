import Image from "next/image";

const ChatAbout = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Chatroom
        </h1>
        <p className="max-w-lg">
          This is a chat application that is powered by supabase realtime db.
          Login to send message! 💬🚀
        </p>
        <div className="flex justify-center">
          <Image
            src="/home-img.svg"
            alt="People chatting"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAbout;
