import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Zoom } from '@mui/material';
import type { Mood } from '../App';

interface MoodButtonsProps {
  moods: Mood[];
  onMoodSelect: (mood: Mood, note?: string) => void;
  onEmojiClick: (mood: Mood) => void;
}

const MoodButtons = ({ moods, onMoodSelect, onEmojiClick }: MoodButtonsProps) => {
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodClick = (mood: Mood) => {
    setSelectedMood(mood);
    onEmojiClick(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood, note);
      setNote('');
      setSelectedMood(null);
      onEmojiClick(null as any);
    }
  };

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          mb: 1,
          color: 'text.primary',
          fontWeight: 500,
        }}
      >
        How are you feeling today?
      </Typography>
      <Typography 
        variant="body2" 
        sx={{
          textAlign: 'center',
          mb: 4,
          color: 'text.secondary',
          fontStyle: 'italic',
          opacity: 0.8,
        }}
      >
        Tap a mood to begin your journey.
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 4, 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {moods.map((mood, index) => (
          <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={mood.emoji}>
            <Button
              variant={selectedMood === mood ? 'contained' : 'outlined'}
              onClick={() => handleMoodClick(mood)}
              sx={{
                fontSize: '2.5rem',
                minWidth: '80px',
                height: '80px',
                backgroundColor: selectedMood === mood ? mood.color : 'transparent',
                borderColor: mood.color,
                color: selectedMood === mood ? 'white' : mood.color,
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: `${mood.color}33`,
                  transform: 'translateY(-4px) scale(1.15)',
                  boxShadow: `0 8px 16px ${mood.color}33`,
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.1)',
                },
              }}
            >
              {mood.emoji}
            </Button>
          </Zoom>
        ))}
      </Box>
      {selectedMood && (
        <Zoom in={true}>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <TextField
              fullWidth
              label="Want to share a little more about your day?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              variant="outlined"
              multiline
              rows={2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: selectedMood.color,
                    },
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                height: '56px',
                px: 4,
                borderRadius: '12px',
                backgroundColor: selectedMood.color,
                '&:hover': {
                  backgroundColor: selectedMood.color,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${selectedMood.color}66`,
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Zoom>
      )}
    </Box>
  );
};

export default MoodButtons; 