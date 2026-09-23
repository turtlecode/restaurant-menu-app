export type PriceSegment = '₺' | '₺₺' | '₺₺₺';

export interface LocationHierarchy {
  cities: {
    name: string;
    districts: {
      name: string;
      neighborhoods: {
        name: string;
        streets: string[];
      }[];
    }[];
  }[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags?: string[]; // e.g. ["Çok Satan", "Acılı 🌶️", "Vejetaryen 🥬", "Şefin Seçimi ⭐"]
  calories?: number;
  ingredients?: string[];
}

export interface RestaurantAddress {
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  fullAddress: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string; // e.g. "Pideci", "Pizzacı", "Dönerci", "Kebapçı", "Burger", "Ev Yemekleri", "Tatlıcı"
  cuisineTags: string[];
  rating: number;
  reviewCount: number;
  priceSegment: PriceSegment;
  deliveryTime: string;
  minOrder: number;
  image: string;
  coverImage: string;
  isOpen: boolean;
  address: RestaurantAddress;
  phone: string;
  workingHours: string;
  menuCategories: string[];
  menu: MenuItem[];
}

export interface FilterState {
  searchQuery: string;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  selectedCuisine: string;
  minRating: number | null;
  priceSegment: PriceSegment | null;
}
