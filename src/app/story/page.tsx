'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function StoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
        
        <div className="space-y-4 text-gray-600 mb-8">
          <p>
            HueMe was born from a simple observation: while we experience a rich tapestry of emotions every day,
            we often reduce them to just "good" or "bad" days. We wanted to change that.
          </p>
          
          <p>
            Our journey began when we realized that understanding our emotions is not just about tracking them,
            but about embracing them with kindness and curiosity. Each emotion, whether it's joy, contentment,
            or even sadness, tells a story about who we are and what matters to us.
          </p>
          
          <p>
            With HueMe, we've created a space where you can explore your emotional landscape without judgment.
            Where every mood is valid, every feeling is acknowledged, and every day is an opportunity to understand
            yourself better.
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="inline-block bg-green-600 text-white py-3 px-8 rounded-lg shadow hover:bg-green-700 transition duration-200 text-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
} 