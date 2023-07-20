'use client';
import Image from 'next/image';
import { ProfileInfo } from '@/utils/types';
import { Dispatch, SetStateAction, useState } from 'react';

const fiftyStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const EditForm = ({
  profileData,
  editable,
  selectedImage,
  setSelectedImage,
  handleUpdateProfile,
}: {
  profileData: ProfileInfo;
  editable: Boolean;
  selectedImage: ArrayBuffer | String;
  setSelectedImage: Dispatch<SetStateAction<ArrayBuffer | String>>;
  handleUpdateProfile: any;
}) => {
  const {
    phone,
    email,
    address: { city, state, zip },
  } = profileData;

  const [theState, setTheState] = useState(state);
  const picBase64 = Buffer.from(profileData.pic).toString('base64');
  const selectedPic = Buffer.from(selectedImage).toString('base64');

  const handlePicEdit = (e: any) => {
    e.preventDefault();
    document.getElementById('choosePic')?.click();
  };

  const handlePicChange = (e: any) => {
    e.preventDefault();
    const newPic = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (picEvent) => {
      setSelectedImage(picEvent.target?.result || '');

    }
    reader.readAsArrayBuffer(newPic);
  }

  return (
    <main>
      <form className="py-4 flex flex-col" onSubmit={handleUpdateProfile}>
        <label className="flex py-2 items-center">
          {selectedImage ? (
              <Image
                src={`data:image/png;base64,${selectedPic}`}
                alt="Selected profile pic"
                height={100}
                width={100}
                className="rounded-full"
              />
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
            <>
              <input
                id="choosePic"
                type="file"
                name="newPic"
                accept="image/*"
                className="my-2 hidden"
                onChange={handlePicChange}
              />
              <button
                type="button"
                className="p-2 m-2 rounded-md border-solid border-2 border-red-400"
                onClick={handlePicEdit}
              >
                Edit Pic
              </button>
            </>
          )}
        </label>
        <label className="text-med py-2">
          Phone:&nbsp;&nbsp;&nbsp;
          <input
            name="phone"
            defaultValue={phone}
            disabled={!editable}
            size={phone.length + 1}
          />
        </label>
        <label className="text-med py-2">
          Email:&nbsp;&nbsp;&nbsp;
          <input
            name="email"
            defaultValue={email}
            size={email.length + 1}
            disabled={!editable}
          />
        </label>
        <label className="text-med py-2">
          City:&nbsp;&nbsp;&nbsp;
          <input
            name="city"
            defaultValue={city}
            disabled={!editable}
            size={city.length + 1}
          />
        </label>
        <label className="text-med py-2">
          State:&nbsp;&nbsp;&nbsp;
          <select
            name="state"
            value={theState}
            onChange={(e) => setTheState(e.target.value)}
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
          Zip:&nbsp;&nbsp;&nbsp;
          <input
            name="zip"
            defaultValue={zip.toString()}
            disabled={!editable}
            size={6}
          />
        </label>
          <div
            className={`flex flex-row justify-end text-med ${editable ? null : 'hidden'}`}
          >
            <button
              className="p-2 mx-4 rounded-md border-solid border-2 border-red-400"
              type="reset"
            >
              Reset
            </button>
            <button
              className="p-2 rounded-md border-solid border-2 border-red-400"
              type="submit"
            >
              Save
            </button>
          </div>
      </form>
    </main>
  );
};

export default EditForm;
