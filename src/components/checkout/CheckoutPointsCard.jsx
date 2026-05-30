import { Box, Typography, Switch, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export const CheckoutPointsCard = ({
  availablePoints,
  usePoints,
  onTogglePoints,
  pointsMode,
  onPointsModeChange,
  manualPoints,
  onManualPointsChange,
}) => {
  return (
    <Box
      sx={{
        bgcolor: '#1c1b22',
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(66, 70, 86, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarOutlinedIcon sx={{ color: '#35dfab' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#e5e1eb' }}>
            Mis Puntos
          </Typography>
        </Box>
        <Switch
          checked={usePoints}
          onChange={(e) => onTogglePoints(e.target.checked)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'primary.main' },
          }}
        />
      </Box>

      <Typography sx={{ color: '#35dfab', fontSize: 14, fontWeight: 500, mb: 2 }}>
        {availablePoints} puntos disponibles
      </Typography>

      {usePoints && (
        <RadioGroup value={pointsMode} onChange={(e) => onPointsModeChange(e.target.value)}>
          <FormControlLabel
            value="all"
            control={<Radio sx={{ color: '#8c90a1', '&.Mui-checked': { color: 'primary.main' } }} />}
            label={
              <Typography sx={{ color: '#e5e1eb', fontSize: 14 }}>
                Usar todos mis puntos ({availablePoints})
              </Typography>
            }
          />
          <FormControlLabel
            value="manual"
            control={<Radio sx={{ color: '#8c90a1', '&.Mui-checked': { color: 'primary.main' } }} />}
            label={
              <Typography sx={{ color: '#e5e1eb', fontSize: 14 }}>
                Ingresar cantidad manual
              </Typography>
            }
          />
        </RadioGroup>
      )}

      {usePoints && pointsMode === 'manual' && (
        <TextField
          fullWidth
          type="number"
          placeholder="Cantidad de puntos"
          value={manualPoints}
          onChange={(e) => onManualPointsChange(e.target.value)}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': {
              bgcolor: '#201f26',
              borderRadius: 2,
              color: '#e5e1eb',
              '& fieldset': { borderColor: 'rgba(66, 70, 86, 0.3)' },
            },
          }}
        />
      )}
    </Box>
  );
};
