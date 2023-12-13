// import { getProfile } from '@/lib/api';
import { GetProfile, ProfileInfo, ReqOptions } from '@/lib/types';
import ProfileContainer from './profile';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/auth';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// OLD (pre-auth)
// const getProfile: GetProfile = async (id) => {
//   const url = 'http://localhost:3000/api/profile';
//   const params = new URLSearchParams({ userId: id });
//   const options: ReqOptions = { cache: 'no-store' };
//   try {
//     const res = await fetch(`${url}?${params}`, options);
//     return res.json();
//   } catch (error: any) {
//     console.error(error);
//     return {} as ProfileInfo;
//   }
// };

// NEW (post-auth)
// TO-DO: type it (GetProfile), find a better way
const getProfile = async (exclude: string) => {
  const userCookie = cookies().get('lunatime_cookie');
  const userProfile = await getUserFromCookie(userCookie as RequestCookie, exclude);
  return JSON.stringify(userProfile);
};

const ProfilePage = async () => {
  // OLD
  // const userId = '6485475f06277f54cae53e51'; // testing 'Olivia'
  // const profile: ProfileInfo = await getProfile(userId);

  // NEW
  const exclude = '-password -dates -notes';
  const profile = JSON.parse(await getProfile(exclude));

  return (
    <main>
      <div className="flex justify-center m-8">
        <ProfileContainer profile={profile} />
      </div>
    </main>
  );
};

export default ProfilePage;
