import React from 'react';
import { Typography, Paper, Fade } from '@mui/material';
import type { Mood } from '../App';

interface MoodQuoteProps {
  mood: Mood | null;
}

const quotes = {
  happy: [
    "In the garden of life, happiness is the most beautiful flower. Your joy today is a testament to your resilience and the beauty of your spirit. Keep nurturing this garden, for your happiness inspires others to bloom.",
    "Your smile is like sunshine after rain, bringing warmth and light to everyone around you. Today's happiness is a precious gift - cherish it, share it, and let it fill your heart with gratitude.",
    "Happiness is not just a feeling; it's a choice you make every day. Your positive energy is a beacon of hope, showing others that joy is possible even in challenging times.",
    "Like a butterfly emerging from its cocoon, your happiness today represents growth and transformation. This moment of joy is a celebration of your journey and the beautiful soul you are becoming.",
    "Your happiness is a masterpiece painted with the colors of your experiences. Each joyful moment is a brushstroke that creates a beautiful picture of your life's journey."
  ],
  good: [
    "Life is a beautiful journey, and today you're walking it with grace and positivity. Your good mood is a reflection of your inner strength and the wisdom to appreciate life's simple pleasures.",
    "Every good day is a gift, a reminder that life is full of possibilities. Your positive energy today is like a gentle breeze that brings fresh air to your soul and those around you.",
    "In the symphony of life, your good mood is a harmonious note that adds beauty to the world. Keep playing your part, for your positivity creates a melody that others can dance to.",
    "Your good mood is like a garden in spring - full of potential and promise. It's a testament to your ability to find joy in the present moment and hope in the future.",
    "Today's good mood is a reflection of your inner peace and contentment. Like a calm lake reflecting the sky, your positive energy creates ripples of joy that touch everyone around you."
  ],
  neutral: [
    "In the ebb and flow of emotions, neutrality is a peaceful harbor. It's okay to be in this calm space, to breathe, to observe, and to simply be. Your feelings are valid, and this moment of balance is part of your journey.",
    "Life is like a river - sometimes it flows rapidly, sometimes it's still. Your neutral mood today is like a quiet pool, reflecting the wisdom to accept things as they are and find peace in the present moment.",
    "In the garden of emotions, neutrality is the fertile soil from which all feelings grow. This balanced state is a gift of clarity, allowing you to observe your thoughts and feelings with gentle awareness.",
    "Your neutral mood is like a blank canvas, full of possibilities. It's a space of potential, where you can choose what to create next in your life's masterpiece.",
    "Like the eye of a storm, your neutral state is a place of calm observation. It's a moment to gather your thoughts, to reflect, and to prepare for whatever comes next in your journey."
  ],
  sad: [
    "Even in the darkest night, stars still shine. Your sadness today is like clouds passing through the sky - temporary, but real. Remember that every emotion, including sadness, is a part of your beautiful human experience.",
    "Your tears are like rain that waters the garden of your soul. This sadness, though heavy, is helping you grow stronger roots. Tomorrow's sun will rise, and with it, new possibilities will bloom.",
    "In the symphony of life, sadness is a deep, rich note that adds depth to your story. It's okay to feel this way, to acknowledge the pain, and to know that brighter days are coming.",
    "Like a tree in winter, your sadness is a natural part of your growth cycle. The leaves may fall, but the roots grow deeper, preparing for a new season of blossoming and renewal.",
    "Your sadness is like a storm that will pass, leaving behind clearer skies and a stronger spirit. Each tear is a step toward healing, each moment of pain a lesson in resilience."
  ],
  verySad: [
    "In the depths of your sadness, remember that you are not alone. Like a phoenix rising from ashes, your spirit has the power to transform pain into strength. This darkness is temporary, and your light will shine again.",
    "Your tears are like diamonds in the rough - precious and valuable. This deep sadness is carving you into a stronger, more compassionate person. Hold on to hope, for it's the thread that will lead you back to light.",
    "Like a seed buried in darkness, your current pain is preparing you for growth. This difficult time is not the end of your story, but a chapter that will make your eventual triumph even more meaningful.",
    "In the garden of your soul, this sadness is like winter - harsh but necessary. It's clearing the way for new growth, new beginnings, and a spring that will bring fresh hope and joy.",
    "Your pain is like a river cutting through stone - it may seem overwhelming now, but it's shaping you into something stronger and more beautiful. This too shall pass, leaving behind a stronger, wiser you."
  ]
};

const MoodQuote = ({ mood }: MoodQuoteProps) => {
  console.log('MoodQuote - received mood:', mood); // Log the received mood prop

  const quote = React.useMemo(() => {
    if (!mood) return "Emotions are the colors of the soul."; // Default introductory quote
    
    // Special case for "Very Sad"
    if (mood.label === "Very Sad") {
      return quotes.verySad[Math.floor(Math.random() * quotes.verySad.length)];
    }
    
    const moodKey = mood.label.toLowerCase().replace(/\s+/g, '') as keyof typeof quotes;
    const moodQuotes = quotes[moodKey];
    return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
  }, [mood]);

  return (
    <Fade in={!!quote} timeout={1000}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          mb: 4,
          background: mood ? `${mood.color}11` : 'transparent',
          borderLeft: mood ? `4px solid ${mood.color}` : 'none',
          transition: 'all 0.5s ease',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: mood ? `linear-gradient(45deg, ${mood.color}11 0%, transparent 100%)` : 'none',
            opacity: 0.5,
            zIndex: 0,
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mood ? `0 8px 32px ${mood.color}22` : '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            textAlign: 'center',
            color: 'text.primary',
            fontSize: '1.2rem',
            lineHeight: 1.8,
            position: 'relative',
            zIndex: 1,
            textShadow: '0 1px 2px rgba(0,0,0,0.05)',
            '&::before': {
              content: '""',
              fontSize: '3rem',
              position: 'absolute',
              top: -20,
              left: -10,
              opacity: 0.2,
              color: 'text.primary',
            },
            '&::after': {
              content: '""',
              fontSize: '3rem',
              position: 'absolute',
              bottom: -40,
              right: -10,
              opacity: 0.2,
              color: 'text.primary',
            }
          }}
        >
          {quote}
        </Typography>
      </Paper>
    </Fade>
  );
};

export default MoodQuote; 