import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF6B6B15 0%, #4ECDC430 50%, #6B8E2315 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        pt: 2,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 6 },
            maxWidth: '600px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              color: 'text.primary',
            }}
          >
            Welcome to Hueme!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'text.secondary',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            We are more than just 'good' or 'bad' days. We are complex, colorful, shifting mosaics of emotions. Yet,
            we rarely pause to see them. Hueme was born from that gap — to help people track, understand, and
            honor their moods with kindness.
          </Typography>

           <Typography
            variant="body1"
            sx={{
              mb: 6,
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'text.secondary',
              fontFamily: '"Poppins", sans-serif',
              fontStyle: 'italic',
            }}
          >
            No judgment. Just color. Just feeling. Just you.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/tracker')}
            sx={{
              background: 'linear-gradient(45deg, #6B8E23 30%, #8BC34A 90%)',
              color: 'white',
              px: 6,
              py: 2,
              borderRadius: 2,
              textTransform: 'uppercase',
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px rgba(107, 142, 35, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #8BC34A 30%, #6B8E23 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(107, 142, 35, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            TAKE ME TO THE MOOD TRACKER
          </Button>
        </Paper>
      </Container>
    </Box>
  );
} 