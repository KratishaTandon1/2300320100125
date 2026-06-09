import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { Notification } from '../services/api';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
  notification: Notification;
  isViewed: boolean;
  onClick: () => void;
}

export default function NotificationCard({ notification, isViewed, onClick }: Props) {
  const getConfig = () => {
    switch (notification.Type) {
      case 'Event': 
        return { icon: <EventIcon fontSize="small" />, color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.3)' };
      case 'Result': 
        return { icon: <SchoolIcon fontSize="small" />, color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.3)' };
      case 'Placement': 
        return { icon: <WorkIcon fontSize="small" />, color: '#4ade80', glow: 'rgba(74, 222, 128, 0.3)' };
      default: 
        return { icon: <EventIcon fontSize="small" />, color: '#9ca3af', glow: 'transparent' };
    }
  };

  const config = getConfig();

  return (
    <Card 
      sx={{ 
        mb: 2.5, 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        opacity: isViewed ? 0.65 : 1,
        transform: 'translateZ(0)',
        border: isViewed ? '1px solid rgba(255, 255, 255, 0.05)' : `1px solid ${config.color}`,
        boxShadow: isViewed ? 'none' : `0 0 15px ${config.glow}`,
        '&:hover': {
          transform: isViewed ? 'none' : 'translateY(-3px) scale(1.01)',
          boxShadow: isViewed ? 'none' : `0 10px 25px ${config.glow}`,
          borderColor: isViewed ? 'rgba(255, 255, 255, 0.1)' : config.color,
        },
        '&::before': !isViewed ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          backgroundColor: config.color,
          boxShadow: `0 0 10px ${config.color}`,
        } : {}
      }}
    >
      <CardContent sx={{ pb: '16px !important', pl: !isViewed ? 3 : 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              icon={React.cloneElement(config.icon, { sx: { color: isViewed ? '#9ca3af' : config.color } })} 
              label={notification.Type} 
              size="small" 
              sx={{ 
                backgroundColor: isViewed ? 'rgba(255, 255, 255, 0.05)' : config.glow,
                color: isViewed ? '#9ca3af' : config.color,
                fontWeight: 600,
                border: isViewed ? 'none' : `1px solid ${config.color}`,
                '& .MuiChip-icon': {
                  color: isViewed ? '#9ca3af' : config.color,
                }
              }} 
            />
            {!isViewed && (
              <FiberNewIcon sx={{ color: '#fbbf24', fontSize: 24, filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))' }} />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ color: isViewed ? '#6b7280' : '#9ca3af', fontWeight: 500 }}>
              {new Date(notification.Timestamp).toLocaleString(undefined, { 
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </Typography>
            {!isViewed && (
              <Button 
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                size="small"
                variant="outlined"
                startIcon={<CheckIcon fontSize="small" />}
                sx={{ 
                  textTransform: 'none', 
                  color: config.color, 
                  borderColor: config.color,
                  height: '24px',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  '&:hover': { backgroundColor: config.glow, borderColor: config.color }
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
            fontWeight: isViewed ? 400 : 600,
            color: isViewed ? '#9ca3af' : '#f9fafb',
            fontSize: '1.05rem',
            lineHeight: 1.5
          }}
        >
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}
