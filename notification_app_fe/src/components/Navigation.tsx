"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InboxIcon from '@mui/icons-material/Inbox';
import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationsIcon /> Campus Notifications
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            startIcon={<NotificationsIcon />}
            onClick={() => router.push('/')}
            sx={{ fontWeight: pathname === '/' ? 'bold' : 'normal', opacity: pathname === '/' ? 1 : 0.7 }}
          >
            All Notifications
          </Button>
          <Button 
            color="inherit" 
            startIcon={<InboxIcon />}
            onClick={() => router.push('/priority')}
            sx={{ fontWeight: pathname === '/priority' ? 'bold' : 'normal', opacity: pathname === '/priority' ? 1 : 0.7 }}
          >
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
