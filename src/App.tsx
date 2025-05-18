import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoodButtons from './components/MoodButtons';
import Calendar from './components/Calendar';
import Analytics from './components/Analytics';
import MoodQuote from './components/MoodQuote';
import Footer from './components/Footer';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';
import Journal from './pages/Journal';
import Welcome from './pages/Welcome';
import EmojiQuotes from './components/EmojiQuotes';

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

function App() {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const handleMoodSelect = (mood: Mood, note?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = {
      date: today,
      mood,
      note,
    };
    setEntries([...entries, newEntry]);
  };

  const handleEmojiSelect = (mood: Mood | null) => {
    setSelectedMood(mood);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const filteredEntries = selectedMoodFilter
    ? entries.filter(entry => entry.mood.label === selectedMoodFilter)
    : entries;

  const sortedEntries = [...filteredEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <>
            <MoodQuote mood={selectedMood} />
            <Paper elevation={3} sx={{ p: 4, mb: 3, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
              <MoodButtons moods={moods} onMoodSelect={handleMoodSelect} onEmojiClick={handleEmojiSelect} />
            </Paper>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                mb: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(31, 38, 135, 0.15)',
                },
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: 'primary.main',
                    fontFamily: '"Playfair Display", serif',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    position: 'relative',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      width: '60px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(107, 142, 35, 0.3))',
                    },
                    '&::before': {
                      left: '-80px',
                    },
                    '&::after': {
                      right: '-80px',
                      background: 'linear-gradient(90deg, rgba(107, 142, 35, 0.3), transparent)',
                    },
                  }}
                >
                  May 2024
                </Typography>
              </Box>
              <Calendar entries={entries} />
            </Paper>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(31, 38, 135, 0.15)',
                },
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: 'primary.main',
                    fontFamily: '"Playfair Display", serif',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    position: 'relative',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      width: '60px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(107, 142, 35, 0.3))',
                    },
                    '&::before': {
                      left: '-80px',
                    },
                    '&::after': {
                      right: '-80px',
                      background: 'linear-gradient(90deg, rgba(107, 142, 35, 0.3), transparent)',
                    },
                  }}
                >
                  Mood Analytics
                </Typography>
              </Box>
              <Analytics entries={entries} moods={moods} />
            </Paper>
          </>
        );
      case 1:
        return (
          <Paper elevation={3} sx={{ p: 4, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <FilterListIcon />
              <Typography variant="h6">Filter by Mood</Typography>
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
              {sortedEntries.map((entry, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderLeft: `4px solid ${entry.mood.color}`,
                  }}
                >
                  <Typography variant="h4">{entry.mood.emoji}</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ color: entry.mood.color, fontWeight: 600 }}>
                      {entry.mood.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    {entry.note && (
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                        "{entry.note}"
                      </Typography>
                    )}
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        );
      default:
        return null;
    }
  };

  // Determine if the current path is the root path or welcome path
  const isRootOrWelcomePath = location.pathname === '/' || location.pathname === '/welcome';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Conditionally render AppBar */}
        {!isRootOrWelcomePath && (
          <AppBar 
            position="static" 
            color="transparent" 
            elevation={0}
            sx={{ 
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Toolbar>
              <Box
                component="img"
                src="/hueme-logo.png"
                alt="Hueme Logo"
                sx={{
                  height: '40px',
                  width: 'auto',
                  mr: 2,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Hueme
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    mt: -0.5,
                  }}
                >
                  Your emotions, in living color
                </Typography>
              </Box>
              {isMobile ? (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Tabs 
                  value={currentTab} 
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': {
                      minWidth: 100,
                      color: 'text.secondary',
                      '&.Mui-selected': {
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <Tab icon={<HomeIcon />} label="Tracker" onClick={() => navigate('/tracker')} />
                  <Tab icon={<HistoryIcon />} label="Journal" onClick={() => navigate('/journal')} />
                  <Tab icon={<InfoIcon />} label="About" onClick={() => navigate('/about')} />
                </Tabs>
              )}
            </Toolbar>
          </AppBar>
        )}

        {/* Conditionally render Drawer */}
        {!isRootOrWelcomePath && (
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
          >
            <List sx={{ width: 250 }}>
              <ListItem button onClick={() => { navigate('/tracker'); toggleDrawer(); }}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Tracker" />
              </ListItem>
              <ListItem button onClick={() => { navigate('/journal'); toggleDrawer(); }}>
                <ListItemIcon><HistoryIcon /></ListItemIcon>
                <ListItemText primary="Journal" />
              </ListItem>
              <ListItem button onClick={() => { navigate('/about'); toggleDrawer(); }}>
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </List>
          </Drawer>
        )}

        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
            position: 'relative',
            overflow: 'hidden',
            // Adjusted padding top if header is hidden
            pt: isRootOrWelcomePath ? 0 : '64px', // Add padding top if header is visible (approx height of AppBar)
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40vh',
              background: 'linear-gradient(45deg, #6B8E23 0%, #FF6B6B 100%)',
              opacity: 0.1,
              zIndex: 0,
            },
          }}
        >
          {/* Background title and slogan */}          
          {isRootOrWelcomePath && (
            <Box sx={{ textAlign: 'center', pt: 4, pb: 8 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                  background: 'linear-gradient(45deg, #6B8E23 30%, #FF6B6B 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Mood Tracker
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                }}
              >
                Your feelings, one hue at a time.
              </Typography>
            </Box>
          )}

          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/tracker" element={renderContent()} />
              <Route path="/" element={<EmojiQuotes />} />
            </Routes>
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App; 