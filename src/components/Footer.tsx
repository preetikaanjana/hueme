import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
          }}
        >
          "Your emotions don't need fixing — They just need seeing."
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 1 }}
        >
          © {new Date().getFullYear()} Hueme. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 