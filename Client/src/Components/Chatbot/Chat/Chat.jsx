import React, { useEffect, useRef } from "react";
import { Message } from "../Message/Message";

export const Chat = ({ messages }) => {
  const chatEndRef = useRef(null); // Reference for scrolling to the bottom

  useEffect(() => {
    // Scrolling to the bottom when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-3 p-3 bg-gradient-to-b from-cyan-200 to-rose-200 border border-gray-300 rounded-xl shadow-lg max-w-md h-full mx-auto ">
      {messages
        ?.filter((message) => message.role !== "system")
        .map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      <div ref={chatEndRef} /> {/* This div is used to scroll to the bottom */}
    </div>
  );
};
