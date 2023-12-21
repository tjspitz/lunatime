// import { getProfile } from '@/lib/api';
import { GetProfile, ProfileInfo } from '@/lib/types';
import ProfileContainer from './profile';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/auth';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export default async function ProfilePage() {
  const exclude = '-password -dates -notes';
  const profile = JSON.parse(await getProfile(exclude));

  return (
    <main>
      <div className="flex justify-center m-8">
        <ProfileContainer profile={profile} />
      </div>
    </main>
  );
}

// NEW (post-auth)
// TO-DO: type it (GetProfile), find a better way
async function getProfile (exclude: string) {
  const userCookie = cookies().get('lunatime_cookie');
  const userProfile: ProfileInfo = await getUserFromCookie(
    userCookie as RequestCookie,
    exclude,
  );
  return JSON.stringify(userProfile);
}
