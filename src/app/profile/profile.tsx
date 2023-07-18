'use client';
import Image from 'next/image';
import { PatchProfile, ProfileInfo } from '@/utils/types';
import EditForm from './editProfile';
import { useEffect, useState } from 'react';

const patchProfile: PatchProfile = async (id, data) => {
  try {
    const url = 'http://localhost:3000/api/profile';
    const { phone, email, city, state, zip } = data;
    const formattedData = {
      phone,
      email,
      address: { city, state, zip },
    };
    const params = new URLSearchParams({ userId: id });
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    };

    const res = await fetch(`${url}?${params}`, config);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const ProfileContainer = ({ profile }: { profile: ProfileInfo }) => {
  const [profileData, setProfileData] = useState<ProfileInfo>(profile);
  const [selectedImage, setSelectedImage] = useState<ArrayBuffer | String>('');
  const [editable, setEditable] = useState<Boolean>(false);

  const { _id, firstName, lastName, pic } = profileData;

  const handleUpdateProfile = (e: Event) => {
    e.preventDefault();
    setEditable(false);
    setSelectedImage('');

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
    <main className="m-8">
      <div className="mx-8">
        <span className="flex items-center justify-center">
          <p className="text-lg m-4">
            {firstName}&nbsp;{lastName}
          </p>
          <Image
            src="/edit.png"
            alt="Edit your profile"
            width={66}
            height={66}
            className="m-4 rounded-full"
            onClick={() => setEditable(!editable)}
          />
        </span>
        <EditForm
          profileData={profileData}
          editable={editable}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleUpdateProfile={handleUpdateProfile}
        />
      </div>
    </main>
  );
};

export default ProfileContainer;
