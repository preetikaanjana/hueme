import { useState } from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';

// Import the types and moods from App.tsx
export type Mood = {
  emoji: string;
  color: string;
  label: string;
};

export type MoodEntry = {
  date: string;
  mood: Mood;
  note?: string;
};

const moods: Mood[] = [
  { emoji: '😄', color: '#4CAF50', label: 'Happy' },
  { emoji: '🙂', color: '#8BC34A', label: 'Good' },
  { emoji: '😐', color: '#FFC107', label: 'Neutral' },
  { emoji: '🙁', color: '#FF9800', label: 'Sad' },
  { emoji: '😢', color: '#F44336', label: 'Very Sad' },
];

export default function Journal() {
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get entries from localStorage
  const entries: MoodEntry[] = JSON.parse(localStorage.getItem('moodEntries') || '[]');

  const filteredEntries = selectedMoodFilter
    ? entries.filter(entry => entry.mood.label === selectedMoodFilter)
    : entries;

  const sortedEntries = [...filteredEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF6B6B15 0%, #4ECDC430 50%, #6B8E2315 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 8 },
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              background: 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 50%, #6B8E23 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Mood Journal
          </Typography>

          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterListIcon sx={{ color: 'text.secondary' }} />
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                Filter by Mood
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {moods.map((mood) => (
                <Button
                  key={mood.label}
                  variant={selectedMoodFilter === mood.label ? "contained" : "outlined"}
                  onClick={() => setSelectedMoodFilter(selectedMoodFilter === mood.label ? null : mood.label)}
                  sx={{
                    minWidth: 'auto',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    borderColor: mood.color,
                    color: selectedMoodFilter === mood.label ? 'white' : mood.color,
                    bgcolor: selectedMoodFilter === mood.label ? mood.color : 'transparent',
                    '&:hover': {
                      bgcolor: selectedMoodFilter === mood.label ? mood.color : `${mood.color}20`,
                      borderColor: mood.color,
                    },
                  }}
                >
                  {mood.emoji} {mood.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sortedEntries.length > 0 ? (
              sortedEntries.map((entry, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderLeft: `4px solid ${entry.mood.color}`,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Typography variant="h4" sx={{ lineHeight: 1 }}>{entry.mood.emoji}</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: entry.mood.color, 
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {entry.mood.label}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    {entry.note && (
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mt: 1, 
                          fontStyle: 'italic',
                          color: 'text.secondary',
                          lineHeight: 1.6,
                        }}
                      >
                        "{entry.note}"
                      </Typography>
                    )}
                  </Box>
                </Paper>
              ))
            ) : (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  No entries yet
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Start tracking your moods to see them here
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/')}
                  sx={{
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF6B6B 40%, #4ECDC4 100%)',
                    },
                  }}
                >
                  Track Your First Mood
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 