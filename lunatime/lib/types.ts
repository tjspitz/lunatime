// General/Misc.
export type ReqOptions = {
  [k: string]: RequestCache;
};

// CALENDAR & CYCLES
type DateValPiece = Date | null;
export type DateVal = DateValPiece | [DateValPiece, DateValPiece];

export type MakeCycle = (current: CycleReq) => CyclePost;

export type GetCycles = (id: string) => Promise<CycleDates>;

export type PutCycles = (id: string, dates: CycleDates) => Promise<any>;

export type CycleReq = Omit<CycleState, 'periodStart'> & {
  periodStart: Date;
}

export type RangeData = {
  index: number;
  type: string;
  range: Date[];
}

export type CycleState = {
  cycleLength: number;
  periodLength: number;
  periodStart: DateVal;
  lastEdited: Date;
}

export type CyclePost = {
  lastEdited: Date;
  cycleLength: number;
  periodLength: number;
  pmsRange: [null, null] | [Date, Date];
  fertileRange: [Date, Date];
  menstrualRange: [Date, Date];
};

export type GetFertileRange = (
  length: number,
  prevStart: Date,
) => [Date, Date];
export type GetPmsRange = (rangeEnd: Date) => [Date, Date];
export type GetMenstrualRange = (start: Date, length: number) => [Date, Date];

export type CycleInfo = {
  cycleLength: Number;
  periodLength: Number;
  dates: CycleDates;
}

export type CycleDates = {
  _id: String;
  createdAt: Date;
  lastEdited: Date;
  cycleLength: Number;
  periodLength: Number;
  fertileRange: [Date, Date];
  pmsRange: [Date, Date];
  menstrualRange: [Date, Date];
}[];

export type CalRanges = {
  fertileRanges: Date[][];
  pmsRanges: Date[][];
  menstrualRanges: Date[][];
}

export type CalModals = {
  actionModal: boolean;
  noteModal: boolean;
  eventModal: boolean;
}

// PROFILE
export type GetProfile = (exclude: string) => Promise<ProfileInfo>;

export type FormatProfileForm = (id: string, form: FormDataEntryValue) => PatchedInfo;

export type PatchedInfo =
  Pick< ProfileInfo, 'phone' | 'email' | 'address' > & {
    id: string;
    newPic: Buffer;
};

export type PatchProfile = (
  id: string,
  data: {
    [k: string]: FormDataEntryValue;
  }
) => Promise<PatchedInfo>;

export type ProfileInfo = {
  _id: string;
  createdAt: Date;
  lastEdited: Date;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  cycleLength: number;
  periodLength: number;
  pic?: Buffer;
  address?: {
    city: string;
    state: string;
    zip: number;
  };
};

// DEPRECATED(?)
// export type UserInfo = {
//   _id: String;
//   createdAt: Date;
//   lastEdited: Date;
//   firstName: String;
//   lastName: String;
//   phone: String;
//   email: String;
//   username: String;
//   pic: Buffer;
//   cycleLength: Number;
//   menstrualLength: Number;
//   address: {
//     city: String;
//     state: String;
//     zip: Number;
//   },
// };

// export type NotesInfo = {
//   _id: String;
//   createdAt: Date;
//   lastEdited: Date;
//   note: String;
// };

// export type GetCycles = (id: string) => Promise<CycleDates>;

// export type PutCycles = (id: string, dates: CycleDates) => Promise<any>;

// export type GetUser = (id: string) => Promise<UserInfo>;

// export type PatchedUser =
//   Omit< UserInfo, 'pic' | 'dates' | 'notes'> & {
//     newPic: Buffer;
// };

// export type PatchUser = (
//   id: string,
//   data: {
//     [k: string]: FormDataEntryValue;
//   }
// ) => Promise<PatchedUser>;
