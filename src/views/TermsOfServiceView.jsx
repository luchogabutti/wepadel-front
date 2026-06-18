import { FooterContentLayout } from '../components/layout/FooterContentLayout';

export const TermsOfServiceView = () => (
  <FooterContentLayout
    title="Términos de servicio"
    subtitle="Condiciones de uso de la plataforma y compra en WePadel."
    lastUpdated="14 de junio de 2026"
    sections={[
      {
        title: '1. Aceptación de los términos',
        paragraphs: [
          'Al acceder a wepadel.com o realizar una compra, aceptás estos Términos de Servicio. Si no estás de acuerdo, te pedimos que no utilices la plataforma.',
        ],
      },
      {
        title: '2. Uso de la plataforma',
        paragraphs: [
          'WePadel es una tienda online de equipamiento de pádel. Te comprometés a usar el sitio de forma lícita, proporcionar información veraz al registrarte o comprar, y no realizar actividades que puedan dañar la plataforma o a otros usuarios.',
        ],
      },
      {
        title: '3. Cuenta de usuario',
        paragraphs: [
          'Para determinadas funciones (historial de pedidos, checkout rápido, puntos de fidelidad) podés crear una cuenta. Sos responsable de mantener la confidencialidad de tus credenciales y de toda actividad realizada desde tu cuenta.',
        ],
      },
      {
        title: '4. Productos, precios y disponibilidad',
        paragraphs: [
          'Las imágenes y descripciones buscan representar fielmente cada producto, pero pueden existir variaciones menores de color o terminación. Los precios se expresan en pesos argentinos e incluyen IVA salvo indicación contraria. Nos reservamos el derecho de corregir errores de precio y de limitar cantidades por disponibilidad de stock.',
        ],
      },
      {
        title: '5. Compras y pagos',
        paragraphs: [
          'Al confirmar un pedido, recibirás un correo con el detalle de la compra. Aceptamos los medios de pago habilitados en el checkout. La compra se considera confirmada una vez acreditado el pago o aprobada la transacción por el procesador correspondiente.',
        ],
      },
      {
        title: '6. Envíos y entregas',
        paragraphs: [
          'Los plazos de entrega son estimados y pueden variar según la zona y el operador logístico. WePadel no se responsabiliza por demoras causadas por fuerza mayor, condiciones climáticas extremas o inconvenientes ajenos a nuestra gestión directa.',
        ],
      },
      {
        title: '7. Cambios y devoluciones',
        paragraphs: [
          'Podés solicitar cambio o devolución dentro de los 10 días corridos desde la recepción del producto, siempre que el artículo se encuentre sin uso, con su embalaje original y con el comprobante de compra. Los costos de envío de devolución pueden aplicar según el motivo del reclamo.',
        ],
      },
      {
        title: '8. Garantía',
        paragraphs: [
          'Los productos cuentan con garantía oficial del fabricante y/o garantía comercial de WePadel según corresponda. Para hacer efectiva la garantía, conservá la factura y contactanos a soporte@wepadel.com indicando número de pedido y detalle del inconveniente.',
        ],
      },
      {
        title: '9. Limitación de responsabilidad',
        paragraphs: [
          'WePadel no será responsable por daños indirectos, lucro cesante o pérdidas derivadas del uso indebido del equipamiento. Nuestra responsabilidad frente a cualquier reclamo relacionado con una compra se limita al monto efectivamente abonado por el producto en cuestión, en la medida permitida por la legislación aplicable.',
        ],
      },
      {
        title: '10. Ley aplicable y contacto',
        paragraphs: [
          'Estos términos se rigen por las leyes de la República Argentina. Ante consultas o reclamos, podés escribirnos a soporte@wepadel.com o comunicarte por WhatsApp al +54 9 11 3063-8729.',
        ],
      },
    ]}
  />
);
