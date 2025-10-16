import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const TTSOverlay = ({ audioUrls = [], onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (audioUrls.length === 0) return;

    const newAudio = new Audio(audioUrls[currentIndex]);
    setAudio(newAudio);
    newAudio.play().catch((err) => {
      // Suppress AbortError and NotSupportedError
      if (
        err.name !== "AbortError" &&
        err.name !== "NotSupportedError"
      ) {
        // Optionally log other errors
        console.error("Audio play error:", err);
      }
      // If NotSupportedError, skip to next chunk or close
      if (err.name === "NotSupportedError") {
        if (currentIndex < audioUrls.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onClose();
        }
      }
    });

    newAudio.onended = () => {
      if (currentIndex < audioUrls.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // All chunks played, auto-close
        onClose();
      }
    };

    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, [currentIndex, audioUrls, onClose]);

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
      {/* Animated dots */}
      <div className="flex gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-indigo-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Stop button */}
      <button
        onClick={handleStop}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white shadow-lg"
      >
        <X size={20} /> Stop
      </button>
    </div>
  );
};

export default TTSOverlay;
