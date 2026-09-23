import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { CUISINE_CATEGORIES } from '../data/dbService';
import { PriceSegment } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  selectedCuisine: string;
  onSelectCuisine: (cuisineId: string) => void;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  onOpenLocationModal: () => void;
  onClearLocation: () => void;
  minRating: number | null;
  onToggleMinRating: (rating: number | null) => void;
  priceSegment: PriceSegment | null;
  onTogglePriceSegment: (price: PriceSegment | null) => void;
  totalResultsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCuisine,
  onSelectCuisine,
  city,
  district,
  neighborhood,
  street,
  onOpenLocationModal,
  onClearLocation,
  minRating,
  onToggleMinRating,
  priceSegment,
  onTogglePriceSegment,
  totalResultsCount,
}) => {
  const hasActiveLocation = Boolean(city || district || neighborhood || street);
  
  // Format location string for display
  const locationSummary = [city, district, neighborhood, street].filter(Boolean).join(', ') || 'Tüm Konumlar (İl, İlçe, Mahalle, Sokak)';

  return (
    <View style={styles.container}>
      {/* 1. Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={COLORS.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Restoran adı veya lezzet ara... (Örn: Sadık Usta, Trabzon Yağlısı)"
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={onSearchChange}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange('')} style={styles.clearSearchBtn}>
              <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 2. Location Filter Button & Quick Display */}
      <View style={styles.locationRow}>
        <TouchableOpacity
          style={[styles.locationBtn, hasActiveLocation && styles.locationBtnActive]}
          onPress={onOpenLocationModal}
          activeOpacity={0.8}
        >
          <View style={styles.locationBtnContent}>
            <View style={[styles.locationPinCircle, hasActiveLocation && styles.locationPinCircleActive]}>
              <Ionicons
                name="location"
                size={16}
                color={hasActiveLocation ? '#FFF' : COLORS.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.locationTitleSmall}>Teslimat / Arama Konumu</Text>
              <Text
                style={[styles.locationText, hasActiveLocation && styles.locationTextActive]}
                numberOfLines={1}
              >
                {locationSummary}
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-down"
            size={18}
            color={hasActiveLocation ? COLORS.primary : COLORS.textSecondary}
          />
        </TouchableOpacity>

        {hasActiveLocation && (
          <TouchableOpacity
            style={styles.clearLocationBtn}
            onPress={onClearLocation}
          >
            <Ionicons name="close" size={16} color={COLORS.primaryDark} />
            <Text style={styles.clearLocationText}>Temizle</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 3. Cuisine Category Pills (Horizontal Scroll) */}
      <View style={styles.categorySection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CUISINE_CATEGORIES.map((cat) => {
            const isSelected = selectedCuisine === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryPill, isSelected && styles.categoryPillActive]}
                onPress={() => onSelectCuisine(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. Sub-filters & Results counter */}
      <View style={styles.subFilterRow}>
        <View style={styles.pillFiltersGroup}>
          {/* 4.5+ Rating Filter */}
          <TouchableOpacity
            style={[styles.subPill, minRating === 4.5 && styles.subPillActive]}
            onPress={() => onToggleMinRating(minRating === 4.5 ? null : 4.5)}
          >
            <Ionicons
              name="star"
              size={14}
              color={minRating === 4.5 ? '#FFF' : COLORS.rating}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.subPillText, minRating === 4.5 && styles.subPillTextActive]}>
              4.5+ Puan
            </Text>
          </TouchableOpacity>

          {/* Price Segments */}
          {(['₺', '₺₺', '₺₺₺'] as PriceSegment[]).map((price) => {
            const isSelected = priceSegment === price;
            return (
              <TouchableOpacity
                key={price}
                style={[styles.subPill, isSelected && styles.subPillActive]}
                onPress={() => onTogglePriceSegment(isSelected ? null : price)}
              >
                <Text style={[styles.subPillText, isSelected && styles.subPillTextActive]}>
                  {price}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.resultsCount}>
          <Text style={styles.resultsCountBold}>{totalResultsCount}</Text> restoran listeleniyor
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  searchRow: {
    marginBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    height: '100%',
    outlineStyle: 'none' as any, // React Native Web outline reset
  },
  clearSearchBtn: {
    padding: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  locationBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF5F6',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  locationBtnActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryBorder,
  },
  locationBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    gap: 10,
  },
  locationPinCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  locationPinCircleActive: {
    backgroundColor: COLORS.primary,
  },
  locationTitleSmall: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  locationTextActive: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  clearLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  clearLocationText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  categorySection: {
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 15,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    flexWrap: 'wrap',
    gap: 8,
  },
  pillFiltersGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  subPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  subPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  subPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultsCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  resultsCountBold: {
    fontWeight: '700',
    color: COLORS.primary,
  },
});
