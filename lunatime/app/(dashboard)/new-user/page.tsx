'use client';
import { useState, useCallback } from 'react';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Logout from '@/components/Logout';

const initialState = {
  cycleLength: 30,
  periodLength: 5,
  periodStart: new Date(),
  lastEdited: new Date(),
};

const NewUser = () => {
  const [cycle, setCycle] = useState({ ...initialState });

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('new cycle entry is: ', cycle);
      // try {
      // mode === 'register' ? await signUp(form) : await signIn(form);
      // router.replace('/home');
      // } catch (error) {
      // setError(`Could not ${mode}...`);
      // console.error(error);
      // } finally {
      // setCycle({ ...initialState });
      // }
    },
    [cycle]
  );

  const handleCycleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCycle((s) => ({ ...s, cycleLength: Number(e.target.value) }));
  };

  const handleMenstrualChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCycle((s) => ({ ...s, periodLength: Number(e.target.value) }));
  };

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.value: ', e.target.value);
  };
  // flex items-center justify-between w-3/4 mx-auto mt-4 mb-8
  return (
    <main className="w-3/4 mx-auto mt-4">
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-xl">Create your first cycle entry</h2>
        </div>
        <form
          className="w-full py-10 ml-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-between mb-8">
            <div className="pr-2">
              <label
                className="mb-4 ml-2 italic text-med text-black/50"
                htmlFor="cycleLength"
              >
                My cycle duration is usually
                <Input
                  id="cycleLength"
                  className="ml-4 mr-2"
                  intent="primary"
                  size="medium"
                  type="number"
                  value={cycle.cycleLength}
                  onChange={handleCycleChange}
                />
                days
              </label>
            </div>
            <div className="pr-2">
              <label
                className="mb-4 ml-2 italic text-med text-black/50"
                htmlFor="periodLength"
              >
                My period typically lasts
                <Input
                  id="periodLength"
                  className="ml-4 mr-2"
                  intent="primary"
                  size="medium"
                  type="number"
                  value={cycle.periodLength}
                  onChange={handleMenstrualChange}
                />
                days
              </label>
            </div>
            <div className="pr-2">
              <label
                className="mb-4 ml-2 italic text-med text-black/50"
                htmlFor="periodStart"
              >
                My last period started on
                <Input
                  id="periodStart"
                  className="ml-4"
                  intent="primary"
                  size="medium"
                  type="date"
                  // value={new Date()}
                  onChange={handleStartChange}
                />
              </label>
            </div>
            <div className='flex justify-end space-x-4'>
              <Button
                type="submit"
                intent="primary"
              >
                Save
              </Button>
              <Button
                type="reset"
                intent="secondary"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewUser;

/* API ROUTE

  Create/embed the first 'date' obj

    body.lastPeriod: date last one started
      // calulate its end based on body.menstrualLength

    body.dates: await Cycle.create({
      cycleLength: body.cycleLength,
      menstrualLength: body.menstrualLength,
      fertileRange: <...>,
      pmsRange: <...>,
      menstrualRange: [body.lastPeriod, (body.lastPeriod + body.menstrualLength)],

    })

  */
