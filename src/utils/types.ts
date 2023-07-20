export type CycleDates = {
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

export type ProfileInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  pic: Buffer;
  address: {
    city: string;
    state: string;
    zip: number;
  };
};

export type PatchedInfo =
  Pick< ProfileInfo, '_id' | 'phone' | 'email' | 'address' > & {
    newPic: Buffer;
  };

export type GetCycles = (id: string) => Promise<CycleDates>;

export type GetProfile = (id: string) => Promise<ProfileInfo>;

export type PatchProfile = (
  id: string,
  data: {
    [k: string]: FormDataEntryValue;
  }
) => Promise<PatchedInfo>;

export type ReqOptions = {
  [k: string]: RequestCache;
};
