import { FooterContentLayout } from '../components/layout/FooterContentLayout';

export const PrivacyPolicyPage = () => (
  <FooterContentLayout
    title="Política de privacidad"
    subtitle="Cómo recopilamos, usamos y protegemos tu información en WePadel."
    lastUpdated="14 de junio de 2026"
    sections={[
      {
        title: '1. Responsable del tratamiento',
        paragraphs: [
          'WePadel S.A. (CUIT 30-71234567-8), con domicilio en Av. del Libertador 5800, CABA, Argentina, es responsable del tratamiento de los datos personales que nos proporcionás al usar nuestra tienda online, crear una cuenta o realizar una compra.',
        ],
      },
      {
        title: '2. Datos que recopilamos',
        paragraphs: [
          'Podemos recopilar: nombre y apellido, correo electrónico, teléfono, dirección de envío y facturación, historial de pedidos, preferencias de compra y datos técnicos de navegación (dirección IP, tipo de dispositivo y cookies).',
          'No solicitamos información sensible salvo que la ley lo exija o sea estrictamente necesaria para prestar el servicio.',
        ],
      },
      {
        title: '3. Finalidad del uso',
        paragraphs: [
          'Utilizamos tus datos para procesar pedidos, gestionar envíos, brindar soporte al cliente, enviar comunicaciones sobre tu compra, mejorar la experiencia en el sitio y, con tu consentimiento, informarte sobre novedades y promociones de WePadel.',
        ],
      },
      {
        title: '4. Compartición con terceros',
        paragraphs: [
          'Compartimos información únicamente con proveedores que nos ayudan a operar el servicio: procesadores de pago, empresas de logística, servicios de hosting y herramientas de analítica. Estos terceros solo pueden usar tus datos para las finalidades acordadas y deben cumplir estándares de seguridad.',
          'No vendemos ni alquilamos tus datos personales a terceros con fines comerciales.',
        ],
      },
      {
        title: '5. Seguridad y conservación',
        paragraphs: [
          'Aplicamos medidas técnicas y organizativas razonables para proteger tu información frente a accesos no autorizados, pérdida o alteración. Conservamos los datos mientras mantengas una cuenta activa o sea necesario para cumplir obligaciones legales, fiscales o de defensa de reclamos.',
        ],
      },
      {
        title: '6. Tus derechos',
        paragraphs: [
          'Podés acceder, rectificar, actualizar o solicitar la eliminación de tus datos escribiendo a privacidad@wepadel.com. También podés oponerte al envío de comunicaciones promocionales en cualquier momento mediante el enlace de baja incluido en nuestros correos.',
        ],
      },
      {
        title: '7. Cookies',
        paragraphs: [
          'Usamos cookies propias y de terceros para recordar tu sesión, mantener el carrito de compras y analizar el uso del sitio. Podés configurar tu navegador para rechazarlas, aunque algunas funciones del sitio podrían dejar de estar disponibles.',
        ],
      },
      {
        title: '8. Cambios a esta política',
        paragraphs: [
          'Podemos actualizar esta política para reflejar cambios legales o mejoras en nuestros servicios. Publicaremos la versión vigente en esta página e indicaremos la fecha de última actualización.',
        ],
      },
    ]}
  />
);
