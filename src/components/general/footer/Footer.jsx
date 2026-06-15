import { Typography, Link, IconButton, Container } from '@mui/material';
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
            <Link href="#" className="column-link" underline="hover">
              Sobre nosotros
            </Link>
            <Link href="https://api.whatsapp.com/send/?phone=5491130638729" className="column-link" underline="hover">
              Contactanos
            </Link>
          </FooterColumn>

          <FooterColumn title="Soporte">
            <Link href="#" className="column-link" underline="hover">
              Política de privacidad
            </Link>
            <Link href="#" className="column-link" underline="hover">
              Términos de servicio
            </Link>
          </FooterColumn>

          <FooterColumn title="Novedades del deporte">
            <div className="social-icons">
              <IconButton className="icon-btn" onClick={() => window.open('https://premierpadel.com/es', '_blank')}>
                <CallMadeIcon />
              </IconButton>
              <IconButton className="icon-btn" onClick={() => window.open('https://www.instagram.com/premierpadel/', '_blank')}>
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

