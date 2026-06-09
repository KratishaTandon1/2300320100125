"use client";
import React, { useEffect, useState } from 'react';
import { Typography, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert, Button } from '@mui/material';
import { fetchNotifications, Notification } from '@/services/api';
import NotificationCard from '@/components/NotificationCard';
import { Log } from 'logging-middleware';

export default function AllNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
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
        const params: Record<string, any> = { limit, page };
        if (filter !== 'All') {
          params.notification_type = filter;
        }
        const data = await fetchNotifications(params);
        if (page === 1) {
          setNotifications(data);
        } else {
          setNotifications(prev => [...prev, ...data]);
        }
        if (data.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        await Log("frontend", "info", "page", `Fetched ${data.length} notifications (page: ${page})`);
      } catch (err: any) {
        setError(err.message || 'Failed to load notifications');
        await Log("frontend", "error", "page", `Failed to load notifications: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filter, page]);
  const handleFilterChange = (e: any) => {
    setFilter(e.target.value);
    setPage(1);
    setNotifications([]);
    setHasMore(true);
  };
  const handleMarkAsViewed = (id: string) => {
    if (!viewedIds.has(id)) {
      const newViewed = new Set(viewedIds).add(id);
      setViewedIds(newViewed);
      localStorage.setItem('viewedNotifications', JSON.stringify(Array.from(newViewed)));
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
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
          All Updates
        </Typography>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ color: '#9ca3af' }}>Type Filter</InputLabel>
          <Select
            value={filter}
            label="Type Filter"
            onChange={handleFilterChange}
            sx={{ 
              color: '#fff',
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.4)' },
              '.MuiSvgIcon-root ': { color: '#9ca3af' }
            }}
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {error && <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>}
      {notifications.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 4, border: '1px dashed rgba(255,255,255,0.1)' }}>
          <Typography color="text.secondary" variant="h6">No notifications found.</Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>Check back later for new updates.</Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {notifications.map(notif => (
          <NotificationCard 
            key={`${notif.ID}-${page}`}
            notification={notif} 
            isViewed={viewedIds.has(notif.ID)}
            onClick={() => handleMarkAsViewed(notif.ID)}
          />
        ))}
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress size={40} thickness={4} sx={{ color: '#60a5fa' }} />
        </Box>
      )}
      {!loading && hasMore && notifications.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Button 
            variant="outlined" 
            onClick={() => setPage(p => p + 1)}
            sx={{ 
              color: '#60a5fa', 
              borderColor: 'rgba(96, 165, 250, 0.5)',
              px: 4,
              py: 1.5,
              borderRadius: 8,
              '&:hover': {
                borderColor: '#60a5fa',
                background: 'rgba(96, 165, 250, 0.1)'
              }
            }}
          >
            Load More Announcements
          </Button>
        </Box>
      )}
      {!hasMore && notifications.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Typography sx={{ color: '#4b5563', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            You're all caught up
          </Typography>
        </Box>
      )}
    </Box>
  );
}
