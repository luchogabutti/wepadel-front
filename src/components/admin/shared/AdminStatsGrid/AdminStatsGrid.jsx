import { Box, Typography } from '@mui/material';
import '../styles.scss';

export const AdminStatsGrid = ({ stats = [] }) => {
  const columnCount = Math.max(stats.length, 1);

  return (
    <Box
      className="admin-stats-grid"
      sx={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        '@media (max-width: 1100px)': {
          gridTemplateColumns: `repeat(${Math.min(columnCount, 2)}, minmax(0, 1fr))`,
        },
        '@media (max-width: 700px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
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
};
