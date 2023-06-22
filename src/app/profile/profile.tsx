'use client';
import { ProfileInfo } from '../../utils/interfaces';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProfileContainer = ({ profile }: { profile: ProfileInfo }) => {
  const [profileData, setProfileData] = useState(profile);
  const { firstName, lastName, phone, email, pic } = profileData;
  const { city, state, zip } = profileData.address;

  const picBase64 = Buffer.from(pic).toString('base64');

  return (
    <main className="flex flex-col m-8 min-h-full">
      <div className="py-4">
        <Image
          src={`data:image/png;base64,${picBase64}`}
          alt="User's profile pic"
          width={100}
          height={100}
          style={{borderRadius: "50%"}}
        />
      </div>
      <div className="py-4">
        <p>{`Your first name is: ${firstName}`}</p>
        <p>{`Your last name is: ${lastName}`}</p>
        <p>{`Your phone number is: ${phone}`}</p>
        <p>{`Your email is: ${email}`}</p>
      </div>
      <div className="py-4">
        <p>Your address details are:</p>
        <p>{`City of ${city}`}</p>
        <p>{`In the state of ${state}`}</p>
        <p>{`With a zip code of ${zip.toString()}`}</p>
      </div>
    </main>
  );
};

export default ProfileContainer;
