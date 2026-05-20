import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, TextInput, Dimensions, NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { label: 'Plástico', icon: 'cube-outline' as const },
  { label: 'Papel e Papelão', icon: 'document-outline' as const },
  { label: 'Vidro', icon: 'wine-outline' as const },
  { label: 'Metal', icon: 'construct-outline' as const },
  { label: 'Madeira', icon: 'leaf-outline' as const },
];

const ADS = [
  { id: '1', title: 'Garrafas PET', category: 'Plástico', user: 'João Silva', location: 'São Paulo, SP', description: 'Garrafas PET limpas, diversas capacidades. Ótimas para artesanato.' },
  { id: '2', title: 'Caixas de Papelão', category: 'Papel e Papelão', user: 'Maria Souza', location: 'Rio de Janeiro, RJ', description: 'Caixas de papelão resistentes, vários tamanhos disponíveis.' },
  { id: '3', title: 'Vidros de Conserva', category: 'Vidro', user: 'Carlos Lima', location: 'Belo Horizonte, MG', description: 'Potes de vidro com tampa, ideais para decoração e armazenamento.' },
  { id: '4', title: 'Latas de Alumínio', category: 'Metal', user: 'Ana Costa', location: 'Curitiba, PR', description: 'Latas de alumínio amassadas ou inteiras, prontas para reciclagem.' },
  { id: '5', title: 'Paletes de Madeira', category: 'Madeira', user: 'Pedro Alves', location: 'Porto Alegre, RS', description: 'Paletes em bom estado, perfeitos para móveis e decoração.' },
];

const TABS = ['Feed', 'Busca', 'Perfil'];

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [activePage, setActivePage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function goToPage(index: number) {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setActivePage(index);
  }

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    setActivePage(page);
  }

  const filteredAds = ADS.filter(ad => {
    const matchSearch = ad.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory ? ad.category === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab} style={styles.tabItem} onPress={() => goToPage(i)}>
            <Text style={[styles.tabText, activePage === i && styles.tabTextActive]}>{tab}</Text>
            {activePage === i && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEventThrottle={16}
      >
        {/* ── PÁGINA 1: FEED ── */}
        <View style={styles.page}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedContent}>
            <Text style={styles.pageTitle}>Anúncios recentes</Text>
            {ADS.map(ad => (
              <View key={ad.id} style={styles.adCard}>
                <View style={styles.adImagePlaceholder}>
                  <Ionicons name="image-outline" size={36} color={Colors.primaryDark} />
                </View>
                <View style={styles.adInfo}>
                  <View style={styles.adCategoryBadge}>
                    <Text style={styles.adCategoryText}>{ad.category}</Text>
                  </View>
                  <Text style={styles.adTitle}>{ad.title}</Text>
                  <Text style={styles.adDescription} numberOfLines={2}>{ad.description}</Text>
                  <View style={styles.adMeta}>
                    <Ionicons name="person-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.adMetaText}>{ad.user}</Text>
                    <Ionicons name="location-outline" size={13} color={Colors.textSecondary} style={{ marginLeft: 8 }} />
                    <Text style={styles.adMetaText}>{ad.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── PÁGINA 2: BUSCA ── */}
        <View style={styles.page}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedContent}>
            <Text style={styles.pageTitle}>Buscar materiais</Text>

            {/* Barra de busca */}
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color={Colors.placeholder} />
              <TextInput
                style={styles.searchInput}
                placeholder="O que você procura?"
                placeholderTextColor={Colors.placeholder}
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Ionicons name="close-circle" size={18} color={Colors.placeholder} />
                </TouchableOpacity>
              )}
            </View>

            {/* Categorias */}
            <Text style={styles.sectionLabel}>Categorias</Text>
            <View style={styles.categoriesGrid}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.label}
                  style={[styles.categoryCard, selectedCategory === cat.label && styles.categoryCardActive]}
                  onPress={() => setSelectedCategory(selectedCategory === cat.label ? null : cat.label)}
                >
                  <Ionicons name={cat.icon} size={28} color={selectedCategory === cat.label ? Colors.textLight : Colors.primary} />
                  <Text style={[styles.categoryLabel, selectedCategory === cat.label && styles.categoryLabelActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Resultados */}
            <Text style={styles.sectionLabel}>
              {filteredAds.length} resultado{filteredAds.length !== 1 ? 's' : ''}
            </Text>
            {filteredAds.map(ad => (
              <View key={ad.id} style={styles.adCard}>
                <View style={styles.adImagePlaceholder}>
                  <Ionicons name="image-outline" size={36} color={Colors.primaryDark} />
                </View>
                <View style={styles.adInfo}>
                  <View style={styles.adCategoryBadge}>
                    <Text style={styles.adCategoryText}>{ad.category}</Text>
                  </View>
                  <Text style={styles.adTitle}>{ad.title}</Text>
                  <Text style={styles.adDescription} numberOfLines={2}>{ad.description}</Text>
                  <View style={styles.adMeta}>
                    <Ionicons name="person-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.adMetaText}>{ad.user}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── PÁGINA 3: PERFIL ── */}
        <View style={styles.page}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedContent}>
            <Text style={styles.pageTitle}>Meu perfil</Text>

            {/* Avatar */}
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={52} color={Colors.primaryDark} />
              </View>
              <TouchableOpacity style={styles.avatarEditBtn}>
                <Ionicons name="camera-outline" size={16} color={Colors.textLight} />
              </TouchableOpacity>
              <Text style={styles.avatarHint}>Toque na câmera para alterar a foto</Text>
            </View>

            {/* Campos */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color={Colors.placeholder} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Seu nome" placeholderTextColor={Colors.placeholder} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color={Colors.placeholder} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="(00) 00000-0000" placeholderTextColor={Colors.placeholder} keyboardType="phone-pad" />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>E-mail</Text>
                <Text style={styles.optional}>opcional</Text>
              </View>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={Colors.placeholder} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="seu@email.com" placeholderTextColor={Colors.placeholder} keyboardType="email-address" autoCapitalize="none" />
              </View>
            </View>

            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85}>
              <Text style={styles.btnPrimaryText}>Salvar alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLogout} activeOpacity={0.85}>
              <Ionicons name="log-out-outline" size={18} color={Colors.danger} />
              <Text style={styles.btnLogoutText}>Sair da conta</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.placeholder,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '60%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  page: {
    width,
    flex: 1,
  },
  feedContent: {
    padding: 20,
    gap: 14,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  adCard: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  adImagePlaceholder: {
    width: 90,
    backgroundColor: Colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adInfo: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  adCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  adCategoryText: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '600',
  },
  adTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  adDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  adMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  adMetaText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: (width - 40 - 10) / 2 - 5,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  categoryCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: Colors.textLight,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEditBtn: {
    marginTop: -20,
    marginLeft: 60,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  avatarHint: {
    fontSize: 12,
    color: Colors.placeholder,
    marginTop: 8,
  },
  inputGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  optional: {
    fontSize: 11,
    color: Colors.placeholder,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    backgroundColor: Colors.backgroundLight,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  btnPrimaryText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  btnLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.danger,
    marginTop: 4,
  },
  btnLogoutText: {
    color: Colors.danger,
    fontSize: 15,
    fontWeight: '600',
  },
});
