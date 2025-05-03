import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@heroui/button";
import { callGeminiAPI, prepareCountryContext } from '../services/geminiService';

const GeminiChat = ({ country }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Initialize with welcome message when country data is available
    if (country) {
      setChatMessages([{
        role: "system",
        content: `Welcome! Ask me anything about ${country.name.common}.`
      }]);
    }
  }, [country]);

  useEffect(() => {
    // Automatically scroll to the bottom of chat when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Function to send message to Gemini API
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !country) return;
    
    // Add user message to chat
    const userMessage = {
      role: "user",
      content: inputMessage
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setChatLoading(true);
    
    try {
      // Prepare country context using the imported function
      const countryContext = prepareCountryContext(country);
      
      // Call the Gemini API using the imported service function
      const response = await callGeminiAPI(inputMessage, countryContext);
      
      // Add AI response to chat
      const aiMessage = {
        role: "assistant",
        content: response
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Add error message to chat
      const errorMessage = {
        role: "system",
        content: "Sorry, I couldn't process your request. Please try again."
      };
      
      setChatMessages(prev => [...prev, errorMessage]);
      console.error("Gemini API error:", error);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Need More Information ?</h2>
      <h2 className="text-2xl font-bold mb-4">Just Ask Away!!!</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        {/* Chat messages container */}
        <div 
          ref={chatContainerRef}
          className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          {chatMessages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 ${
                msg.role === "user" 
                  ? "text-right" 
                  : msg.role === "system" 
                    ? "text-center italic text-gray-500 dark:text-gray-400" 
                    : "text-left"
              }`}
            >
              <div 
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.role === "user" 
                    ? "bg-primary text-white rounded-br-none" 
                    : msg.role === "system" 
                      ? "bg-gray-200 dark:bg-gray-600" 
                      : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {chatLoading && (
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Chat input form */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask anything about ${country.name.common}...`}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={chatLoading}
          />
          <Button 
            type="submit" 
            disabled={chatLoading || !inputMessage.trim()}
            className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GeminiChat;