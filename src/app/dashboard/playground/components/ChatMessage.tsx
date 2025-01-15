import { UserIcon } from '@heroicons/react/24/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-[#2861eb] flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-[#2861eb]" />
            </div>
          )}
        </div>
        <div>
          <div
            className={`rounded-2xl px-4 py-2 ${
              isUser
                ? 'bg-[#2861eb] text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message}</p>
          </div>
          <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}
