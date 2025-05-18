'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();
  const [displayedQuote, setDisplayedQuote] = useState<string>('');
  const [clickedEmojis, setClickedEmojis] = useState<Set<string>>(new Set());
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState<number>(0);

  const emojiQuotes: { [key: string]: string } = {
    '😊': "\"Joy is the simplest form of gratitude.\"",
    '🙂': "\"Contentment is natural wealth.\"",
    '😐': "\"Sometimes, it's okay to just be.\"",
    '😟': "\"Feeling worried means you care deeply.\"",
    '😭': "\"Tears are words the heart can't speak.\"",
  };
  
  const emojis = ['😊', '🙂', '😐', '😟', '😭'];

  const handleEmojiClick = (emoji: string) => {
    if (clickedEmojis.has(emoji)) return;
    
    setClickedEmojis(prev => {
      const newSet = new Set(prev);
      newSet.add(emoji);
      return newSet;
    });
    
    setDisplayedQuote(emojiQuotes[emoji]);
    setCurrentEmojiIndex(prev => prev + 1);
  };

  useEffect(() => {
    if (clickedEmojis.size === emojis.length) {
      // Redirect to story page after all emojis are clicked
      setTimeout(() => {
        router.push('/story');
      }, 1000);
    }
  }, [clickedEmojis.size, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white">
      {/* Central Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to HueMe!</h2>
        <p className="text-gray-600 mb-4">
          We are more than just 'good' or 'bad' days. We are complex, colorful, shifting mosaics of emotions. Yet,
          we rarely pause to see them. HueMe was born from that gap — to help people track, understand, and
          honor their moods with kindness.
        </p>
        <p className="italic text-gray-600 mb-8">
          No judgment. Just color. Just feeling. Just you.
        </p>
        
        {/* Emojis for quotes */}
        <div className="flex justify-center space-x-4 mb-8">
          {emojis.map((emoji, index) => (
            <button
              key={emoji}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition duration-200 ${
                clickedEmojis.has(emoji) 
                  ? 'opacity-0 scale-0' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => handleEmojiClick(emoji)}
              disabled={clickedEmojis.has(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Quote Display */}
        <div className="min-h-[4rem] flex items-center justify-center border rounded-lg p-4 mb-8">
          <p className="text-gray-700 text-lg">{displayedQuote}</p>
        </div>

        <p className="text-sm text-gray-500">
          {currentEmojiIndex} of {emojis.length} emotions explored
        </p>
      </div>
    </div>
  );
} 