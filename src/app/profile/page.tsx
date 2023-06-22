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

const fiftyStates = [
  'AL', // Alabama
  'AK', // Alaska
  'AZ', // Arizona
  'AR', // Arkansas
  'CA', // California
  'CO', // Colorado
  'CT', // Connecticut
  'DE', // Delaware
  'FL', // Florida
  'GA', // Georgia
  'HI', // Hawaii
  'ID', // Idaho
  'IL', // Illinois
  'IN', // Indiana
  'IA', // Iowa
  'KS', // Kansas
  'KY', // Kentucky
  'LA', // Louisiana
  'ME', // Maine
  'MD', // Maryland
  'MA', // Massachusetts
  'MI', // Michigan
  'MN', // Minnesota
  'MS', // Mississippi
  'MO', // Missouri
  'MT', // Montana
  'NE', // Nebraska
  'NV', // Nevada
  'NH', // New Hampshire
  'NJ', // New Jersey
  'NM', // New Mexico
  'NY', // New York
  'NC', // North Carolina
  'ND', // North Dakota
  'OH', // Ohio
  'OK', // Oklahoma
  'OR', // Oregon
  'PA', // Pennsylvania
  'RI', // Rhode Island
  'SC', // South Carolina
  'SD', // South Dakota
  'TN', // Tennessee
  'TX', // Texas
  'UT', // Utah
  'VT', // Vermont
  'VA', // Virginia
  'WA', // Washington
  'WV', // West Virginia
  'WI', // Wisconsin
  'WY',  // Wyoming
]

const ProfilePage = async () => {
  const userId = '6485475f06277f54cae53e51'; // testing 'Olivia'
  const profile: ProfileInfo = await getData(userId);

  return (
    <main>
      <p className="text-2xl">This is where you&apos;d view and/or edit your profile.</p>
      <div className="m-8 flex justify-center">
        <ProfileContainer profile={profile} fiftyStates={fiftyStates}/>
      </div>
    </main>
  );
};

export default ProfilePage;
