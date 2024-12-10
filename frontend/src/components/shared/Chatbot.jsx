import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion, user: "You" },
    ]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: aiResponse, user: "AI" },
      ]);
    } catch (error) {
      console.log(error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: "Sorry - Something went wrong. Please try again!",
          user: "AI",
        },
      ]);
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed bottom-5 right-5">
      <div className="relative">
        <button
          className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full text-white hover:animate-pulse"
          aria-label="Chat"
          onClick={() =>
            document.getElementById("chat-popup").classList.toggle("hidden")
          }
        >
          ✨
        </button>

        <div
          id="chat-popup"
          className="absolute bottom-14 right-0 w-80 bg-gradient-to-br from-indigo-500 to-blue-400 shadow-lg border rounded-lg hidden"
        >
          <div className="p-3 border-b bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-sm font-medium text-white">
            Hi, I'm Gimiy!
          </div>
          <div
            ref={chatContainerRef}
            className="max-h-64 overflow-y-auto p-3 border-b text-sm bg-white rounded-t-lg shadow-inner"
          >
            {chatHistory.map((chat, index) => (
              <p
                key={index}
                className={`transition-transform ${
                  chat.user === "You"
                    ? "text-blue-500 translate-x-2"
                    : "text-gray-600 translate-x-0"
                }`}
              >
                <strong>{chat.user}:</strong> {chat.content}
              </p>
            ))}
          </div>
          <div className="p-3 bg-gray-50 rounded-b-lg">
            <input
              type="text"
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={generatingAnswer}
            />
            <button
              onClick={generateAnswer}
              className={`mt-2 w-full p-2 text-white rounded-lg transition-transform duration-300 ${
                generatingAnswer
                  ? "bg-gray-400 scale-95"
                  : "bg-gradient-to-r from-green-400 to-teal-500 hover:scale-105"
              }`}
              disabled={!question.trim() || generatingAnswer}
            >
              {generatingAnswer ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
