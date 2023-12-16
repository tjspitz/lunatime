'use client';
import Image from 'next/image';
import { PatchProfile, ProfileInfo } from '@/lib/types';
import EditForm from './editProfile';
import { useState } from 'react';

export default function ProfileContainer({
  profile,
}: {
  profile: ProfileInfo;
}) {
  const [selectedImage, setSelectedImage] = useState<ArrayBuffer | null>(null);
  const [editable, setEditable] = useState<Boolean>(false);

  const { _id, firstName, lastName } = profile;

  const handleUpdateProfile = (e: Event) => {
    e.preventDefault();
    setEditable(false);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    formJson.newPic = selectedImage;
    // ^ TODO: proper typing, less sketchy workaround

    patchProfile(_id, formJson)
      .then((response) => console.log('SUCCESS: ', response)) // DEV ONLY
      .catch((err) => console.error(err));
  };

  return (
    <main className="m-8">
      <div className="p-8 mx-8 rounded-lg shadow-xl bg-gradient-to-b from-yellow-100 to-yellow-50">
        <span className="flex items-center justify-center">
          <p className="m-4 text-lg">
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
          profileData={profile}
          editable={editable}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleUpdateProfile={handleUpdateProfile}
        />
      </div>
    </main>
  );
}

async function patchProfile(id, data): Promise<PatchProfile> {
  try {
    const url = 'http://localhost:3000/api/profile';
    const { newPic, phone, email, city, state, zip } = data;
    const formattedData = {
      newPic: Buffer.from(newPic), // TODO: proper typing
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
    return error;
  }
}
