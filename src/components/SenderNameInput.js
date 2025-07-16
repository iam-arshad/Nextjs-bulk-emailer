"use client";

import { useState, useTransition } from "react";

// SenderNameInput component for entering and saving the sender's name
export default function SenderNameInput() {
  const [name, setName] = useState(""); // State to store the sender's name
  const [isPending, startTransition] = useTransition(); // Transition state for async actions

  // Handles blur event to save the sender's name via API
  const handleBlur = () => {
    if (!name.trim()) return;
    startTransition(async () => {
      await fetch("/api/set-sender-name", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
    });
  };

  // Render the input field for sender's name
  return (
    <input
      name="senderName"
      value={name}
      placeholder="Your Name"
      onChange={(e) => setName(e.target.value)}
      onBlur={handleBlur}
      required
      className="border p-2 w-full mb-4"
    />
  );
}
