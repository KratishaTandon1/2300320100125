"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InboxIcon from '@mui/icons-material/Inbox';
import ViewListIcon from '@mui/icons-material/ViewList';
import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 1100
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '70px !important' }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 800, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              background: 'linear-gradient(90deg, #93c5fd, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => router.push('/')}
          >
            <NotificationsActiveIcon sx={{ color: '#93c5fd' }} /> 
            Campus Notifications
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              startIcon={<ViewListIcon />}
              onClick={() => router.push('/')}
              sx={{ 
                px: 2,
                py: 1,
                borderRadius: '12px',
                color: pathname === '/' ? '#fff' : '#9ca3af',
                background: pathname === '/' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                fontWeight: pathname === '/' ? 600 : 500,
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                }
              }}
            >
              All
            </Button>
            <Button 
              color="inherit" 
              startIcon={<InboxIcon />}
              onClick={() => router.push('/priority')}
              sx={{ 
                px: 2,
                py: 1,
                borderRadius: '12px',
                color: pathname === '/priority' ? '#fff' : '#9ca3af',
                background: pathname === '/priority' ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
                fontWeight: pathname === '/priority' ? 600 : 500,
                transition: 'all 0.2s',
                border: pathname === '/priority' ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
                '&:hover': {
                  background: pathname === '/priority' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                }
              }}
            >
              Priority
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
