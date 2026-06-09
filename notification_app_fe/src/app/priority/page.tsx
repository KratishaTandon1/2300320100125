"use client";

import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { fetchNotifications, getPriorityInbox, Notification } from '@/services/api';
import NotificationCard from '@/components/NotificationCard';
import { Log } from 'logging-middleware';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function PriorityInboxPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  
  const [limitN, setLimitN] = useState<number>(10);
  const [typeFilter, setTypeFilter] = useState<string>('All');

  useEffect(() => {
    const stored = localStorage.getItem('viewedNotifications');
    if (stored) {
      setViewedIds(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const apiFilter = typeFilter === 'All' ? undefined : typeFilter;
        const allData = await fetchNotifications({ notification_type: apiFilter });
        
        const stored = localStorage.getItem('viewedNotifications');
        const viewed = stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
        
        const unreadData = allData.filter(n => !viewed.has(n.ID));
        const priorityTopN = getPriorityInbox(unreadData, limitN);
        
        setNotifications(priorityTopN);
        await Log("frontend", "info", "page", `Loaded Priority Inbox with ${priorityTopN.length} items`);
      } catch (err: any) {
        setError(err.message || 'Failed to load notifications');
        await Log("frontend", "error", "page", `Priority fetch error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [limitN, typeFilter]);

  const handleMarkAsViewed = (id: string) => {
    if (!viewedIds.has(id)) {
      const newViewed = new Set(viewedIds).add(id);
      setViewedIds(newViewed);
      localStorage.setItem('viewedNotifications', JSON.stringify(Array.from(newViewed)));
      setNotifications(prev => prev.filter(n => n.ID !== id));
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4, 
        pb: 2,
        flexWrap: 'wrap', 
        gap: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#f9fafb' }}>
          <WhatshotIcon sx={{ color: '#ef4444', fontSize: '2rem', filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.5))' }} />
          Priority Inbox
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', background: 'rgba(0,0,0,0.2)', p: 1, borderRadius: 3 }}>
          <TextField 
            label="Top 'N'" 
            type="number" 
            value={limitN}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (val > 0) setLimitN(val);
            }}
            sx={{ 
              width: 90,
              '.MuiInputBase-input': { color: '#fff' },
              '.MuiInputLabel-root': { color: '#9ca3af' },
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.4)' },
            }}
            size="small"
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel sx={{ color: '#9ca3af' }}>Type Filter</InputLabel>
            <Select
              value={typeFilter}
              label="Type Filter"
              onChange={(e) => setTypeFilter(e.target.value)}
              sx={{ 
                color: '#fff',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                '.MuiSvgIcon-root ': { color: '#9ca3af' }
              }}
            >
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {error && <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress size={50} thickness={4} sx={{ color: '#ef4444' }} />
        </Box>
      ) : notifications.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 4, border: '1px dashed rgba(255,255,255,0.1)' }}>
          <Typography color="text.secondary" variant="h6">Inbox Zero! 🎉</Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>You have no unread priority notifications.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {notifications.map(notif => (
            <NotificationCard 
              key={notif.ID} 
              notification={notif} 
              isViewed={false} 
              onClick={() => handleMarkAsViewed(notif.ID)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
