'use client';
import { useState, useCallback } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { addCycle } from '@/lib/api';
import { CycleState, DateVal } from '@/lib/types';
import Calendar from 'react-calendar';
import Input from '@/components/Input';
import Button from '@/components/Button';
import 'react-calendar/dist/Calendar.css';

const initialState: CycleState = {
  cycleLength: 30,
  periodLength: 5,
  periodStart: new Date(),
  lastEdited: new Date(),
};

const NewUser = () => {
  const [cycle, setCycle] = useState<CycleState>({ ...initialState });
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await addCycle(cycle);
        router.replace('/profile'); // TEMP
      } catch(error) {
        console.error(error);
      } finally {
        setCycle({ ...initialState });
      }
    },
    [cycle, router]
  );

  const handleCycleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCycle((s) => ({ ...s, cycleLength: Number(e.target.value) }));
  };

  const handleMenstrualChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCycle((s) => ({ ...s, periodLength: Number(e.target.value) }));
  };

  const handleStartChange = (newDate: DateVal) => {
    setCycle((s) => ({ ...s, periodStart: newDate }));
  };

  return (
    <main className="w-3/4 mx-auto mt-4">
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-xl">Create your first cycle entry</h2>
          <h4 className="italic text-med text-black/25">
            This helps predict your next cycle
          </h4>
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
                Duration of an average cycle:
                <Input
                  id="cycleLength"
                  className="ml-4 mr-2"
                  intent="primary"
                  size="medium"
                  type="number"
                  value={cycle.cycleLength}
                  placeholder="(default is 30)"
                  onChange={handleCycleChange}
                />
              </label>
            </div>
            <div className="pr-2">
              <label
                className="mb-4 ml-2 italic text-med text-black/50"
                htmlFor="periodLength"
              >
                Duration of an average period:
                <Input
                  id="periodLength"
                  className="ml-4 mr-2"
                  intent="primary"
                  size="medium"
                  type="number"
                  value={cycle.periodLength}
                  placeholder="(default is 5)"
                  onChange={handleMenstrualChange}
                />
              </label>
            </div>
            <div className="pr-2 mt-4">
              <label
                className="mb-4 ml-2 italic text-med text-black/50"
                htmlFor="periodStart"
              >
                Most recent period <b>start</b> date:
              </label>
              <Calendar
                // id="periodStart"
                value={cycle.periodStart}
                onChange={handleStartChange}
                maxDate={new Date()}
                className="mt-4"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                intent="primary"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewUser;
