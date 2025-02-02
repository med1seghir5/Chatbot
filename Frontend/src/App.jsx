import { useState } from "react";
import axios from "axios";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const ChangeMsg = (e) => {
    setMessage(e.target.value);
  };

  const HandleMsg = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const response = await axios.post("https://chatbotapi-yudg.onrender.com/api/chatbot", { message });
      setMessages((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
    } catch (err) {
      console.error("Erreur backend : ", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Erreur lors de la communication avec le chatbot." }]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg border-2 border-gray-300 bg-white rounded-lg shadow-md">

        <div className="flex items-center gap-2 bg-blue-500 rounded-t-lg p-3">
          <img src="./WappGPT - logo.svg" className="h-16" alt="WappGPT Logo" />
          <h1 className="text-2xl font-bold text-white">Chatbot</h1>
        </div>

        <div className="h-100 overflow-auto border-b-2 border-gray-300 p-2 mb-2 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-3 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white font-semibold self-end"
                  : "bg-gray-200 text-black font-semibold self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <p className="text-gray-500">Chatbot is typing...</p>}
        </div>

        <div className="flex flex-row justify-center items-center p-3 space-x-2">
          <textarea
            className="w-full text-left font-medium rounded-lg border-2 border-gray-500 h-14 p-2"
            placeholder="Entrez votre message..."
            value={message}
            onChange={ChangeMsg}
          />
          
          <button onClick={HandleMsg} disabled={loading}>
            <img src="./Send.svg" alt="Send" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;
