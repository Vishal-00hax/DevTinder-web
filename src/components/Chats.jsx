import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constents";

function Chats() {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const { chatUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, chatUserId, firstName });
    socket.on("messageReceived", ({ firstName, newMessage }) => {
      setMessage((pervMessage) => [...pervMessage, { firstName, newMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, chatUserId, firstName]);

  // Send messages on "sendMessage" event to backend
  const sendMessage = () => {
    const socket = createSocketConnection();
    if (!socket) return;
    socket.emit("sendMessage", { userId, chatUserId, firstName, newMessage });
    setNewMessage("");
  };

  const getUserChats = async () => {
    try {
      const res = await axios.get(BASE_URL + `/user-chats/chat/${chatUserId}`, {
        withCredentials: true,
      });

      const chatMessages = res.data?.data?.message.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          newMessage: msg?.text,
          timeStemp: msg?.createdAt,
        };
      });

      setMessage(chatMessages);
    } catch (err) {
      console.log(err.response?.data);
      console.log(err.response?.data?.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserChats();
  }, []);

  // This converts "2026-06-26T17:38:10.713Z" to "5:38 PM"
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[75vh] md:h-600px w-full max-w-2xl mx-auto bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden">
      {/* Chat Header Section */}
      <div className="px-4 md:px-6 py-4 bg-base-100 border-b border-base-300 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
          <div>
            <h2 className="text-base md:text-lg font-black tracking-tight text-base-content">
              Chats
            </h2>
            <p className="text-[10px] md:text-xs text-base-content/50 font-medium">
              Active Session
            </p>
          </div>
        </div>
        <span className="badge badge-xs md:badge-sm badge-success/10 text-success border-none font-bold uppercase tracking-wider px-2.5 py-2">
          Live
        </span>
      </div>

      {/* Chat Messages Stream Viewport Area */}
      {/* This container handles the isolated scrolling logic */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-base-200/40 space-y-3 custom-scrollbar">
        {message?.map((chat, index) => {
          if (!chat) return null;

          // Conditional assignment: Checks if the message was sent by the logged-in user
          const isOwnMessage = chat.firstName === firstName;

          return (
            <div
              key={index}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"} transition-all duration-200 animate-fadeIn`}
            >
              {/* Sender Name Title */}
              <div className="chat-header text-[10px] opacity-40 font-bold mb-0.5 px-1 capitalize">
                {chat.firstName}
              </div>

              {/* Dynamic Message Bubble Box */}
              <div
                className={`chat-bubble rounded-2xl text-xs md:text-sm font-medium shadow-sm max-w-[85%] md:max-w-md wrap-break-word ${
                  isOwnMessage
                    ? "chat-bubble-primary font-bold shadow-primary/10 text-primary-content rounded-tr-none"
                    : "chat-bubble-neutral text-neutral-content rounded-tl-none"
                }`}
              >
                {chat.newMessage}
              </div>
              <div className="chat-footer text-[10px] opacity-50 mt-1">
                {formatTime(chat.timeStemp)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Input Console Form Footer Block */}
      <div className="p-3 md:p-4 bg-base-100 border-t border-base-300 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2 bg-base-200 border border-base-300 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 rounded-xl px-3 py-1.5 md:py-2 transition-all duration-200"
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full bg-transparent border-none text-base-content placeholder-base-content/40 focus:outline-none text-xs md:text-sm font-medium px-1"
          />

          <button
            type="submit"
            className="btn btn-primary btn-xs md:btn-sm h-8 md:h-9 rounded-lg font-bold uppercase tracking-wider px-3 md:px-4 gap-1.5 shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-300 shrink-0"
          >
            <span className="hidden xs:inline text-[10px] md:text-xs">
              Send
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 md:h-3.5 md:w-3.5 transform rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
