import React, { useState } from 'react';
import { Video, Phone, Mic, MicOff, VideoOff, MessageSquare } from 'lucide-react';
import Webcam from 'react-webcam';

export default function Telemedicine() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Virtual Consultation</h2>
          <p className="text-sm text-gray-500">Dr. Sarah Wilson</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Connected
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MessageSquare 
              className="w-5 h-5 text-gray-600"
              onClick={() => setShowChat(!showChat)}
            />
          </button>
        </div>
      </div>

      <div className="flex h-[600px]">
        <div className="flex-1 bg-gray-900 relative">
          {isVideoOn ? (
            <Webcam
              audio={isAudioOn}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-center">
                <VideoOff className="w-12 h-12 mx-auto mb-2" />
                <p>Video is turned off</p>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`p-3 rounded-full ${
                isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isAudioOn ? (
                <Mic className="w-6 h-6 text-white" />
              ) : (
                <MicOff className="w-6 h-6 text-white" />
              )}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full ${
                isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isVideoOn ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>
            <button className="p-3 rounded-full bg-red-500 hover:bg-red-600">
              <Phone className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {showChat && (
          <div className="w-80 border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-medium">Chat</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Chat messages would go here */}
              </div>
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}