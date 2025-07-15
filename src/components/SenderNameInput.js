"use client";

import { useState, useTransition } from "react";

export default function SenderNameInput() {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

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
