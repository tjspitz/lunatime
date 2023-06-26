import { ProfileInfo } from '../../utils/interfaces';
import ProfileContainer from './profile';

const getData = async (id: string) => {
  try {
    const url = 'http://localhost:3000/api/profile';
    const params = new URLSearchParams({ userId: id });
    const res = await fetch(`${url}?${params}`);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const ProfilePage = async () => {
  const userId = '6485475f06277f54cae53e51'; // testing 'Olivia'
  const profile: ProfileInfo = await getData(userId);

  return (
    <main>
      <p className="text-2xl">This is where you&apos;d view and/or edit your profile.</p>
      <div className="m-8 flex justify-center">
        <ProfileContainer profile={profile}/>
      </div>
    </main>
  );
};

export default ProfilePage;
