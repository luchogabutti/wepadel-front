import { FooterContentLayout } from '../components/layout/FooterContentLayout';

export const AboutUsPage = () => (
  <FooterContentLayout
    title="Sobre nosotros"
    subtitle="La historia, misión y valores detrás de WePadel."
    lastUpdated="14 de junio de 2026"
    sections={[
      {
        title: 'Quiénes somos',
        paragraphs: [
          'WePadel nació en Buenos Aires con una idea simple: acercar equipamiento de pádel de alto rendimiento a jugadores que buscan calidad, asesoramiento y una experiencia de compra confiable.',
          'Somos un equipo apasionado por el deporte — desde jugadores recreativos hasta competidores de circuito — que selecciona cada paleta, pelota y accesorio con criterio técnico y foco en durabilidad.',
        ],
      },
      {
        title: 'Nuestra misión',
        paragraphs: [
          'Ayudar a que cada jugador encuentre el equipo adecuado para su nivel y estilo de juego, con información clara, precios transparentes y un servicio postventa que acompañe antes, durante y después de la compra.',
        ],
      },
      {
        title: 'Qué nos diferencia',
        paragraphs: [
          'Curaduría de productos: trabajamos con marcas y referencias probadas en cancha, no solo por tendencia.',
          'Asesoramiento real: nuestro equipo conoce las diferencias entre una paleta de control, potencia o híbrida, y te ayuda a elegir según tu objetivo.',
          'Logística ágil: despachamos a todo el país con seguimiento de envío y embalaje reforzado para proteger tu equipo.',
          'Compromiso con el cliente: garantía oficial, cambios dentro de plazo y canal directo de soporte por WhatsApp y correo.',
        ],
      },
      {
        title: 'Nuestros valores',
        paragraphs: [
          'Pasión por el pádel, transparencia en cada operación, respeto por el tiempo del cliente y mejora continua en catálogo, precios y experiencia digital.',
        ],
      },
      {
        title: 'El equipo',
        paragraphs: [
          'Detrás de WePadel hay especialistas en e-commerce, operaciones logísticas y jugadores con experiencia en torneos locales. Esa mezcla nos permite combinar conocimiento deportivo con ejecución profesional.',
        ],
      },
      {
        title: 'Contacto',
        paragraphs: [
          '¿Tenés dudas sobre un producto o querés recomendación personalizada? Escribinos a hola@wepadel.com o por WhatsApp al +54 9 11 3063-8729. Estamos para ayudarte a elegir el equipo que te lleve al siguiente nivel en la pista.',
        ],
      },
    ]}
  />
);
