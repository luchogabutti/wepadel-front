import { Box, Typography } from '@mui/material';

const headerSx = { mb: 4 };
const profileHeaderSx = { mb: 6 };

const actionsRowSx = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 2,
  flexWrap: 'wrap',
};

const actionsRowAlignCenterSx = {
  ...actionsRowSx,
  alignItems: 'center',
};

const actionsRowAlignStartSx = {
  ...actionsRowSx,
  alignItems: 'flex-start',
};

const copySx = { minWidth: 0, flex: '1 1 280px' };

const actionsSlotSx = {
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
  flexShrink: 0,
  alignItems: 'center',
};

export const PageHeader = ({
  title,
  subtitle,
  variant = 'default',
  actions,
  alignActions = 'start',
}) => {
  const titleVariant = variant === 'profile' ? 'pageTitleProfile' : 'pageTitle';
  const boxSx = variant === 'profile' ? profileHeaderSx : headerSx;
  const rowSx =
    alignActions === 'center' ? actionsRowAlignCenterSx : actionsRowAlignStartSx;

  const copy = (
    <Box sx={actions ? copySx : undefined}>
      <Typography variant={titleVariant} component="h1" sx={{ mb: subtitle ? 1 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="pageSubtitle" component="p" sx={{ m: 0 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );

  if (actions) {
    return (
      <Box sx={{ ...boxSx, ...rowSx }}>
        {copy}
        <Box sx={actionsSlotSx}>{actions}</Box>
      </Box>
    );
  }

  return <Box sx={boxSx}>{copy}</Box>;
};
