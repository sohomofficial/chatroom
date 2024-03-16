"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const InstallPWA = () => {
  const [showButton, setShowButton] = useState<Boolean>(false);
  const [prompt, setPrompt] = useState<any>(null);
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event);
      if (!window.matchMedia("(display-mode: standalone)").matches) {
        setShowButton(true);
      }
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
    <div>
      {showButton && (
        <Button size={"icon"} onClick={handleInstallClick}>
          <Download className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default InstallPWA;
