'use client';
import Image from 'next/image';
import { PatchProfile } from '@/utils/types';
import { ProfileInfo } from '@/utils/interfaces';
import EditForm from './editProfile';
import { useEffect, useState } from 'react';

const patchProfile: PatchProfile = async (id, data) => {
  try {
    const url = 'http://localhost:3000/api/profile';
    const { phone, email, city, state, zip } = data;
    const formattedData = {
      phone,
      email,
      address: { city, state, zip }
    }
    const params = new URLSearchParams({ userId: id });
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    }

    const res = await fetch(`${url}?${params}`, config);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const ProfileContainer = ({
  profile,
}: {
  profile: ProfileInfo;
}) => {
  const [profileData, setProfileData] = useState(profile);
  const [editable, setEditable] = useState(false);

  const { _id, firstName, lastName, pic } = profileData;
  const picBase64 = Buffer.from(pic).toString('base64');

  const handleUpdateProfile = (e: Event) => {
    e.preventDefault();
    setEditable(false);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    setProfileData({
      _id,
      firstName,
      lastName,
      phone: String(formJson.phone),
      email: String(formJson.email),
      pic,
      address: {
        city: String(formJson.city),
        state: String(formJson.state),
        zip: Number(formJson.zip),
      },
    });

    patchProfile(_id, formJson);
  };

  return (
    <main className="flex m-8">
      <div className="mx-8">
        <Image
          src={`data:image/png;base64,${picBase64}`}
          alt="User's profile pic"
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
        <Image
          src="/edit.png"
          alt="Edit your profile"
          width={50}
          height={50}
          style={{ borderRadius: '50%' }}
          onClick={() => setEditable(!editable)}
        />
      </div>
      <div>
        <p className="text-lg py-2">
          {firstName}&nbsp;{lastName}
        </p>
        <EditForm
          profileData={profileData}
          editable={editable}
          handleUpdateProfile={handleUpdateProfile}
        />
      </div>
    </main>
  );
};

export default ProfileContainer;
