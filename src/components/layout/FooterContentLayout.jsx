import { Typography } from '@mui/material';
import { PageContainer } from './PageContainer';
import { PageHeader } from './PageHeader';

export const FooterContentLayout = ({ title, subtitle, lastUpdated, sections }) => {
  return (
    <PageContainer narrow py={6}>
      <PageHeader title={title} subtitle={subtitle} />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mb: 4 }}
      >
        Última actualización: {lastUpdated}
      </Typography>

      <div style={{ maxWidth: 720 }}>
        {sections.map((section) => (
          <section key={section.title} style={{ marginBottom: '2rem' }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
              {section.title}
            </Typography>
            {section.paragraphs.map((text, index) => (
              <Typography
                key={index}
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.7 }}
              >
                {text}
              </Typography>
            ))}
          </section>
        ))}
      </div>
    </PageContainer>
  );
};
