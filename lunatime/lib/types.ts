
type DateValPiece = Date | null;
export type DateVal = DateValPiece | [DateValPiece, DateValPiece];

export type CycleState = {
  cycleLength: number;
  periodLength: number;
  periodStart: DateVal;
  lastEdited: Date;
}

export type CycleReq = Omit<CycleState, 'periodStart'> & {
  periodStart: Date;
}

export type CyclePost = {
  lastEdited: Date;
  cycleLength: number;
  periodLength: number;
  pmsRange: [null, null] | [Date, Date];
  fertileRange: [Date, Date];
  menstrualRange: [Date, Date];
};

export type MakeCycle = (current: CycleReq) => CyclePost;

export type GetFertileRange = (
  length: number,
  prevStart: Date,
) => [Date, Date];
export type GetPmsRange = (rangeEnd: Date) => [Date, Date];
export type GetMenstrualRange = (start: Date, length: number) => [Date, Date];

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

// export type CycleDates = {
//   dates: [
//     {
//       _id: String;
//       createdAt: Date;
//       lastEdited: Date;
//       fertileRange: [Date, Date];
//       pmsRange: [Date, Date];
//       menstrualRange: [Date, Date];
//     },
//   ];
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

// export type ReqOptions = {
//   [k: string]: RequestCache;
// };
