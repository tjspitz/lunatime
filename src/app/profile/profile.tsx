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
  const [profileData, setProfileData] = useState(profile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editable, setEditable] = useState(false);

  const { _id, firstName, lastName, pic } = profileData;

  const handleUpdateProfile = (e: Event) => {
    e.preventDefault();
    setEditable(false);
    setSelectedImage(null)

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
          {/* <div className="flex flex-col">
            {selectedImage ? (
              <div>
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected profile pic"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            ) : (
              <Image
                src={`data:image/png;base64,${picBase64}`}
                alt="User's profile pic"
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            {editable && (
              <div>
                <input
                  id="choosePic"
                  type="file"
                  name="newPic"
                  className="my-2 hidden"
                  onChange={(e) => {
                    e.preventDefault();
                    console.log(e.target.files[0]);
                    setSelectedImage(e.target.files[0]);
                  }}
                />
                <button
                  type="button"
                  className="p-2 my-2 rounded-md border-solid border-2 border-red-400"
                  onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('choosePic')?.click()
                  }}
                >
                  Edit Pic
                </button>
              </div>
            )}
          </div> */}
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
