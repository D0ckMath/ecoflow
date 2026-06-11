import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, TextInput, Dimensions, NativeSyntheticEvent,
  NativeScrollEvent, Modal, Alert,
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
  { id: '1', title: 'Espada do God of War', category: 'Papel e papelão', user: 'João Silva', phone: '(11) 91234-5678', location: 'São Paulo, SP', description: 'Fiz essa espada para um cosplay do Kratos na BGS de 2025, estou doando está espada pois ela não tem mais utilidade para mim quem tiver interesse é só entrar em contato' },
  { id: '2', title: 'Caixas de Papelão', category: 'Papel e Papelão', user: 'Maria Souza', phone: '(21) 98765-4321', location: 'Rio de Janeiro, RJ', description: 'Caixas de papelão resistentes, vários tamanhos disponíveis.' },
  { id: '3', title: 'Vidros de Conserva', category: 'Vidro', user: 'Carlos Lima', phone: '(31) 97654-3210', location: 'Belo Horizonte, MG', description: 'Potes de vidro com tampa, ideais para decoração e armazenamento.' },
  { id: '4', title: 'Latas de Alumínio', category: 'Metal', user: 'Ana Costa', phone: '(41) 96543-2109', location: 'Curitiba, PR', description: 'Latas de alumínio amassadas ou inteiras, prontas para reciclagem.' },
  { id: '5', title: 'Paletes de Madeira', category: 'Madeira', user: 'Pedro Alves', phone: '(51) 95432-1098', location: 'Porto Alegre, RS', description: 'Paletes em bom estado, perfeitos para móveis e decoração.' },
];

type Ad = typeof ADS[0];

const AVALIACOES = [
  { id: 1, produto_id: '1', usuario: 'Maria Souza', comentario: 'Muito bom atendimento, recomendo!', data: '10/06/2025' },
  { id: 2, produto_id: '1', usuario: 'Carlos Lima', comentario: 'Boa negociação, mas atrasou um pouco.', data: '11/06/2025' },
  { id: 3, produto_id: '2', usuario: 'João Silva', comentario: 'Produto chegou amassado.', data: '12/06/2025' },
];

const CATEGORIAS = [
  { id: 1, label: 'Plástico' },
  { id: 2, label: 'Madeira' },
  { id: 3, label: 'Metal' },
  { id: 4, label: 'Papel e Papelão' },
  { id: 5, label: 'Vidro' },
];

const TABS = ['Feed', 'Busca', 'Perfil'];

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [activePage, setActivePage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [adNome, setAdNome] = useState('');
  const [adDescricao, setAdDescricao] = useState('');
  const [adTelefone, setAdTelefone] = useState('');
  const [adEmail, setAdEmail] = useState('');
  const [adCategoria, setAdCategoria] = useState<number | null>(null);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  type Comentario = { id: number; usuario: string; texto: string; data: string };
  const [comentarios, setComentarios] = useState<Record<string, Comentario[]>>({});
  const [novoComentario, setNovoComentario] = useState('');  

  function handleEnviarComentario() {
    if (!novoComentario.trim() || !selectedAd) return;
    const novo: Comentario = {
      id: Date.now(),
      usuario: 'Você',
      texto: novoComentario.trim(),
      data: new Date().toLocaleDateString('pt-BR'),
    };
    setComentarios(prev => ({
      ...prev,
      [selectedAd.id]: [...(prev[selectedAd.id] ?? []), novo],
    }));
    setNovoComentario('');
  }

  function handlePublicar() {
    if (!adNome || !adDescricao || !adCategoria) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, descrição e categoria.');
      return;
    }
    Alert.alert('Anúncio publicado!', `"${adNome}" foi anunciado com sucesso.`);
    setModalVisible(false);
    setAdNome(''); setAdDescricao(''); setAdTelefone(''); setAdEmail(''); setAdCategoria(null);
  }

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
              <TouchableOpacity key={ad.id} style={styles.adCard} activeOpacity={0.85} onPress={() => setSelectedAd(ad)}>
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
              </TouchableOpacity>
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
              <TouchableOpacity key={ad.id} style={styles.adCard} activeOpacity={0.85} onPress={() => setSelectedAd(ad)}>
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
              </TouchableOpacity>
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

            <TouchableOpacity style={styles.btnAnunciar} activeOpacity={0.85} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle-outline" size={20} color={Colors.textLight} />
              <Text style={styles.btnAnunciarText}>Anunciar produto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLogout} activeOpacity={0.85}>
              <Ionicons name="log-out-outline" size={18} color={Colors.danger} />
              <Text style={styles.btnLogoutText}>Sair da conta</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      {/* ── MODAL: DETALHE DO ANÚNCIO ── */}
      <Modal visible={!!selectedAd} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setSelectedAd(null)}>
        {selectedAd && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedAd.title}</Text>
              <TouchableOpacity onPress={() => setSelectedAd(null)}>
                <Ionicons name="close" size={26} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {/* Imagem */}
              <View style={styles.detailImage}>
                <Ionicons name="image-outline" size={52} color={Colors.primaryDark} />
              </View>

              {/* Info */}
              <View style={styles.adCategoryBadge}>
                <Text style={styles.adCategoryText}>{selectedAd.category}</Text>
              </View>
              <Text style={[styles.adTitle, { fontSize: 18, marginTop: 8 }]}>{selectedAd.title}</Text>
              <Text style={[styles.adDescription, { marginTop: 6, fontSize: 14, lineHeight: 20 }]}>{selectedAd.description}</Text>
              <View style={[styles.adMeta, { marginTop: 10 }]}>
                <Ionicons name="person-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.adMetaText}>{selectedAd.user}</Text>
                <Ionicons name="location-outline" size={14} color={Colors.textSecondary} style={{ marginLeft: 8 }} />
                <Text style={styles.adMetaText}>{selectedAd.location}</Text>
              </View>
              <View style={[styles.adMeta, { marginTop: 6 }]}>
                <Ionicons name="call-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.adMetaText}>{selectedAd.phone}</Text>
              </View>

              {/* Divisor + Avaliações */}
              <View style={styles.divider} />
              <Text style={styles.reviewsTitle}>Avaliações</Text>
              {(() => {
                const reviews = AVALIACOES.filter(a => a.produto_id === selectedAd.id);
                if (reviews.length === 0)
                  return <Text style={styles.reviewEmpty}>Nenhuma avaliação ainda.</Text>;
                return reviews.map(r => (
                  <View key={r.id} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Ionicons name="person-circle-outline" size={28} color={Colors.primary} />
                      <View style={{ marginLeft: 8 }}>
                        <Text style={styles.reviewUser}>{r.usuario}</Text>
                        <Text style={styles.reviewDate}>{r.data}</Text>
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{r.comentario}</Text>
                  </View>
                ));
              })()}

              {/* Divisor + Comentários */}
              <View style={styles.divider} />
              <Text style={styles.reviewsTitle}>Comentários</Text>
              {(comentarios[selectedAd.id] ?? []).length === 0 && (
                <Text style={styles.reviewEmpty}>Nenhum comentário ainda. Seja o primeiro!</Text>
              )}
              {(comentarios[selectedAd.id] ?? []).map(c => (
                <View key={c.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Ionicons name="person-circle-outline" size={28} color={Colors.primaryLight} />
                    <View style={{ marginLeft: 8 }}>
                      <Text style={styles.reviewUser}>{c.usuario}</Text>
                      <Text style={styles.reviewDate}>{c.data}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{c.texto}</Text>
                </View>
              ))}

              {/* Input novo comentário */}
              <View style={styles.commentInputRow}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Escreva um comentário..."
                  placeholderTextColor={Colors.placeholder}
                  value={novoComentario}
                  onChangeText={setNovoComentario}
                  multiline
                />
                <TouchableOpacity
                  style={[styles.commentSendBtn, !novoComentario.trim() && { opacity: 0.4 }]}
                  onPress={handleEnviarComentario}
                  disabled={!novoComentario.trim()}
                >
                  <Ionicons name="send" size={20} color={Colors.textLight} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>

      {/* ── MODAL: NOVO ANÚNCIO ── */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Novo anúncio</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={26} color={Colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>

            <Text style={styles.label}>Nome do produto *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="pricetag-outline" size={20} color={Colors.placeholder} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Ex: Garrafas PET" placeholderTextColor={Colors.placeholder} value={adNome} onChangeText={setAdNome} />
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>Descrição *</Text>
            <View style={[styles.inputWrapper, { height: 90, alignItems: 'flex-start', paddingVertical: 10 }]}>
              <TextInput
                style={[styles.input, { textAlignVertical: 'top' }]}
                placeholder="Descreva o material, quantidade, condição..."
                placeholderTextColor={Colors.placeholder}
                multiline
                value={adDescricao}
                onChangeText={setAdDescricao}
              />
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>Categoria *</Text>
            <View style={styles.categoriaRow}>
              {CATEGORIAS.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoriaBadge, adCategoria === cat.id && styles.categoriaBadgeActive]}
                  onPress={() => setAdCategoria(cat.id)}
                >
                  <Text style={[styles.categoriaBadgeText, adCategoria === cat.id && { color: Colors.textLight }]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>Telefone</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color={Colors.placeholder} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="(00) 00000-0000" placeholderTextColor={Colors.placeholder} keyboardType="phone-pad" value={adTelefone} onChangeText={setAdTelefone} />
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>E-mail</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={Colors.placeholder} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="contato@email.com" placeholderTextColor={Colors.placeholder} keyboardType="email-address" autoCapitalize="none" value={adEmail} onChangeText={setAdEmail} />
            </View>

            <TouchableOpacity style={styles.btnFoto} activeOpacity={0.8}>
              <Ionicons name="camera-outline" size={22} color={Colors.primary} />
              <Text style={styles.btnFotoText}>Adicionar foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnPrimary, { marginTop: 20 }]} activeOpacity={0.85} onPress={handlePublicar}>
              <Text style={styles.btnPrimaryText}>Publicar anúncio</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  btnAnunciar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primaryLight,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  btnAnunciarText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  modalContent: {
    padding: 20,
    paddingBottom: 40,
  },
  categoriaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  categoriaBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  categoriaBadgeActive: {
    backgroundColor: Colors.primary,
  },
  categoriaBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  btnFoto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  btnFotoText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  detailImage: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 20,
  },
  reviewsTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 12,
  },
  reviewEmpty: {
    fontSize: 14,
    color: Colors.placeholder,
    textAlign: 'center',
    marginTop: 8,
  },
  reviewCard: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  reviewDate: {
    fontSize: 11,
    color: Colors.placeholder,
  },
  reviewComment: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginTop: 12,
  },
  commentInput: {
    flex: 1,
    minHeight: 48,
    maxHeight: 100,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text,
    backgroundColor: Colors.backgroundLight,
    textAlignVertical: 'top',
  },
  commentSendBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
