import { ProfileInfo } from '@/utils/interfaces';
import { PatchProfile } from '@/utils/types';
import ProfileContainer from './profile';
const url = 'http://localhost:3000/api/profile';

const getProfile = async (id: string) => {
  try {
    const params = new URLSearchParams({ userId: id });
    const res = await fetch(`${url}?${params}`);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const patchProfile: PatchProfile = async (id, data) => {
  try {
    const params = new URLSearchParams({ userId: id });
    const options = {
      method: 'PATCH',
      // headers: { 'Content-Type': 'application/json' },
      body: data,
    }
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
      <p className="text-2xl">
        This is where you&apos;d view and/or edit your profile.
      </p>
      <div className="m-8 flex justify-center">
        <ProfileContainer profile={profile} patchProfile={patchProfile} />
      </div>
    </main>
  );
};

export default ProfilePage;
