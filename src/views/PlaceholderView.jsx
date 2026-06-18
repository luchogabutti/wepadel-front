import { CenteredPage } from '../components/layout/CenteredPage';
import { PageHeader } from '../components/layout/PageHeader';

export const PlaceholderView = ({ title = 'Página' }) => {
  return (
    <CenteredPage>
      <PageHeader title={title} subtitle="Esta sección estará disponible próximamente." />
    </CenteredPage>
  );
};
