import { PageHeader } from '../../../layout/PageHeader';
import { ProfileDataCard } from '../../../profile/ProfileDataCard/ProfileDataCard';
import '../../styles.scss';

export const AdminProfileSection = ({
  title,
  subtitle,
  firstName,
  lastName,
  email,
  onSave,
  onProfileSaved,
}) => (
  <>
    <PageHeader variant="profile" title={title} subtitle={subtitle} />

    <ProfileDataCard
      key={`${firstName}-${lastName}-${email}`}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSave={onSave}
      onSaved={onProfileSaved}
    />
  </>
);
