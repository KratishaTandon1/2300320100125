import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { Notification } from '../services/api';

interface Props {
  notification: Notification;
  isViewed: boolean;
  onClick: () => void;
}

export default function NotificationCard({ notification, isViewed, onClick }: Props) {
  const getConfig = () => {
    switch (notification.Type) {
      case 'Event': 
        return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
      case 'Result': 
        return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
      case 'Placement': 
        return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
      default: 
        return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
    }
  };

  const config = getConfig();

  return (
    <Card 
      sx={{ 
        mb: 2, 
        backgroundColor: '#1e1e1e',
        opacity: isViewed ? 0.7 : 1,
        border: `1px solid ${isViewed ? '#333' : config.color}`,
        borderLeft: `4px solid ${isViewed ? '#333' : config.color}`,
        boxShadow: 'none',
        '&:hover': {
          borderColor: isViewed ? '#444' : config.color,
        }
      }}
    >
      <CardContent sx={{ pb: '16px !important', pl: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip 
              label={notification.Type} 
              size="small" 
              sx={{ 
                backgroundColor: isViewed ? 'transparent' : config.bg,
                color: isViewed ? '#6b7280' : config.color,
                border: isViewed ? '1px solid #444' : 'none',
                fontWeight: 500,
              }} 
            />
            {!isViewed && (
              <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                NEW
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ color: '#9ca3af' }}>
              {new Date(notification.Timestamp).toLocaleString(undefined, { 
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </Typography>
            {!isViewed && (
              <Button 
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                size="small"
                variant="text"
                sx={{ 
                  textTransform: 'none', 
                  color: '#60a5fa', 
                  fontSize: '0.8rem',
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': { background: 'transparent', textDecoration: 'underline' }
                }}
              >
                Mark as read
              </Button>
            )}
          </Box>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            color: isViewed ? '#9ca3af' : '#e5e7eb',
            fontSize: '1rem',
          }}
        >
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}
