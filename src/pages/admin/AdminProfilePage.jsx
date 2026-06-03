import { AdminProfileSection } from '../../components/admin/AdminProfileSection/AdminProfileSection';
import { adminSectionContent } from '../../data/adminProductsData';

export const AdminProfilePage = () => (
  <AdminProfileSection
    title={adminSectionContent.profile.title}
    subtitle={adminSectionContent.profile.subtitle}
  />
);
