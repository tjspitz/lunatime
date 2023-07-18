export interface CycleDates {
  _id: string;
  dates: [
    {
      _id: Date;
      cycle: {
        [key: string]: Date;
        fStart: Date;
        fEnd: Date;
        pStart: Date;
        pEnd: Date;
        mStart: Date;
        mEnd: Date;
      };
    }
  ];
};

export interface ProfileInfo {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  pic: any;
  address: {
    city: string;
    state: string;
    zip: number;
  };
};

export type GetCycles = (id: string) => Promise<CycleDates>;

export type GetProfile = (id: string) => Promise<ProfileInfo>;

export type PatchProfile = (
  id: string,
  // data: FormData
  data: {
    [k: string]: FormDataEntryValue;
  }
) => Promise<any>; // TODO

export type ReqOptions = {
  [k: string]: RequestCache;
};
