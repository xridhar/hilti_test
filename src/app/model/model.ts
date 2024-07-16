export interface ICreateProfile {
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  country: string;
  phone: string;
}

export interface IList {
  data: IProfileList;
}

export interface IProfileList {
  id: string;
  firstName: string;
  lastName: string;
  age: any;
  city: string;
  country: string;
  phone: string;
}
