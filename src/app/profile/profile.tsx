'use client';
import { ProfileInfo } from '../../utils/interfaces';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProfileContainer = ({
  profile,
  fiftyStates,
}: {
  profile: ProfileInfo;
  fiftyStates: string[];
}) => {
  const [profileData, setProfileData] = useState(profile);
  const [editable, setEditable] = useState(false);
  const { firstName, lastName, phone, email, pic } = profileData;
  const { city, state, zip } = profileData.address;

  const picBase64 = Buffer.from(pic).toString('base64');

  const handleUpdateProfile = () => null;

  return (
    <main className="flex flex-col m-8 min-h-full">
      <div>
        <Image
          src={`data:image/png;base64,${picBase64}`}
          alt="User's profile pic"
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
        <Image
          src="/editProfile.png"
          alt="Edit your profile"
          width={50}
          height={50}
          style={{ borderRadius: '50%' }}
          onClick={() => setEditable(!editable)}
        />
      </div>
      {/* <div className="py-4">
        <p className="text-lg py-2">{firstName}&nbsp;{lastName}</p>
        <p className="text-med py-2">{phone}</p>
        <p className="text-med py-2">{email}</p>
        <p className="text-base py-2">
          {city}&#44;&nbsp;{state}&nbsp;{zip.toString()}
          </p>
      </div>
      <div className="py-4">
        <p className="text-lg py-2">
          {firstName}&nbsp;{lastName}
        </p>
      </div> */}
      <div>
        <p className="text-lg py-2">
          {firstName}&nbsp;{lastName}
        </p>
        <form className="py-4 flex flex-col" onSubmit={handleUpdateProfile}>
          <label className="text-med py-2">
            Phone:{' '}
            <input name="phone" defaultValue={phone} disabled={!editable} />
          </label>
          <label className="text-med py-2">
            Email:{' '}
            <input name="email" defaultValue={email} disabled={!editable} />
          </label>
          <label className="text-med py-2">
            City: <input name="city" defaultValue={city} disabled={!editable} />
          </label>
          <label className="text-med py-2">
            State:
            <select
              name="state"
              value={state}
              onChange={() => null} // TODO
              disabled={!editable}
            >
              {fiftyStates.map((state, i) => (
                <option key={state + (i + 1)} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label className="text-med py-2">
            Zip:{' '}
            <input
              name="zip"
              defaultValue={zip.toString()}
              disabled={!editable}
            />
          </label>
          {editable && (
            <div className="flex flex-row justify-end text-med">
              <button
                className="p-2 mx-4 rounded-md border-solid border-2 border-red-400"
                type="reset"
              >
                Cancel
              </button>
              <button
                className="p-2 rounded-md border-solid border-2 border-red-400"
                type="submit"
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default ProfileContainer;
