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
import { COLORS } from '../theme/colors';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onPress?: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.75 : 1}
    >
      <View style={styles.contentCol}>
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <View style={styles.tagRow}>
            {item.tags.map((tag, idx) => (
              <View key={idx} style={styles.tagBadge}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Dish Name */}
        <Text style={styles.dishName}>{item.name}</Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Ingredients preview if available */}
        {item.ingredients && item.ingredients.length > 0 && (
          <View style={styles.ingredientsRow}>
            <Ionicons name="nutrition-outline" size={12} color={COLORS.textMuted} />
            <Text style={styles.ingredientsText} numberOfLines={1}>
              {item.ingredients.join(', ')}
            </Text>
          </View>
        )}

        {/* Price & Calories */}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{item.price} ₺</Text>
          {item.calories && (
            <Text style={styles.calories}>{item.calories} kcal</Text>
          )}
        </View>
      </View>

      {/* Dish Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  contentCol: {
    flex: 1,
    paddingRight: 14,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  tagBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  dishName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
    marginBottom: 6,
  },
  ingredientsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ingredientsText: {
    fontSize: 11,
    color: COLORS.textMuted,
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  calories: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
