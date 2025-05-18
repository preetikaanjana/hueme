'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [clickedEmojis, setClickedEmojis] = useState<{[key: string]: boolean}>({});
  const router = useRouter();

  const handleEmojiClick = (emoji: string) => {
    const newClickedEmojis = { ...clickedEmojis, [emoji]: true };
    setClickedEmojis(newClickedEmojis);

    // Check if all emojis have been clicked (assuming 5 emojis for now)
    if (Object.keys(newClickedEmojis).length === 5) {
      // Redirect to the welcome page
      router.push('/welcome');
    }
  };

  const emojis = ['😊', '🙂', '😐', '😟', '😭'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white">
      {/* Title and Subtitle */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-yellow-700">Mood Tracker</h1>
        <p className="text-xl text-gray-600">Your feelings, one hue at a time.</p>
      </div>

      {/* Central Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Discover HueMe: Your Emotional Journey</h2>
        <p className="text-gray-600 mb-8">Click each emoji to reveal a piece of the story.</p>
        
        {/* Emojis */}
        <div className="flex justify-center space-x-4">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl
                ${clickedEmojis[emoji] ? 'bg-green-200' : 'bg-gray-200'}
              `}
              onClick={() => handleEmojiClick(emoji)}
              disabled={clickedEmojis[emoji]}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* The second page content will be on a new route */}
      </div>
    </div>
  );
} 