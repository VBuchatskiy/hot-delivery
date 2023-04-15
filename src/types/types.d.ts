type TParcelType =
  | "gadgets"
  | "drinks"
  | "clothes"
  | "medicines"
  | "other"
  | "";
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
  parcel_type: "order" | "deliver";
  create_at: string;
}

interface IOrder {
  id?: string;
  customer: {
    id: string;
    full_name: string;
  } | null;
  city_from: string;
  city_to: string;
  type: TParcelType;
  dispatch_date: string | Date;
  parcel_type: "order";
  create_at: string | Date;
}

interface IDeliver {
  id?: string;
  customer: {
    id: string;
    full_name: string;
  } | null;
  city_from: string;
  city_to: string;
  type: TParcelType;
  dispatch_date: string;
  description: string;
  parcel_type: "deliver";
  create_at: string | Date;
}

interface IProfile {
  id: string;
  full_name: string;
}
