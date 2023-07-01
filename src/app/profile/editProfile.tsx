'use client';
import { ProfileInfo } from '@/utils/interfaces';
import { useState } from 'react';

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
  handleUpdateProfile,
}: {
  profileData: ProfileInfo
  editable: boolean;
  handleUpdateProfile: any // FIX TYPE
}) => {
  const {
    phone,
    email,
    address: {city, state, zip},
  } = profileData;

  const [theState, setTheState] = useState(state);

  return (
    <main>
      <form className="py-4 flex flex-col" onSubmit={handleUpdateProfile}>
        <label className="text-med py-2">
          Phone:&nbsp;&nbsp;&nbsp;
          <input name="phone" defaultValue={phone} disabled={!editable} />
        </label>
        <label className="text-med py-2">
          Email:&nbsp;&nbsp;&nbsp;
          <input name="email" defaultValue={email} disabled={!editable} />
        </label>
        <label className="text-med py-2">
          City:&nbsp;&nbsp;&nbsp;
          <input name="city" defaultValue={city} disabled={!editable} />
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
    </main>
  );
};

export default EditForm;
