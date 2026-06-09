"use client";

import React, { useEffect, useState } from 'react';
import { Typography, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';
import { fetchNotifications, Notification } from '@/services/api';
import NotificationCard from '@/components/NotificationCard';

export default function AllNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load viewed IDs from localStorage
    const stored = localStorage.getItem('viewedNotifications');
    if (stored) {
      setViewedIds(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const params = filter !== 'All' ? { notification_type: filter } : {};
        const data = await fetchNotifications(params);
        setNotifications(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load notifications');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filter]);

  const handleMarkAsViewed = (id: string) => {
    if (!viewedIds.has(id)) {
      const newViewed = new Set(viewedIds).add(id);
      setViewedIds(newViewed);
      localStorage.setItem('viewedNotifications', JSON.stringify(Array.from(newViewed)));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          All Notifications
        </Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Type Filter</InputLabel>
          <Select
            value={filter}
            label="Type Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Typography color="text.secondary">No notifications found.</Typography>
      ) : (
        <Box>
          {notifications.map(notif => (
            <NotificationCard 
              key={notif.ID} 
              notification={notif} 
              isViewed={viewedIds.has(notif.ID)}
              onClick={() => handleMarkAsViewed(notif.ID)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
