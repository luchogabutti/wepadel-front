import { Typography, Switch, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { formatManualPoints } from '../../../utils/checkoutValidation';
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
  const handleManualChange = (e) => {
    onManualPointsChange(formatManualPoints(e.target.value, availablePoints));
  };

  const showManualError =
    usePoints &&
    pointsMode === 'manual' &&
    manualPoints !== '' &&
    parseInt(manualPoints, 10) < 1;

  return (
    <div className="surface-card checkout-points-card">
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
        <>
          <TextField
            fullWidth
            placeholder="Cantidad de puntos"
            value={manualPoints}
            onChange={handleManualChange}
            className="manual-points-field"
            error={showManualError}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                min: 1,
                max: availablePoints,
              },
            }}
            helperText={`Máximo ${availablePoints} puntos disponibles`}
          />
        </>
      )}
    </div>
  );
};
