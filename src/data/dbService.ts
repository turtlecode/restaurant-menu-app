import { LOCATION_DATA } from './locations';
import { RESTAURANTS_DATA } from './restaurants';
import { Restaurant, FilterState, MenuItem } from '../types';

export const CUISINE_CATEGORIES = [
  { id: 'all', name: 'Tümü', icon: '🍽️' },
  { id: 'Pideci', name: 'Pideci', icon: '🥟' },
  { id: 'Pizzacı', name: 'Pizzacı', icon: '🍕' },
  { id: 'Dönerci', name: 'Dönerci', icon: '🥩' },
  { id: 'Kebapçı', name: 'Kebapçı', icon: '🥙' },
  { id: 'Burger', name: 'Burger', icon: '🍔' },
  { id: 'Ev Yemekleri', name: 'Ev Yemekleri', icon: '🍲' },
  { id: 'Tatlıcı', name: 'Tatlı & Kafe', icon: '🍰' },
];

export class LocalDatabaseService {
  // Get all cities
  static getCities(): string[] {
    return LOCATION_DATA.cities.map((c) => c.name);
  }

  // Get districts for a city
  static getDistricts(cityName: string): string[] {
    const city = LOCATION_DATA.cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
    return city ? city.districts.map((d) => d.name) : [];
  }

  // Get neighborhoods for a district
  static getNeighborhoods(cityName: string, districtName: string): string[] {
    const city = LOCATION_DATA.cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
    if (!city) return [];
    const district = city.districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
    return district ? district.neighborhoods.map((n) => n.name) : [];
  }

  // Get streets for a neighborhood
  static getStreets(cityName: string, districtName: string, neighborhoodName: string): string[] {
    const city = LOCATION_DATA.cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
    if (!city) return [];
    const district = city.districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
    if (!district) return [];
    const neighborhood = district.neighborhoods.find((n) => n.name.toLowerCase() === neighborhoodName.toLowerCase());
    return neighborhood ? neighborhood.streets : [];
  }

  // Filter restaurants by criteria
  static getFilteredRestaurants(filters: Partial<FilterState>): Restaurant[] {
    return RESTAURANTS_DATA.filter((restaurant) => {
      // 1. Text search on Restaurant Name or Menu Item Name
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = restaurant.name.toLowerCase().includes(query);
        const matchesCuisine = restaurant.cuisine.toLowerCase().includes(query);
        const matchesTags = restaurant.cuisineTags.some((t) => t.toLowerCase().includes(query));
        const matchesMenu = restaurant.menu.some(
          (item) => item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesCuisine && !matchesTags && !matchesMenu) {
          return false;
        }
      }

      // 2. Cuisine filter
      if (filters.selectedCuisine && filters.selectedCuisine !== 'all') {
        if (restaurant.cuisine !== filters.selectedCuisine) {
          return false;
        }
      }

      // 3. Location: City
      if (filters.city && filters.city !== '') {
        if (restaurant.address.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }
      }

      // 4. Location: District
      if (filters.district && filters.district !== '') {
        if (restaurant.address.district.toLowerCase() !== filters.district.toLowerCase()) {
          return false;
        }
      }

      // 5. Location: Neighborhood
      if (filters.neighborhood && filters.neighborhood !== '') {
        if (restaurant.address.neighborhood.toLowerCase() !== filters.neighborhood.toLowerCase()) {
          return false;
        }
      }

      // 6. Location: Street
      if (filters.street && filters.street !== '') {
        if (restaurant.address.street.toLowerCase() !== filters.street.toLowerCase()) {
          return false;
        }
      }

      // 7. Min Rating
      if (filters.minRating && restaurant.rating < filters.minRating) {
        return false;
      }

      // 8. Price segment
      if (filters.priceSegment && restaurant.priceSegment !== filters.priceSegment) {
        return false;
      }

      return true;
    });
  }

  // Get restaurant by ID
  static getRestaurantById(id: string): Restaurant | undefined {
    return RESTAURANTS_DATA.find((r) => r.id === id);
  }

  // Search dishes across all restaurants
  static searchDishes(query: string): { restaurant: Restaurant; dish: MenuItem }[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results: { restaurant: Restaurant; dish: MenuItem }[] = [];
    RESTAURANTS_DATA.forEach((r) => {
      r.menu.forEach((dish) => {
        if (dish.name.toLowerCase().includes(q) || dish.description.toLowerCase().includes(q)) {
          results.push({ restaurant: r, dish });
        }
      });
    });
    return results;
  }
}
