import { Grid } from '@mui/material';
import { ProfilePageLayout } from '../components/layout/ProfilePageLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { ProfileDataCard } from '../components/profile/ProfileDataCard/ProfileDataCard';
import { ProfileBenefitsGrid } from '../components/profile/ProfileBenefitsGrid/ProfileBenefitsGrid';
import { PointsBadge } from '../components/profile/orders/PointsBadge/PointsBadge';

export const ProfilePage = () => {
  return (
    <ProfilePageLayout>
      <PageHeader
        variant="profile"
        title="Mi Perfil"
        subtitle="Administra tu cuenta y revisa tus beneficios exclusivos."
      />

      <Grid container spacing={3} className="profile-section">
        <Grid size={{ xs: 12, lg: 8 }}>
          <ProfileDataCard />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <PointsBadge pointsValue={500} />
        </Grid>
      </Grid>

      <ProfileBenefitsGrid />
    </ProfilePageLayout>
  );
};
