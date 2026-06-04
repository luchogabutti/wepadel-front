import { PageHeader } from '../../../layout/PageHeader';
import { ProfileDataCard } from '../../../profile/ProfileDataCard/ProfileDataCard';
import { accountUser } from '../../../../config/accountUser';
import '../../styles.scss';

const splitName = (fullName) => {
  const [firstName, ...rest] = fullName.trim().split(' ');
  return { firstName, lastName: rest.join(' ') };
};

export const AdminProfileSection = ({ title, subtitle }) => {
  const { firstName, lastName } = splitName(accountUser.name);

  return (
    <>
      <PageHeader variant="profile" title={title} subtitle={subtitle} />

      <ProfileDataCard
        firstName={firstName}
        lastName={lastName}
        email={accountUser.email}
      />
    </>
  );
};
