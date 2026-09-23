import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { FilterBar } from '../components/FilterBar';
import { LocationPickerModal } from '../components/LocationPickerModal';
import { RestaurantCard } from '../components/RestaurantCard';
import { LocalDatabaseService } from '../data/dbService';
import { Restaurant, FilterState, PriceSegment } from '../types';
import { COLORS } from '../theme/colors';

interface HomeScreenProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectRestaurant }) => {
  const { width } = useWindowDimensions();

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    city: '',
    district: '',
    neighborhood: '',
    street: '',
    selectedCuisine: 'all',
    minRating: null,
    priceSegment: null,
  });

  const [locationModalVisible, setLocationModalVisible] = useState(false);

  // Compute filtered restaurants with our database service
  const filteredRestaurants = useMemo(() => {
    return LocalDatabaseService.getFilteredRestaurants(filters);
  }, [filters]);

  const handleApplyLocation = (city: string, district: string, neighborhood: string, street: string) => {
    setFilters((prev) => ({
      ...prev,
      city,
      district,
      neighborhood,
      street,
    }));
  };

  const handleResetLocation = () => {
    setFilters((prev) => ({
      ...prev,
      city: '',
      district: '',
      neighborhood: '',
      street: '',
    }));
  };

  const handleResetAllFilters = () => {
    setFilters({
      searchQuery: '',
      city: '',
      district: '',
      neighborhood: '',
      street: '',
      selectedCuisine: 'all',
      minRating: null,
      priceSegment: null,
    });
  };

  // Determine grid column layout based on window width
  const isDesktop = width >= 1024;
  const isTablet = width >= 640 && width < 1024;
  const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;

  // Active filters check
  const hasAnyFilter =
    filters.searchQuery !== '' ||
    filters.city !== '' ||
    filters.district !== '' ||
    filters.neighborhood !== '' ||
    filters.street !== '' ||
    filters.selectedCuisine !== 'all' ||
    filters.minRating !== null ||
    filters.priceSegment !== null;

  return (
    <View style={styles.container}>
      <Header onReset={handleResetAllFilters} />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Sticky Filters & Search */}
        <FilterBar
          searchQuery={filters.searchQuery}
          onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
          selectedCuisine={filters.selectedCuisine}
          onSelectCuisine={(c) => setFilters((prev) => ({ ...prev, selectedCuisine: c }))}
          city={filters.city}
          district={filters.district}
          neighborhood={filters.neighborhood}
          street={filters.street}
          onOpenLocationModal={() => setLocationModalVisible(true)}
          onClearLocation={handleResetLocation}
          minRating={filters.minRating}
          onToggleMinRating={(r) => setFilters((prev) => ({ ...prev, minRating: r }))}
          priceSegment={filters.priceSegment}
          onTogglePriceSegment={(p) => setFilters((prev) => ({ ...prev, priceSegment: p }))}
          totalResultsCount={filteredRestaurants.length}
        />

        {/* Main Content Area */}
        <View style={styles.mainWrapper}>
          {/* Active Filter Chips */}
          {hasAnyFilter && (
            <View style={styles.activeFiltersBar}>
              <Text style={styles.activeFiltersTitle}>Aktif Filtreler:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activeFiltersScroll}>
                {filters.selectedCuisine !== 'all' && (
                  <View style={styles.activeFilterChip}>
                    <Text style={styles.activeFilterText}>Kategori: {filters.selectedCuisine}</Text>
                    <TouchableOpacity onPress={() => setFilters((prev) => ({ ...prev, selectedCuisine: 'all' }))}>
                      <Ionicons name="close" size={14} color={COLORS.primaryDark} />
                    </TouchableOpacity>
                  </View>
                )}

                {filters.city !== '' && (
                  <View style={styles.activeFilterChip}>
                    <Text style={styles.activeFilterText}>
                      Konum: {[filters.city, filters.district, filters.neighborhood, filters.street].filter(Boolean).join(' / ')}
                    </Text>
                    <TouchableOpacity onPress={handleResetLocation}>
                      <Ionicons name="close" size={14} color={COLORS.primaryDark} />
                    </TouchableOpacity>
                  </View>
                )}

                {filters.searchQuery !== '' && (
                  <View style={styles.activeFilterChip}>
                    <Text style={styles.activeFilterText}>Arama: "{filters.searchQuery}"</Text>
                    <TouchableOpacity onPress={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}>
                      <Ionicons name="close" size={14} color={COLORS.primaryDark} />
                    </TouchableOpacity>
                  </View>
                )}

                {filters.minRating !== null && (
                  <View style={styles.activeFilterChip}>
                    <Text style={styles.activeFilterText}>★ {filters.minRating}+</Text>
                    <TouchableOpacity onPress={() => setFilters((prev) => ({ ...prev, minRating: null }))}>
                      <Ionicons name="close" size={14} color={COLORS.primaryDark} />
                    </TouchableOpacity>
                  </View>
                )}

                {filters.priceSegment !== null && (
                  <View style={styles.activeFilterChip}>
                    <Text style={styles.activeFilterText}>Fiyat: {filters.priceSegment}</Text>
                    <TouchableOpacity onPress={() => setFilters((prev) => ({ ...prev, priceSegment: null }))}>
                      <Ionicons name="close" size={14} color={COLORS.primaryDark} />
                    </TouchableOpacity>
                  </View>
                )}

                <TouchableOpacity style={styles.clearAllBtn} onPress={handleResetAllFilters}>
                  <Text style={styles.clearAllText}>Tümünü Sıfırla</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* Restaurant Cards Grid / List */}
          {filteredRestaurants.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="restaurant-outline" size={48} color={COLORS.primary} />
              </View>
              <Text style={styles.emptyTitle}>Seçilen Kriterlere Uygun Restoran Bulunamadı</Text>
              <Text style={styles.emptySubtitle}>
                Arama kriterlerinizi veya konum filtrenizi genişleterek daha fazla restorana ulaşabilirsiniz.
              </Text>
              <TouchableOpacity style={styles.resetBtn} onPress={handleResetAllFilters}>
                <Ionicons name="refresh" size={16} color="#FFF" style={{ marginRight: 6 }} />
                <Text style={styles.resetBtnText}>Filtreleri Temizle</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.grid, numColumns > 1 && styles.gridMultiCol]}>
              {filteredRestaurants.map((restaurant) => (
                <View
                  key={restaurant.id}
                  style={[
                    styles.gridItem,
                    numColumns === 2 && styles.gridItemTwoCol,
                    numColumns === 3 && styles.gridItemThreeCol,
                  ]}
                >
                  <RestaurantCard
                    restaurant={restaurant}
                    onPress={() => onSelectRestaurant(restaurant)}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Location Picker Modal */}
      <LocationPickerModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        selectedCity={filters.city}
        selectedDistrict={filters.district}
        selectedNeighborhood={filters.neighborhood}
        selectedStreet={filters.street}
        onApplyLocation={handleApplyLocation}
        onResetLocation={handleResetLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
  },
  mainWrapper: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    padding: 16,
  },
  activeFiltersBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
    gap: 8,
  },
  activeFiltersTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  activeFiltersScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    gap: 6,
  },
  activeFilterText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  clearAllBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  grid: {
    width: '100%',
  },
  gridMultiCol: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '100%',
  },
  gridItemTwoCol: {
    width: '50%',
    paddingHorizontal: 8,
  },
  gridItemThreeCol: {
    width: '33.333%',
    paddingHorizontal: 8,
  },
  emptyContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginVertical: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 440,
    lineHeight: 19,
    marginBottom: 20,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
