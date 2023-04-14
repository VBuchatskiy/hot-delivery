interface IParcel {
  id: string;
  customer: {
    id: string;
    full_name: string;
  };
  city_from: string;
  city_to: string;
  type: string;
  dispatch_date: string;
  description?: string;
  parcel_type: string;
}

interface IProfile {
  id: string;
  full_name: string;
}
