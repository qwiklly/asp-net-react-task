// src/App.jsx
import React, { useState } from "react";
import { ChatBubbleLeftRightIcon, MicrophoneIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://localhost:7127/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.reply || "No reply.");
    } catch {
      setResponse("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-blue-800 to-blue-900 text-white flex">
      <div className="pl-12 pt-6 flex flex-col">
        {/* Иконка */}
        <div className="bg-blue-700 p-2 rounded-lg w-fit">
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-200" />
        </div>
  
        {/* Текст */}
        <div className="mt-20">
          <h1 className="text-4xl font-semibold mb-2">Hi there!</h1>
          <h2 className="mt-10 text-6xl font-extrabold mb-4">What would you like to know?</h2>
          <p className="mt-5 text-base text-blue-300 mb-10">
            Use one of the most common prompts below <br /> or ask your own question
          </p>
        </div>
      

        <div className="mt-20 flex items-center bg-blue-800 border border-blue-600 rounded-full px-5 py-3 shadow-xl max-w-4xl w-full">
            <MicrophoneIcon className="h-5 w-5 text-blue-400 mr-2" />
            <input
            type="text"
            placeholder="Ask whatever you want"
            className="bg-transparent flex-1 focus:outline-none placeholder-blue-400 text-white text-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
            onClick={sendMessage}
            className="ml-4 bg-blue-600 hover:bg-blue-500 p-3 rounded-full transition"
            >
            <ArrowRightIcon className="h-5 w-5 text-white" />
            </button>
        </div>

        {loading ? (
          <div className="mt-6 text-blue-300 italic">Loading...</div>
        ) : (
          response && (
            <div className="mt-6 p-4 bg-blue-700 rounded-lg text-green-300">
              {response}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
