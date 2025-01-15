'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon, 
  ArrowPathIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  XMarkIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import ChatMessage from './components/ChatMessage';
import DocumentList from './components/DocumentList';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  feedback?: 'positive' | 'negative';
}

interface Document {
  id: string;
  title: string;
  category: string;
  version: string;
  lastModified: string;
}

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedDocument) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Analyzing ${selectedDocument.title} (Version ${selectedDocument.version}): This is a simulated AI response. In the actual implementation, this would analyze the selected document.`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleFeedback = (messageId: string, type: 'positive' | 'negative') => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, feedback: type }
          : msg
      )
    );
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the conversation?')) {
      setMessages([]);
    }
  };

  const handleExport = () => {
    const exportData = {
      document: selectedDocument,
      conversation: messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content,
        timestamp: msg.timestamp
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-6">
      {/* Document Selection Sidebar */}
      <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Select Document</h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose a document to analyze
          </p>
        </div>
        <DocumentList
          onSelect={setSelectedDocument}
          selectedDocument={selectedDocument}
        />
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AI Playground</h2>
              {selectedDocument && (
                <p className="text-sm text-gray-500 mt-1">
                  Analyzing: {selectedDocument.title} (Version {selectedDocument.version})
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleReset}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                title="Reset Conversation"
              >
                <ArrowPathIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleExport}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                title="Export Conversation"
              >
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {selectedDocument ? (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="relative group">
                  <ChatMessage
                    message={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                  {!message.isUser && (
                    <div className="absolute right-0 top-0 hidden group-hover:flex items-center space-x-2">
                      <button
                        onClick={() => handleFeedback(message.id, 'positive')}
                        className={`p-1 rounded-lg ${
                          message.feedback === 'positive'
                            ? 'text-green-600 bg-green-50'
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                        }`}
                      >
                        <HandThumbUpIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'negative')}
                        className={`p-1 rounded-lg ${
                          message.feedback === 'negative'
                            ? 'text-red-600 bg-red-50'
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <HandThumbDownIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <div className="flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about the selected document..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2861eb] focus:border-transparent resize-none"
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="self-end px-4 py-2 bg-[#2861eb] text-white rounded-lg hover:bg-[#2861eb]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Document Selected</h3>
              <p className="text-gray-500">
                Select a document from the sidebar to start analyzing
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
