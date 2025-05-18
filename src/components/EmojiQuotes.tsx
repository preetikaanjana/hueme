import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type EmojiQuote = {
  emoji: string;
  quote: string;
  color: string;
};

const emojiQuotes: EmojiQuote[] = [
  {
    emoji: '😄',
    quote: "Happiness is not something ready-made. It comes from your own actions.",
    color: '#4CAF50'
  },
  {
    emoji: '🙂',
    quote: "The little things? The little moments? They aren't little.",
    color: '#8BC34A'
  },
  {
    emoji: '😐',
    quote: "Life is a balance of holding on and letting go.",
    color: '#FFC107'
  },
  {
    emoji: '🙁',
    quote: "It's okay to not be okay. Just don't give up.",
    color: '#FF9800'
  },
  {
    emoji: '😢',
    quote: "Tears are words that need to be written.",
    color: '#F44336'
  }
];

export default function EmojiQuotes() {
  const [clickedEmojis, setClickedEmojis] = useState<Set<string>>(new Set());
  const [currentQuote, setCurrentQuote] = useState<EmojiQuote | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (clickedEmojis.size === emojiQuotes.length) {
      // Add a small delay before navigating to make the last quote visible briefly
      const timer = setTimeout(() => {
        navigate('/welcome');
      }, 1500); // Navigate after 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, [clickedEmojis, navigate]);

  const handleEmojiClick = (emojiQuote: EmojiQuote) => {
    setCurrentQuote(emojiQuote);
    setClickedEmojis(prev => new Set([...prev, emojiQuote.emoji]));
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Adjust for AppBar height when it's visible
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2, // Adjusted top padding to move it below background text
        pb: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          maxWidth: '700px', // Adjust max width as needed
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)', // Softer shadow
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 1,
            fontWeight: 600,
            fontFamily: '"Playfair Display", serif',
            color: 'text.primary',
          }}
        >
          Discover Hueme: Your Emotional Journey
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            color: 'text.secondary',
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
          }}
        >
          Reveal the hues of your heart. You'll move forward once you've explored them all.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, md: 2 }, // Adjust gap for smaller screens
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: currentQuote ? 4 : 0, // Add margin below emojis if quote is shown
          }}
        >
          {emojiQuotes.map((emojiQuote) => (
            <Button
              key={emojiQuote.emoji}
              onClick={() => handleEmojiClick(emojiQuote)}
              sx={{
                fontSize: '2rem',
                minWidth: { xs: '50px', md: '60px' },
                height: { xs: '50px', md: '60px' },
                borderRadius: '50%',
                p: 0,
                border: clickedEmojis.has(emojiQuote.emoji) 
                  ? `2px solid ${emojiQuote.color}`
                  : '2px solid rgba(0, 0, 0, 0.1)', // Light border when not clicked
                transition: 'all 0.3s ease',
                bgcolor: 'transparent',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: `${emojiQuote.color}15`,
                  borderColor: emojiQuote.color, // Border color on hover
                },
              }}
            >
              {emojiQuote.emoji}
            </Button>
          ))}
        </Box>

        {currentQuote && (
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: currentQuote.color,
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
            }}
          >
            "{currentQuote.quote}"
          </Typography>
        )}
      </Paper>
    </Box>
  );
} 