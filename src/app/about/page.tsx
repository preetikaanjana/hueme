'use client';

import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

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
            🌈 HueMe – Your Emotions, in Living Color
          </Typography>

          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
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
              Every day brings a new shade of feeling — some days are bright and energetic, others feel quiet and heavy, and many sit somewhere in between. But in the rush of life, we rarely stop to notice the patterns that shape our emotional world.
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
              HueMe is your gentle companion on this journey — a space where colors speak for your feelings. One tap is all it takes. Choose how you feel, and watch your calendar come alive with hues that reflect your mood: calm blues, joyful yellows, restless reds. Over days and weeks, these small choices bloom into a vibrant mosaic of your emotional life.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                fontFamily: '"Poppins", sans-serif',
                fontStyle: 'italic',
              }}
            >
              No judgment. No pressure. Just a soft invitation to see what's really going on beneath the surface.
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
              HueMe grows with you. It captures your emotional rhythm — helping you recognize, understand, and embrace the way you feel.
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textAlign: 'center',
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                color: 'primary.main',
              }}
            >
              Because your feelings don't need fixing —<br />
              They just need seeing.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 6,
                textAlign: 'center',
                fontFamily: '"Playfair Display", serif',
                color: 'secondary.main',
              }}
            >
              Let your emotions breathe. Let them shine.<br />
              Let them Hue You.
            </Typography>

            <Box sx={{ textAlign: 'center' }}>
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
                Start Your Journey
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 