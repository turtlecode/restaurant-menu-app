import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Cover Image & Badges */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />

        {/* Top Badges */}
        <View style={styles.badgeRow}>
          <View style={styles.cuisineBadge}>
            <Text style={styles.cuisineBadgeText}>{restaurant.cuisine}</Text>
          </View>

          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color="#FFFFFF" style={{ marginRight: 3 }} />
            <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCountText}>({restaurant.reviewCount})</Text>
          </View>
        </View>

        {/* Status indicator */}
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: restaurant.isOpen ? COLORS.success : '#EF4444' }]} />
          <Text style={styles.statusText}>{restaurant.isOpen ? 'Açık' : 'Kapalı'}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <Text style={styles.priceSegment}>{restaurant.priceSegment}</Text>
        </View>

        {/* Address & Neighborhood */}
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={14} color={COLORS.primary} />
          <Text style={styles.addressText} numberOfLines={1}>
            {restaurant.address.district}, {restaurant.address.neighborhood} • {restaurant.address.street}
          </Text>
        </View>

        {/* Cuisine Tags */}
        <View style={styles.tagRow}>
          {restaurant.cuisineTags.slice(0, 3).map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagLabel}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Bar: Prep Time, Min Order, and Menu Button */}
        <View style={styles.bottomBar}>
          <View style={styles.metaGroup}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="bicycle-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.metaText}>Min {restaurant.minOrder} ₺</Text>
            </View>
          </View>

          <View style={styles.viewMenuBtn}>
            <Text style={styles.viewMenuText}>Menü</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: 16,
    ...SHADOWS.md,
    // Web cursor pointer
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  imageWrapper: {
    position: 'relative',
    height: 170,
    width: '100%',
    backgroundColor: '#E5E7EB',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cuisineBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cuisineBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  reviewCountText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#CBD5E1',
    marginLeft: 2,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 5,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    padding: 14,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  priceSegment: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
    marginBottom: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  viewMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  viewMenuText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
