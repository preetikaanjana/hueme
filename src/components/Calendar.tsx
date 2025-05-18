import React from 'react';
import { Box, Typography } from '@mui/material';
import { MoodEntry } from '../types';

interface CalendarProps {
  entries: MoodEntry[];
}

const Calendar: React.FC<CalendarProps> = ({ entries }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const getMoodForDate = (date: number) => {
    const dateStr = new Date(currentYear, currentMonth, date).toISOString().split('T')[0];
    return entries.find(entry => entry.date === dateStr)?.mood;
  };

  const renderCalendarDays = () => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day names
    for (let i = 0; i < 7; i++) {
      days.push(
        <Box
          key={`day-${i}`}
          sx={{
            p: 1,
            textAlign: 'center',
            fontWeight: 600,
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          {dayNames[i]}
        </Box>
      );
    }

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <Box
          key={`empty-${i}`}
          sx={{
            p: 1,
            height: '80px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }}
        />
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const mood = getMoodForDate(day);
      const isToday = day === today.getDate();
      
      days.push(
        <Box
          key={day}
          sx={{
            p: 1,
            height: '80px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            backgroundColor: mood ? `${mood.color}15` : 'transparent',
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              fontWeight: isToday ? 700 : 400,
              color: isToday ? 'primary.main' : 'text.primary',
            }}
          >
            {day}
          </Typography>
          {mood && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 4,
                left: 4,
                right: 4,
                height: '4px',
                backgroundColor: mood.color,
                borderRadius: '2px',
                opacity: 0.8,
              }}
            />
          )}
        </Box>
      );
    }

    return days;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 1,
        p: 2,
      }}
    >
      {renderCalendarDays()}
    </Box>
  );
};

export default Calendar; 