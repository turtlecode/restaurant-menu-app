import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { LocalDatabaseService } from '../data/dbService';

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCity: string;
  selectedDistrict: string;
  selectedNeighborhood: string;
  selectedStreet: string;
  onApplyLocation: (city: string, district: string, neighborhood: string, street: string) => void;
  onResetLocation: () => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  visible,
  onClose,
  selectedCity,
  selectedDistrict,
  selectedNeighborhood,
  selectedStreet,
  onApplyLocation,
  onResetLocation,
}) => {
  const [city, setCity] = useState(selectedCity);
  const [district, setDistrict] = useState(selectedDistrict);
  const [neighborhood, setNeighborhood] = useState(selectedNeighborhood);
  const [street, setStreet] = useState(selectedStreet);

  // Sync state when opened
  useEffect(() => {
    setCity(selectedCity);
    setDistrict(selectedDistrict);
    setNeighborhood(selectedNeighborhood);
    setStreet(selectedStreet);
  }, [visible, selectedCity, selectedDistrict, selectedNeighborhood, selectedStreet]);

  const cities = LocalDatabaseService.getCities();
  const districts = city ? LocalDatabaseService.getDistricts(city) : [];
  const neighborhoods = city && district ? LocalDatabaseService.getNeighborhoods(city, district) : [];
  const streets = city && district && neighborhood ? LocalDatabaseService.getStreets(city, district, neighborhood) : [];

  const handleCitySelect = (selected: string) => {
    if (city === selected) {
      setCity('');
      setDistrict('');
      setNeighborhood('');
      setStreet('');
    } else {
      setCity(selected);
      setDistrict('');
      setNeighborhood('');
      setStreet('');
    }
  };

  const handleDistrictSelect = (selected: string) => {
    if (district === selected) {
      setDistrict('');
      setNeighborhood('');
      setStreet('');
    } else {
      setDistrict(selected);
      setNeighborhood('');
      setStreet('');
    }
  };

  const handleNeighborhoodSelect = (selected: string) => {
    if (neighborhood === selected) {
      setNeighborhood('');
      setStreet('');
    } else {
      setNeighborhood(selected);
      setStreet('');
    }
  };

  const handleStreetSelect = (selected: string) => {
    if (street === selected) {
      setStreet('');
    } else {
      setStreet(selected);
    }
  };

  const handleApply = () => {
    onApplyLocation(city, district, neighborhood, street);
    onClose();
  };

  const handleClear = () => {
    setCity('');
    setDistrict('');
    setNeighborhood('');
    setStreet('');
    onResetLocation();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.locationIconCircle}>
                <Ionicons name="location" size={20} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.title}>Konum Filtresi</Text>
                <Text style={styles.subtitle}>İl, İlçe, Mahalle ve Sokak seçin</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            {/* Step 1: İl Seçimi */}
            <View style={styles.stepSection}>
              <Text style={styles.stepLabel}>1. İl Seçin {city ? `(${city})` : ''}</Text>
              <View style={styles.chipRow}>
                {cities.map((c) => {
                  const isSelected = city === c;
                  return (
                    <TouchableOpacity
                      key={c}
                      style={[styles.chip, isSelected && styles.activeChip]}
                      onPress={() => handleCitySelect(c)}
                    >
                      <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                        {isSelected ? '✓ ' : ''}{c}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Step 2: İlçe Seçimi */}
            {city !== '' && (
              <View style={styles.stepSection}>
                <Text style={styles.stepLabel}>2. İlçe Seçin {district ? `(${district})` : ''}</Text>
                <View style={styles.chipRow}>
                  {districts.map((d) => {
                    const isSelected = district === d;
                    return (
                      <TouchableOpacity
                        key={d}
                        style={[styles.chip, isSelected && styles.activeChip]}
                        onPress={() => handleDistrictSelect(d)}
                      >
                        <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                          {isSelected ? '✓ ' : ''}{d}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Step 3: Mahalle Seçimi */}
            {district !== '' && (
              <View style={styles.stepSection}>
                <Text style={styles.stepLabel}>3. Mahalle Seçin {neighborhood ? `(${neighborhood})` : ''}</Text>
                <View style={styles.chipRow}>
                  {neighborhoods.map((n) => {
                    const isSelected = neighborhood === n;
                    return (
                      <TouchableOpacity
                        key={n}
                        style={[styles.chip, isSelected && styles.activeChip]}
                        onPress={() => handleNeighborhoodSelect(n)}
                      >
                        <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                          {isSelected ? '✓ ' : ''}{n}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Step 4: Sokak Seçimi */}
            {neighborhood !== '' && streets.length > 0 && (
              <View style={styles.stepSection}>
                <Text style={styles.stepLabel}>4. Sokak / Cadde Seçin {street ? `(${street})` : ''}</Text>
                <View style={styles.chipRow}>
                  {streets.map((s) => {
                    const isSelected = street === s;
                    return (
                      <TouchableOpacity
                        key={s}
                        style={[styles.chip, isSelected && styles.activeChip]}
                        onPress={() => handleStreetSelect(s)}
                      >
                        <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                          {isSelected ? '✓ ' : ''}{s}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Summary preview */}
            {(city || district || neighborhood || street) && (
              <View style={styles.selectionSummary}>
                <Text style={styles.summaryTitle}>Seçili Adres Filtresi:</Text>
                <Text style={styles.summaryText}>
                  📍 {[city, district, neighborhood, street].filter(Boolean).join(' › ')}
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
              <Text style={styles.clearBtnText}>Tümünü Temizle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
              <Text style={styles.applyBtnText}>Filtreyi Uygula</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    width: '100%',
    maxWidth: 540,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  closeBtn: {
    padding: 6,
  },
  scrollBody: {
    padding: 20,
  },
  stepSection: {
    marginBottom: 20,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  selectionSummary: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: 2,
  },
  summaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: '#FAFAFA',
    gap: 12,
  },
  clearBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  applyBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
