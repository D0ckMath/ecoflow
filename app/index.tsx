import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

const reasons = [
  {
    icon: 'leaf-outline' as const,
    title: 'Preserva o meio ambiente',
    description: 'Reciclar diminui a necessidade de extrair recursos naturais, como madeira, minérios e petróleo, conservando florestas, rios e ecossistemas.',
  },
  {
    icon: 'water-outline' as const,
    title: 'Diminui a poluição',
    description: 'A reciclagem reduz resíduos descartados incorretamente, evitando a poluição do solo, da água e do ar.',
  },
  {
    icon: 'flash-outline' as const,
    title: 'Economiza energia',
    description: 'Produzir itens com materiais reciclados consome menos energia. Reciclar alumínio, por exemplo, economiza até 95% de energia.',
  },
  {
    icon: 'people-outline' as const,
    title: 'Gera empregos e renda',
    description: 'A cadeia da reciclagem envolve catadores, cooperativas e indústrias, gerando empregos e promovendo inclusão social.',
  },
  {
    icon: 'globe-outline' as const,
    title: 'Incentiva a consciência ambiental',
    description: 'Reciclar nos torna mais conscientes sobre o impacto dos nossos hábitos, estimulando escolhas mais sustentáveis no dia a dia.',
  },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={52} color={Colors.primary} />
          </View>
          <Text style={styles.appName}>EcoFlow</Text>
          <Text style={styles.tagline}>Materiais artesanais recicláveis{'\n'}perto de você</Text>
        </View>

        {/* Por que reciclar */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>Por que reciclar?</Text>
          </View>

          {reasons.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardIcon}>
                <Ionicons name={item.icon} size={24} color={Colors.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Botões */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/register')} activeOpacity={0.85}>
            <Text style={styles.btnPrimaryText}>Criar conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => router.push('/login')} activeOpacity={0.85}>
            <Text style={styles.btnSecondaryText}>Já tenho uma conta</Text>
          </TouchableOpacity>
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
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    gap: 32,
  },
  hero: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  sectionAccent: {
    width: 4,
    height: 22,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryLight,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  cardDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  buttonsSection: {
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
