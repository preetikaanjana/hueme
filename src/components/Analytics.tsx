import React from 'react';
import { Box, Typography, Grid, Paper, Fade } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';
import type { Mood, MoodEntry } from '../App';
import { useTheme } from '@mui/material/styles';

interface AnalyticsProps {
  entries: MoodEntry[];
  moods: Mood[];
}

const Analytics = ({ entries, moods }: AnalyticsProps) => {
  const theme = useTheme();

  console.log("Analytics component theme:", theme);

  const getMoodCounts = () => {
    const counts = moods.map(mood => ({
      name: mood.label,
      value: entries.filter(entry => entry.mood.emoji === mood.emoji).length,
      color: mood.color,
    }));
    return counts.filter(count => count.value > 0);
  };

  const getWeeklyStats = (): { weeklyCount: number; mostCommonMood: (Omit<Mood, 'emoji'> & { value: number }) | null } => {
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
    const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 0 });

    const weeklyEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfThisWeek && entryDate <= endOfThisWeek;
    });

    const weeklyMoodCounts = moods.map(mood => ({
      name: mood.label,
      value: weeklyEntries.filter(entry => entry.mood.emoji === mood.emoji).length,
    }));

    const mostCommonMood = weeklyMoodCounts.reduce((a, b) => a.value > b.value ? a : b, { name: 'None', value: 0 });

    // Find the color for the most common mood
    const mostCommonMoodColor = moods.find(mood => mood.label === mostCommonMood.name)?.color || 'transparent';

    return {
      weeklyCount: weeklyEntries.length,
      mostCommonMood: mostCommonMood.name !== 'None' ? { ...mostCommonMood, color: mostCommonMoodColor } : null,
    };
  };

  const moodCounts = getMoodCounts();
  const weeklyStats = getWeeklyStats();

  const getMoodInsight = (moodName: string | null) => {
    if (!moodName) return "Keep tracking to see your mood patterns!";
    
    switch (moodName) {
      case 'Happy':
        return "You felt most joyful this week! 🌞 Keep shining.";
      case 'Good':
        return "A good week! Little moments of positivity add up. ✨";
      case 'Neutral':
        return "A balanced week. Observe your feelings with kindness.🧘";
      case 'Sad':
        return "It was a challenging week. Be gentle with yourself. 🌱";
      case 'Very Sad':
        return "Feeling low this week. Remember, it's okay to seek support. ❤️";
      default:
        return "Reflect on the emotions that colored your week.";
    }
  };

  const moodInsight = getMoodInsight(weeklyStats.mostCommonMood?.name || null);

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          mb: 4,
          color: 'text.primary',
          fontWeight: 500,
        }}
      >
        Mood Analytics
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={1000}>
            <Paper 
              elevation={3}
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography 
                variant="h6"
                gutterBottom 
                sx={{ 
                  textAlign: 'center',
                  color: 'text.primary',
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Mood Distribution
              </Typography>
              <Box sx={{ height: 200, width: '100%', flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodCounts}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      animationDuration={800}
                      isAnimationActive={true}
                    >
                      {moodCounts.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={theme.palette.background.paper}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        fontSize: '0.9rem',
                        color: 'text.primary',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              {moodCounts.length > 0 && (
                <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary', fontStyle: 'italic', textAlign: 'center' }}>
                  {moodInsight}
                </Typography>
              )}
            </Paper>
          </Fade>
        </Grid>
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={1000} style={{ transitionDelay: '300ms' }}>
            <Box sx={{ p: 0 }}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 4,
                  mb: 3,
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '16px',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>
                  Weekly Stats
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {weeklyStats.weeklyCount}
                  </Typography>
                  {weeklyStats.weeklyCount > 0 ? (
                    <Box component="span" sx={{ color: 'success.main', fontSize: '1.5rem' }}>
                      ↑
                    </Box>
                  ) : (
                    <Box component="span" sx={{ color: 'text.secondary', fontSize: '1.5rem' }}>
                      -
                    </Box>
                  )}
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.8, color: 'text.secondary' }}>
                  Entries this week
                </Typography>
              </Paper>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 4,
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '16px',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>
                  Most Common Mood
                </Typography>
                {weeklyStats.mostCommonMood ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: weeklyStats.mostCommonMood.color }}>
                      {weeklyStats.mostCommonMood.name}
                    </Typography>
                    {moods.find(m => m.label === weeklyStats.mostCommonMood?.name)?.emoji && (
                      <Typography variant="h4">
                        {moods.find(m => m.label === weeklyStats.mostCommonMood?.name)?.emoji}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ opacity: 0.8, color: 'text.secondary' }}>
                    Not enough data yet this week.
                  </Typography>
                )}
              </Paper>
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;