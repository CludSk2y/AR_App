import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function SupportScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    if (!name || !phone || !message) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }
    const phoneNumber = "+212666936600";
    const text = `Bonjour, je m'appelle ${name} (${phone}). ${message}`;
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            "Erreur",
            "WhatsApp n'est pas installé sur cet appareil.",
          );
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with "AR FROID" title */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#005082" />
            </TouchableOpacity>
            <Text style={styles.brandTitle}>AR FROID</Text>
          </View>

          {/* 1. TOP CARD: Expert Info (Alaa Jaoucha) */}
          <View style={styles.expertCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="headset" size={54} color="#005082" />
            </View>

            <Text style={styles.expertRole}>LEAD TECHNICAL SPECIALIST</Text>
            <Text style={styles.expertName}>Alaa Jaoucha</Text>
            <Text style={styles.expertSubtitle}>
              Direct Expert Consultation
            </Text>

            <View style={styles.expertSeparator} />

            <Text style={styles.expertDescription}>
              Avec plus de 15 ans d'expérience dans l'ingénierie climatique haut
              de gamme, Alaa est spécialisé dans l'optimisation des systèmes de
              réfrigération industrielle et le confort thermique des résidences
              de luxe.
            </Text>
          </View>

          {/* 2. BOTTOM CARD: Client Form & WhatsApp */}
          <View style={styles.formCard}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre nom"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre numéro"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>Votre message / Demande de devis</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Décrivez votre besoin..."
              placeholderTextColor="#94A3B8"
              multiline={true}
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity
              style={styles.whatsappButton}
              activeOpacity={0.85}
              onPress={handleWhatsApp}
            >
              <Ionicons
                name="logo-whatsapp"
                size={20}
                color="#FFFFFF"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.whatsappButtonText}>
                Envoyer sur WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF8FF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60, // Zedt hna padding kbir chwiya bach l-button tban mzyan f l-asfal fch kaytla3 l-clavier
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#005082",
    marginLeft: 12,
    letterSpacing: 1,
  },
  expertCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2.5,
    borderColor: "#005082",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    marginBottom: 14,
  },
  expertRole: {
    fontSize: 12,
    fontWeight: "900",
    color: "#005082",
    letterSpacing: 1,
    marginBottom: 6,
    textAlign: "center",
  },
  expertName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 4,
    textAlign: "center",
  },
  expertSubtitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#005082",
    marginBottom: 14,
    textAlign: "center",
  },
  expertSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 14,
  },
  expertDescription: {
    fontSize: 12.5,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    color: "#0F172A",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  whatsappButton: {
    flexDirection: "row",
    backgroundColor: "#25D366",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#25D366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  whatsappButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
