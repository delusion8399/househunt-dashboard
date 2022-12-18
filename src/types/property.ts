export type ListingBillingOtherCharge = {
  label?: string;
  value?: number;
};

export type ListingImage = {
  url?: string;
  name?: string;
  type?: string;
};

export type ListingAdminJSImage = {
  key: string[];
  sizes: number[];
  type: string[];
  bucket: string[];
};

export type ListingBillingBill = {
  water?: "included" | "separate";
  electricity?: "included" | "separate";
};

export type ListingBilling = {
  rent?: number;
  rentPeriod?: "day" | "month" | "year";
  advance?: number;
  otherCharges?: ListingBillingOtherCharge[];
  bills?: ListingBillingBill;
};

export type ListingPlaceDescription = {
  label?: string;
  value?: string;
};

export interface Property {
  title?: string;
  userId?: string;
  available?: boolean;
  description?: string;
  listingType?:
    | "apartment"
    | "room_in_apartment"
    | "daily_rent"
    | "hostel"
    | "office_space"
    | "godown"
    | "shop";
  contact?: string;
  contacts: string[];
  address: {
    building?: string;
    road?: string;
    district?: string;
    floor?: string;
    city?: string;
  };
  placeDescription: ListingPlaceDescription[];
  placeInfo: {
    masterApartmentRooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    balcony?: "YES" | "NO" | "NA";
    frontDoorSecurity?: "YES" | "NO" | "NA";
    securityCameras?: "YES" | "NO" | "NA";
    lift?: "YES" | "NO" | "NA";
    freeWifi?: "YES" | "NO" | "NA";
    freeTv?: "YES" | "NO" | "NA";
    accmodationFor?: "girls" | "boys" | "any";
    idealTenants?: string;
    furnishing?: "Not Furnished" | "Semi-Furnished" | "Fully Furnished" | "-";
  };
  images: ListingImage[];
  slug?: string;
  ibayListingId?: string;
  ibayLink?: string;
  source?: "ibay" | "househunt";
  searchText?: string;
  _id: string;
  updatedAt?: Date;
  createdAt?: Date;
  adminJSImages?: ListingAdminJSImage;
  billing?: ListingBilling;
}
