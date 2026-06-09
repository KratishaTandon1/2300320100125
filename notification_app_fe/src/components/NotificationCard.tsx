import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Notification } from '../services/api';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  notification: Notification;
  isViewed: boolean;
  onClick: () => void;
}

export default function NotificationCard({ notification, isViewed, onClick }: Props) {
  const getIcon = () => {
    switch (notification.Type) {
      case 'Event': return <EventIcon fontSize="small" />;
      case 'Result': return <SchoolIcon fontSize="small" />;
      case 'Placement': return <WorkIcon fontSize="small" />;
      default: return null;
    }
  };

  const getColor = () => {
    switch (notification.Type) {
      case 'Event': return 'info';
      case 'Result': return 'warning';
      case 'Placement': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: '0.2s',
        borderLeft: isViewed ? '4px solid transparent' : '4px solid #1976d2',
        backgroundColor: isViewed ? '#ffffff' : '#f0f7ff',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Chip 
            icon={getIcon()} 
            label={notification.Type} 
            color={getColor() as any} 
            size="small" 
          />
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: isViewed ? 'normal' : 'bold' }}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}
