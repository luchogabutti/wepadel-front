import { Box, Typography } from '@mui/material';

const headerSx = { mb: 4 };
const profileHeaderSx = { mb: 6 };

export const PageHeader = ({ title, subtitle, variant = 'default' }) => {
  const titleVariant = variant === 'profile' ? 'pageTitleProfile' : 'pageTitle';
  const boxSx = variant === 'profile' ? profileHeaderSx : headerSx;

  return (
    <Box sx={boxSx}>
      <Typography variant={titleVariant} component="h1" sx={{ mb: subtitle ? 1 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="pageSubtitle">{subtitle}</Typography>
      )}
    </Box>
  );
};
