'use client';
import Image from 'next/image';
import { ProfileInfo } from '@/lib/types';
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
  selectedImage: ArrayBuffer | null;
  setSelectedImage: Dispatch<SetStateAction<ArrayBuffer | null>>;
  handleUpdateProfile: any;
}) => {
  const {
    pic,
    phone,
    email,
    address,
  } = profileData;
  const picBase64 = pic ? Buffer.from(pic).toString('base64') : null;
  const selectedPic = selectedImage ? Buffer.from(selectedImage).toString('base64') : null;

  const [theState, setTheState] = useState(address?.state);

  const handlePicEdit = (e: any) => {
    e.preventDefault();
    document.getElementById('choosePic')?.click();
  };

  const handlePicChange = (e: any) => {
    e.preventDefault();
    const newPic = e.target.files[0];
    if (newPic) {
      newPic.arrayBuffer()
      .then((arrBuf: ArrayBuffer) => {
        console.log(arrBuf)
        setSelectedImage(arrBuf)
      });
    }
  };

  return (
    <main>
      <form className="flex flex-col py-4" onSubmit={handleUpdateProfile}>
        <label className="flex items-center py-2">
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
                className="hidden my-2"
                onChange={handlePicChange}
              />
              <button
                type="button"
                className="p-2 m-2 border-2 border-red-400 border-solid rounded-md"
                onClick={handlePicEdit}
              >
                Edit Pic
              </button>
            </>
          )}
        </label>
        <label className="py-2 text-med">
          Phone:&nbsp;&nbsp;&nbsp;
          <input
            name="phone"
            defaultValue={phone}
            disabled={!editable}
            // size={phone?.length + 1 || 15}
          />
        </label>
        <label className="py-2 text-med">
          Email:&nbsp;&nbsp;&nbsp;
          <input
            name="email"
            defaultValue={email}
            // size={email.length + 5}
            disabled={!editable}
          />
        </label>
        <label className="py-2 text-med">
          City:&nbsp;&nbsp;&nbsp;
          <input
            name="city"
            defaultValue={address?.city}
            disabled={!editable}
            // size={address?.city.length + 1 || 15}
          />
        </label>
        <label className="py-2 text-med">
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
        <label className="py-2 text-med">
          Zip:&nbsp;&nbsp;&nbsp;
          <input
            name="zip"
            defaultValue={address?.zip.toString()}
            disabled={!editable}
            // size={10}
          />
        </label>
          <div
            className={`flex flex-row justify-end text-med ${editable ? null : 'hidden'}`}
          >
            <button
              className="p-2 mx-4 border-2 border-red-400 border-solid rounded-md"
              type="reset"
            >
              Reset
            </button>
            <button
              className="p-2 border-2 border-red-400 border-solid rounded-md"
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
