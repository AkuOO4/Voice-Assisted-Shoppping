import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Mic, MicOff, Send, Bot, User } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { products } from '../data/products';

interface ChatBotProps {
  onAddToCart: (product: Product) => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your shopping assistant. You can tell me what you're looking for, and I'll help you find the perfect products. Try saying something like 'I need a new phone' or 'Show me kitchen appliances'.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const findProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    const keywords = lowercaseQuery.split(' ');
    
    return products.filter(product => {
      const searchText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword));
    }).slice(0, 4); // Limit to 4 products
  };

  const generateResponse = (userMessage: string): { text: string; products?: Product[] } => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Check for specific product requests
    if (lowercaseMessage.includes('phone') || lowercaseMessage.includes('iphone')) {
      const phoneProducts = findProducts('phone iphone');
      return {
        text: "I found some great phones for you! Here are my top recommendations:",
        products: phoneProducts
      };
    }
    
    if (lowercaseMessage.includes('tv') || lowercaseMessage.includes('television')) {
      const tvProducts = findProducts('tv television');
      return {
        text: "Here are some excellent TV options:",
        products: tvProducts
      };
    }
    
    if (lowercaseMessage.includes('shoes') || lowercaseMessage.includes('sneakers')) {
      const shoeProducts = findProducts('shoes sneakers nike');
      return {
        text: "Check out these popular shoes:",
        products: shoeProducts
      };
    }
    
    if (lowercaseMessage.includes('kitchen') || lowercaseMessage.includes('cooking')) {
      const kitchenProducts = findProducts('kitchen cooking mixer pot');
      return {
        text: "Here are some fantastic kitchen products:",
        products: kitchenProducts
      };
    }
    
    if (lowercaseMessage.includes('headphones') || lowercaseMessage.includes('audio')) {
      const audioProducts = findProducts('headphones audio sony');
      return {
        text: "These headphones offer amazing sound quality:",
        products: audioProducts
      };
    }
    
    if (lowercaseMessage.includes('vacuum') || lowercaseMessage.includes('cleaning')) {
      const cleaningProducts = findProducts('vacuum cleaning dyson');
      return {
        text: "These cleaning products will help keep your home spotless:",
        products: cleaningProducts
      };
    }
    
    if (lowercaseMessage.includes('clothes') || lowercaseMessage.includes('clothing')) {
      const clothingProducts = findProducts('clothes clothing jeans');
      return {
        text: "Here are some stylish clothing options:",
        products: clothingProducts
      };
    }
    
    // General search
    const foundProducts = findProducts(userMessage);
    if (foundProducts.length > 0) {
      return {
        text: `I found ${foundProducts.length} product${foundProducts.length > 1 ? 's' : ''} that match your search:`,
        products: foundProducts
      };
    }
    
    // Default responses for common queries
    if (lowercaseMessage.includes('help') || lowercaseMessage.includes('what can you do')) {
      return {
        text: "I can help you find products by voice or text! Try telling me what you're looking for, like 'I need a new laptop' or 'Show me home appliances'. You can also use the microphone button to speak your request."
      };
    }
    
    return {
      text: "I couldn't find any products matching your request. Try being more specific, like 'phone', 'kitchen appliances', 'shoes', or 'headphones'. What are you looking for today?"
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response
    const response = generateResponse(inputText);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      isUser: false,
      timestamp: new Date(),
      products: response.products
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputText('');
    resetTranscript();
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <span className="font-semibold">Shopping Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                  
                  {/* Product Recommendations */}
                  {message.products && message.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.products.map((product) => (
                        <div key={product.id} className="bg-white p-2 rounded border flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-sm text-green-600 font-semibold">
                              ${product.price}
                            </p>
                          </div>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            {error && (
              <p className="text-red-500 text-xs mb-2">{error}</p>
            )}
            {!isSupported && (
              <p className="text-orange-500 text-xs mb-2">
                Voice recognition not supported in this browser
              </p>
            )}
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening..." : "Ask me about products..."}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isListening}
                />
                {isListening && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              {isSupported && (
                <button
                  onClick={handleVoiceToggle}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              )}
              
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};