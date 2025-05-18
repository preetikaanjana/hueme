import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { startOfWeek, endOfWeek } from 'date-fns';
import { Mood, MoodEntry } from '../types';

interface AnalyticsProps {
  entries: MoodEntry[];
  moods: Mood[];
}

const Analytics: React.FC<AnalyticsProps> = ({ entries, moods }) => {
  const getWeeklyStats = (): { weeklyCount: number; mostCommonMood: (Omit<Mood, 'emoji'> & { value: number }) | null } => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    const weeklyEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekStart && entryDate <= weekEnd;
    });

    const moodCounts = weeklyEntries.reduce((acc, entry) => {
      const moodLabel = entry.mood.label;
      acc[moodLabel] = (acc[moodLabel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let mostCommonMood = null;
    let maxCount = 0;

    Object.entries(moodCounts).forEach(([label, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonMood = {
          label,
          color: moods.find(m => m.label === label)?.color || '#000000',
          value: count
        };
      }
    });

    return {
      weeklyCount: weeklyEntries.length,
      mostCommonMood
    };
  };

  const weeklyStats = getWeeklyStats();

  const getMoodInsight = (moodLabel: string | null): string => {
    if (!moodLabel) return "No mood data available for this week.";
    
    const insights: Record<string, string> = {
      'Very Happy': "You've been feeling great this week! Keep spreading that joy!",
      'Happy': "A positive week overall! Your happiness is shining through.",
      'Neutral': "A balanced week. Remember, it's okay to feel neutral sometimes.",
      'Sad': "It's been a tough week. Remember, brighter days are ahead.",
      'Very Sad': "This week has been challenging. Remember, it's okay to reach out for support."
    };

    return insights[moodLabel] || "Keep tracking your moods to see patterns emerge.";
  };

  const moodInsight = getMoodInsight(weeklyStats.mostCommonMood?.label || null);

  const chartData = moods.map(mood => ({
    name: mood.label,
    value: entries.filter(entry => entry.mood.label === mood.label).length
  }));

  const COLORS = moods.map(mood => mood.color);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Mood Analytics
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Weekly Overview */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            flex: 1,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
            This Week's Overview
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Entries This Week
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.main' }}>
                {weeklyStats.weeklyCount}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Most Common Mood
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4" sx={{ color: 'primary.main' }}>
                  {weeklyStats.mostCommonMood?.label}
                </Typography>
                {moods.find(m => m.label === weeklyStats.mostCommonMood?.label)?.emoji && (
                  <Typography variant="h4">
                    {moods.find(m => m.label === weeklyStats.mostCommonMood?.label)?.emoji}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Mood Distribution */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            flex: 1,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
            Mood Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>

      {/* Mood Insight */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
          Weekly Insight
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          {moodInsight}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Analytics;