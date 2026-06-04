import { Box, Typography } from '@mui/material';
import '../styles.scss';

export const AdminStatsGrid = ({ stats = [], spaced = false }) => (
  <Box className={`admin-stats-grid${spaced ? ' admin-stats-grid--spaced' : ''}`}>
    {stats.map((stat) => (
      <Box key={stat.id} className="admin-stat-card">
        <Typography className="admin-stat-label">{stat.label}</Typography>
        <Typography variant="h4" component="strong" className={`admin-stat-value ${stat.variant}`}>
          {stat.value}
        </Typography>
      </Box>
    ))}
  </Box>
);
