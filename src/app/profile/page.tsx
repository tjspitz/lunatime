import { ProfileInfo } from '@/utils/interfaces';
import { ReqOptions } from '@/utils/types';
import ProfileContainer from './profile';

const getProfile = async (id: string) => {
  const url = 'http://localhost:3000/api/profile';
  const params = new URLSearchParams({ userId: id });
  const options: ReqOptions = { cache: 'no-store' };
  try {
    const res = await fetch(`${url}?${params}`, options);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const ProfilePage = async () => {
  const userId = '6485475f06277f54cae53e51'; // testing 'Olivia'
  const profile: ProfileInfo = await getProfile(userId);

  return (
    <main>
      <div className="m-8 flex justify-center">
        <ProfileContainer profile={profile} />
      </div>
    </main>
  );
};

export default ProfilePage;
