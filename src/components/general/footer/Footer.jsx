import { Typography, Link, IconButton, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CallMadeIcon from '@mui/icons-material/CallMade';
import InstagramIcon from '@mui/icons-material/Instagram';
import './styles.scss';

const FooterColumn = ({ title, children }) => {
  return (
    <div className="footer-column">
      <Typography
        variant="overline"
        className="column-title"
        sx={{ fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      <div className="column-links">
        {children}
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="app-footer">
      <Container maxWidth="lg">
        <div className="footer-content">
          <div className="footer-brand">
            <Typography
              variant="h5"
              className="brand-title"
              sx={{ fontFamily: 'Outfit', fontWeight: 800 }}
            >
              WePadel
            </Typography>
            <Typography variant="body2" className="brand-desc">
              Elite Performance Equipment.
            </Typography>
          </div>

          <FooterColumn title="Compañía">
            <Link component={RouterLink} to="/sobre-nosotros" className="column-link" underline="hover">
              Sobre nosotros
            </Link>
            <Link href="https://api.whatsapp.com/send/?phone=5491130638729" className="column-link" underline="hover">
              Contactanos
            </Link>
          </FooterColumn>

          <FooterColumn title="Soporte">
            <Link component={RouterLink} to="/politica-de-privacidad" className="column-link" underline="hover">
              Política de privacidad
            </Link>
            <Link component={RouterLink} to="/terminos-de-servicio" className="column-link" underline="hover">
              Términos de servicio
            </Link>
          </FooterColumn>

          <FooterColumn title="Novedades del deporte">
            <div className="social-icons">
              <IconButton
                component="a"
                href="https://premierpadel.com/es"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="Ir a Premier Padel"
              >
                <CallMadeIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/premierpadel/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="Ir a Instagram de Premier Padel"
              >
                <InstagramIcon />
              </IconButton>
            </div>
          </FooterColumn>
        </div>

        <Typography
          variant="body2"
          className="footer-copy"
        >
          © 2026 WePadel. Elite Performance Equipment.
        </Typography>
      </Container>
    </footer>
  );
};

