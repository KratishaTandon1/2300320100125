"use client";

import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { fetchNotifications, getPriorityInbox, Notification } from '@/services/api';
import NotificationCard from '@/components/NotificationCard';
import { Log } from 'logging-middleware';

export default function PriorityInboxPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
        // Fetch all notifications first, then determine the priority
        // The instructions: "displays the top 'n' most important unread notifications first"
        // Wait, "unread notifications first" -> we should filter out read notifications before priority sort!
        const allData = await fetchNotifications();
        
        // Filter out viewed notifications for the priority inbox if required, 
        // but the prompt says "displays the top 'n' most important unread notifications first".
        // Let's filter out viewed ones:
        const stored = localStorage.getItem('viewedNotifications');
        const viewed = stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
        
        const unreadData = allData.filter(n => !viewed.has(n.ID));
        
        const priorityTop10 = getPriorityInbox(unreadData, 10);
        setNotifications(priorityTop10);
        await Log("frontend", "info", "page", `Loaded Priority Inbox with ${priorityTop10.length} items`);
      } catch (err: any) {
        setError(err.message || 'Failed to load notifications');
        await Log("frontend", "error", "page", `Priority fetch error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMarkAsViewed = (id: string) => {
    if (!viewedIds.has(id)) {
      const newViewed = new Set(viewedIds).add(id);
      setViewedIds(newViewed);
      localStorage.setItem('viewedNotifications', JSON.stringify(Array.from(newViewed)));
      
      // Update the local state to remove it from unread priority inbox
      setNotifications(prev => prev.filter(n => n.ID !== id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Priority Inbox (Top 10 Unread)
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Typography color="text.secondary">You have no unread priority notifications! 🎉</Typography>
      ) : (
        <Box>
          {notifications.map(notif => (
            <NotificationCard 
              key={notif.ID} 
              notification={notif} 
              isViewed={false} // By definition, these are unread
              onClick={() => handleMarkAsViewed(notif.ID)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
