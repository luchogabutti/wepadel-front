import { Grid, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import './styles.scss';

const BENEFITS = [
  {
    icon: VerifiedIcon,
    title: 'Miembro Elite',
    description: 'Acceso prioritario a lanzamientos de nuevas colecciones.',
  },
  {
    icon: LocalShippingIcon,
    title: 'Envíos Gratis',
    description: 'Por ser cliente recurrente, tenés envío bonificado en todo el país.',
  },
  {
    icon: SupportAgentIcon,
    title: 'Soporte VIP',
    description: 'Chat directo con nuestros expertos en equipamiento técnico.',
  },
];

export const ProfileBenefitsGrid = () => {
  return (
    <Grid container spacing={3}>
      {BENEFITS.map(({ icon: Icon, title, description }) => (
        <Grid key={title} size={{ xs: 12, md: 4 }}>
          <div className="surface-card--paper benefit-card">
            <Icon className="benefit-card__icon" />
            <Typography variant="h6" className="benefit-card__title">
              {title}
            </Typography>
            <Typography variant="body2" className="benefit-card__description">
              {description}
            </Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
