export interface CycleDates {
  _id: String;
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
  _id: String;
  firstName: String;
  lastName: String;
  phone: String;
  email: String;
  pic: any;
  address: {
    city: String;
    state: String;
    zip: Number;
  };
}