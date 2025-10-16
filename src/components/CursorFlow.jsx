import React, { useEffect, useState } from "react";

const CursorFollower = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(99,102,241,0.3)", // indigo-500 with opacity
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "background 0.2s",
        zIndex: 1000,
        boxShadow: "0 0 16px 4px rgba(99,102,241,0.2)",
      }}
    />
  );
};

export default CursorFollower;