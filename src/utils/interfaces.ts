/* MOVING TO TYPES.JS

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
}

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
}
*/