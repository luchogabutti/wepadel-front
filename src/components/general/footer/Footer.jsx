import { Typography, Link, IconButton, Container } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
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
            <Link href="#" className="column-link" underline="hover">
              Contacto
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

          <FooterColumn title="Síguenos">
            <div className="social-icons">
              <IconButton className="icon-btn">
                <ShareIcon />
              </IconButton>
              <IconButton className="icon-btn">
                <CameraAltIcon />
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

