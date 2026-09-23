import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { Restaurant, MenuItem } from '../types';
import { MenuItemCard } from '../components/MenuItemCard';

interface MenuScreenProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ restaurant, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [menuSearch, setMenuSearch] = useState<string>('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Filter items by category and search
  const filteredMenu = restaurant.menu.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (menuSearch.trim() !== '') {
      const q = menuSearch.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchIngr = item.ingredients?.some((ing) => ing.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchIngr) return false;
    }
    return true;
  });

  return (
    <View style={styles.screenContainer}>
      {/* Sticky Top Navigation Bar */}
      <View style={styles.navBar}>
        <View style={styles.navContent}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            <Text style={styles.backBtnText}>Restoranlara Dön</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, { backgroundColor: restaurant.isOpen ? COLORS.success : '#EF4444' }]} />
            <Text style={styles.statusPillText}>{restaurant.isOpen ? 'Açık' : 'Kapalı'}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          {/* Hero Banner Card */}
          <View style={styles.heroCard}>
            <Image
              source={{ uri: restaurant.coverImage || restaurant.image }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />

            <View style={styles.heroContent}>
              <View style={styles.logoAndBadgeRow}>
                <Image source={{ uri: restaurant.image }} style={styles.restaurantLogo} />
                <View style={styles.cuisineTag}>
                  <Text style={styles.cuisineTagText}>{restaurant.cuisine}</Text>
                </View>
              </View>

              <Text style={styles.restaurantName}>{restaurant.name}</Text>

              {/* Info Badges */}
              <View style={styles.metaRow}>
                <View style={styles.metaBadge}>
                  <Ionicons name="star" size={14} color={COLORS.rating} style={{ marginRight: 3 }} />
                  <Text style={styles.metaBadgeBold}>{restaurant.rating.toFixed(1)}</Text>
                  <Text style={styles.metaBadgeSub}>({restaurant.reviewCount} Değerlendirme)</Text>
                </View>

                <View style={styles.metaBadge}>
                  <Ionicons name="time-outline" size={14} color="#FFF" style={{ marginRight: 3 }} />
                  <Text style={styles.metaBadgeText}>{restaurant.deliveryTime}</Text>
                </View>

                <View style={styles.metaBadge}>
                  <Ionicons name="wallet-outline" size={14} color="#FFF" style={{ marginRight: 3 }} />
                  <Text style={styles.metaBadgeText}>Min {restaurant.minOrder} ₺</Text>
                </View>
              </View>

              {/* Address & Contact Details */}
              <View style={styles.addressBox}>
                <View style={styles.addressLine}>
                  <Ionicons name="location" size={15} color={COLORS.primaryLight} style={{ marginRight: 6 }} />
                  <Text style={styles.addressLineText}>{restaurant.address.fullAddress}</Text>
                </View>
                <View style={styles.contactRow}>
                  <View style={styles.contactItem}>
                    <Ionicons name="call-outline" size={14} color="#FFF" style={{ marginRight: 5 }} />
                    <Text style={styles.contactText}>{restaurant.phone}</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Ionicons name="time-outline" size={14} color="#FFF" style={{ marginRight: 5 }} />
                    <Text style={styles.contactText}>Çalışma Saatleri: {restaurant.workingHours}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Menu Search and Categories Bar */}
          <View style={styles.menuControlSection}>
            {/* Search within menu */}
            <View style={styles.searchBarWrapper}>
              <Ionicons name="search" size={18} color={COLORS.primary} style={{ marginRight: 8 }} />
              <TextInput
                style={styles.menuSearchInput}
                placeholder="Bu restoranın menüsünde yemek veya içecek ara..."
                placeholderTextColor={COLORS.textMuted}
                value={menuSearch}
                onChangeText={setMenuSearch}
              />
              {menuSearch.length > 0 && (
                <TouchableOpacity onPress={() => setMenuSearch('')}>
                  <Ionicons name="close-circle" size={16} color={COLORS.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            {/* Category Filter Horizontal Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryPillsScroll}>
              <TouchableOpacity
                style={[styles.categoryTab, selectedCategory === 'all' && styles.categoryTabActive]}
                onPress={() => setSelectedCategory('all')}
              >
                <Text style={[styles.categoryTabText, selectedCategory === 'all' && styles.categoryTabTextActive]}>
                  Tüm Menü ({restaurant.menu.length})
                </Text>
              </TouchableOpacity>

              {restaurant.menuCategories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = restaurant.menu.filter((m) => m.category === cat).length;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryTab, isSelected && styles.categoryTabActive]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text style={[styles.categoryTabText, isSelected && styles.categoryTabTextActive]}>
                      {cat} {count > 0 ? `(${count})` : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Dish List */}
          <View style={styles.menuItemsList}>
            {filteredMenu.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="fast-food-outline" size={48} color={COLORS.textMuted} />
                <Text style={styles.emptyTitle}>Aradığınız lezzet bulunamadı</Text>
                <Text style={styles.emptySubtitle}>Lütfen arama terimini değiştirin veya kategori seçimini temizleyin.</Text>
                <TouchableOpacity
                  style={styles.resetSearchBtn}
                  onPress={() => {
                    setMenuSearch('');
                    setSelectedCategory('all');
                  }}
                >
                  <Text style={styles.resetSearchBtnText}>Aramayı Temizle</Text>
                </TouchableOpacity>
              </View>
            ) : (
              filteredMenu.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onPress={() => setSelectedDish(item)}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <Modal visible={true} transparent animationType="fade" onRequestClose={() => setSelectedDish(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalImageWrapper}>
                <Image source={{ uri: selectedDish.image }} style={styles.modalImage} resizeMode="cover" />
                <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setSelectedDish(null)}>
                  <Ionicons name="close" size={20} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                {selectedDish.tags && selectedDish.tags.length > 0 && (
                  <View style={styles.modalTagRow}>
                    {selectedDish.tags.map((tag, idx) => (
                      <View key={idx} style={styles.tagBadge}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <Text style={styles.modalDishTitle}>{selectedDish.name}</Text>
                <Text style={styles.modalDishDesc}>{selectedDish.description}</Text>

                {selectedDish.ingredients && selectedDish.ingredients.length > 0 && (
                  <View style={styles.ingredientsSection}>
                    <Text style={styles.ingredientsHeader}>İçindekiler & Malzemeler:</Text>
                    <View style={styles.ingredientsChipsRow}>
                      {selectedDish.ingredients.map((ing, idx) => (
                        <View key={idx} style={styles.ingredientChip}>
                          <Text style={styles.ingredientChipText}>• {ing}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                <View style={styles.modalFooter}>
                  <View>
                    <Text style={styles.modalPriceLabel}>Fiyat</Text>
                    <Text style={styles.modalPriceValue}>{selectedDish.price} ₺</Text>
                  </View>

                  {selectedDish.calories && (
                    <View style={styles.calorieBadge}>
                      <Ionicons name="flame" size={16} color={COLORS.primary} />
                      <Text style={styles.calorieText}>{selectedDish.calories} Kalori</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  navBar: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...SHADOWS.sm,
  },
  navContent: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  contentWrapper: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    padding: 16,
  },
  heroCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    ...SHADOWS.md,
  },
  heroImage: {
    width: '100%',
    height: 240,
    opacity: 0.45,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  logoAndBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  restaurantLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cuisineTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  cuisineTagText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  metaBadgeBold: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  metaBadgeSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    marginLeft: 3,
  },
  metaBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  addressBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 12,
    borderRadius: 12,
  },
  addressLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  addressLineText: {
    color: '#FFFFFF',
    fontSize: 12,
    flex: 1,
    fontWeight: '500',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 14,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
  },
  menuControlSection: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  menuSearchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textPrimary,
    outlineStyle: 'none' as any,
  },
  categoryPillsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
  },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  menuItemsList: {
    marginBottom: 40,
  },
  emptyState: {
    backgroundColor: COLORS.surface,
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  resetSearchBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  resetSearchBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    width: '100%',
    maxWidth: 500,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  modalImageWrapper: {
    position: 'relative',
    height: 220,
    width: '100%',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalBody: {
    padding: 20,
  },
  modalTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  tagBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  modalDishTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  modalDishDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 14,
  },
  ingredientsSection: {
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  ingredientsHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  ingredientsChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  ingredientChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ingredientChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  modalPriceLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  modalPriceValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },
  calorieBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  calorieText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
});
