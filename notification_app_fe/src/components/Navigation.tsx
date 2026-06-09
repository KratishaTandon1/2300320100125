"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{ 
        background: '#1e1e1e',
        borderBottom: '1px solid #333'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography 
              variant="h6" 
              component={Link} 
              href="/"
              sx={{ 
                textDecoration: 'none', 
                color: '#fff',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              Campus Updates
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              component={Link} 
              href="/"
              sx={{ 
                color: isActive('/') ? '#60a5fa' : '#a3a3a3',
                fontWeight: isActive('/') ? 600 : 400,
                textTransform: 'none',
                fontSize: '0.95rem',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'transparent'
                }
              }}
            >
              All Announcements
            </Button>
            
            <Button 
              component={Link} 
              href="/priority"
              sx={{ 
                color: isActive('/priority') ? '#60a5fa' : '#a3a3a3',
                fontWeight: isActive('/priority') ? 600 : 400,
                textTransform: 'none',
                fontSize: '0.95rem',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Priority Inbox
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
