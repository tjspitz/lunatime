'use client';
import Image from 'next/image';
import { ProfileInfo } from '../../utils/interfaces';
import EditForm from './editProfile';
import { useEffect, useState } from 'react';

const ProfileContainer = ({ profile }: { profile: ProfileInfo }) => {
  const [profileData, setProfileData] = useState(profile);
  const [editable, setEditable] = useState(false);
  const { _id, firstName, lastName, phone, email, pic } = profileData;
  const { city, state, zip } = profileData.address;

  const picBase64 = Buffer.from(pic).toString('base64');

  const handleUpdateProfile = (e: Event) => {
    e.preventDefault();
    setEditable(false);
    // set the Profile Data state (so no GET needed)
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
      }
    });
    // TODO:
    // send a POST/PATCH request

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
          phone={phone}
          email={email}
          city={city}
          state={state}
          zip={zip}
          editable={editable}
          handleUpdateProfile={handleUpdateProfile}
        />
      </div>
    </main>
  );
};

export default ProfileContainer;
