import { Typography, Switch, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import './styles.scss';

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
    <div className="checkout-points-card">
      <div className="points-header">
        <div className="points-title-row">
          <StarOutlinedIcon className="points-icon" />
          <Typography variant="h6" className="points-title">
            Mis Puntos
          </Typography>
        </div>
        <Switch
          className="points-switch"
          checked={usePoints}
          onChange={(e) => onTogglePoints(e.target.checked)}
        />
      </div>

      <Typography className="points-available">{availablePoints} puntos disponibles</Typography>

      {usePoints && (
        <RadioGroup value={pointsMode} onChange={(e) => onPointsModeChange(e.target.value)}>
          <FormControlLabel
            value="all"
            control={<Radio className="points-radio" />}
            label={
              <Typography className="points-option-label">
                Usar todos mis puntos ({availablePoints})
              </Typography>
            }
          />
          <FormControlLabel
            value="manual"
            control={<Radio className="points-radio" />}
            label={
              <Typography className="points-option-label">Ingresar cantidad manual</Typography>
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
          className="manual-points-field"
        />
      )}
    </div>
  );
};
