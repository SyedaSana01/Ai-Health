import React, { useState } from 'react';
import { Search, Edit, Phone, Video, Send, Paperclip } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
}

interface Conversation {
  name: string;
  message: string;
  time: string;
  unread: boolean;
  online: boolean;
  img: string;
  messages: Message[];
}

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      name: 'Dr. Sarah Wilson',
      message: 'Patient follow-up regarding lab results',
      time: '10:30 AM',
      unread: true,
      online: true,
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
      messages: [
        {
          id: 1,
          sender: 'Dr. Sarah Wilson',
          content: 'Hi Dr. Ravi, I need your opinion on these lab results.',
          timestamp: new Date('2024-03-20T10:25:00'),
          isMe: false
        },
        {
          id: 2,
          sender: 'Dr. Ravi',
          content: "I'll take a look right away. Which patient are we discussing?",
          timestamp: new Date('2024-03-20T10:28:00'),
          isMe: true
        }
      ]
    },
    {
      name: 'Nurse John Davis',
      message: 'Updated vitals for Room 204',
      time: '9:15 AM',
      unread: false,
      online: true,
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150',
      messages: []
    },
    {
      name: 'Dr. Emily Chang',
      message: 'Conference meeting at 2 PM',
      time: 'Yesterday',
      unread: false,
      online: false,
      img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150',
      messages: []
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const updatedConversations = [...conversations];
    const newMsg: Message = {
      id: Date.now(),
      sender: 'Dr. Ravi',
      content: newMessage,
      timestamp: new Date(),
      isMe: true
    };

    updatedConversations[selectedConversation].messages.push(newMsg);
    setConversations(updatedConversations);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Messages</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {conversations.map((conversation, index) => (
            <div
              key={index}
              className={`p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                selectedConversation === index ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedConversation(index)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={conversation.img}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.message}</p>
                </div>
                {conversation.unread && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={conversations[selectedConversation].img}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-800">{conversations[selectedConversation].name}</h3>
                <span className="text-xs text-green-500">
                  {conversations[selectedConversation].online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {conversations[selectedConversation].messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isMe
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className={`text-xs ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                    {format(message.timestamp, 'h:mm a')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}