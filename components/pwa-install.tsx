"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DownloadCloud } from "lucide-react";

const InstallPWA = () => {
  const [prompt, setPrompt] = useState<any>(null);
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt();
    }
  };

  return (
    <Button size={"icon"} onClick={handleInstallClick}>
      <DownloadCloud className="h-4 w-4" />
    </Button>
  );
};

export default InstallPWA;
