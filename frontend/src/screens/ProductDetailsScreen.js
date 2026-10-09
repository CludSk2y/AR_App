import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

// Local image mapping to avoid rendering issues
const localImages = {
  "daikin_sensira.jpg": require("../../assets/Daikin Sensira 12000 BTU.jpg"),
  "carrier_infinity.jpg": require("../../assets/Carrier Infinity Centralized.jpg"),
  "mitsubishi_multi.jpg": require("../../assets/Mitsubishi Electric Multi.jpg"),
  "lg_cassette.jpg": require("../../assets/LG Cassette Commercial 24k.jpg"),
  "samsung_floor.jpg": require("../../assets/Samsung Floor Standing AC.jpg"),
  "smart_hub.jpg": require("../../assets/Daikin Sensira 12000 BTU.jpg"),
  "smart.jpg": require("../../assets/Smart Control Pro.jpg"),
};


export default function ProductDetailsScreen({ route, navigation }) {
  // Extract product ID from navigation parameters
  const { productId } = route.params || {};
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // Fetch product details from the API using ID
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Impossible de charger les détails du produit.");
    } finally {
      setLoading(false);
    }
  };

  // Render loading indicator while fetching data
  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#005082" />
        <Text style={styles.loadingText}>Chargement des détails...</Text>
      </SafeAreaView>
    );
  }

  // Render error state if product couldn't be loaded
  if (error || !product) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#EF4444" />
        <Text style={styles.errorText}>{error || "Produit introuvable."}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>Retour au catalogue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Resolve image source dynamically
  const imageName = product.image || product.imageUrl;
  const imageSource =
    localImages[imageName] || localImages["Daikin Sensira 12000 BTU.jpg"];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header with Back Navigation */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#005082" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>DÉTAILS DU PRODUIT</Text>
        </View>

        {/* Product Image Card Container */}
        <View style={styles.imageCard}>
          {product.badge ? (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : null}
          <Image
            source={imageSource}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Information Section */}
        <View style={styles.infoSection}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price} DH</Text>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.productDescription}>
            {product.description ||
              "Aucune description disponible pour ce produit."}
          </Text>

          {/* Technical Specifications Section */}
          <Text style={styles.sectionTitle}>Spécifications Techniques</Text>
          <View style={styles.specsCard}>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={18} color="#005082" />
              <Text style={styles.specText}> Haute efficacité énergétique</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={18} color="#005082" />
              <Text style={styles.specText}>
                {" "}
                Technologie silencieuse avancée
              </Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={18} color="#005082" />
              <Text style={styles.specText}>
                {" "}
                Installation et maintenance garanties
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA Button - Navigates directly to SupportScreen (Raised cleanly above system navigation bar) */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("SupportScreen")}
        >
          <Text style={styles.actionButtonText}>Demander un Devis</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF8FF",
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#EBF8FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
  errorText: {
    marginTop: 10,
    fontSize: 15,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#005082",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 50, // Extended bottom padding to ensure content doesn't hide behind footer
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
    fontSize: 15,
    fontWeight: "900",
    color: "#005082",
    marginLeft: 12,
    letterSpacing: 1,
  },
  imageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
    padding: 16,
  },
  badgeContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#005082",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    zIndex: 2,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  infoSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "900",
    color: "#005082",
    marginBottom: 14,
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
    marginTop: 6,
  },
  productDescription: {
    fontSize: 12.5,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 12,
  },
  specsCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },
  specRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  specText: {
    fontSize: 12.5,
    color: "#334155",
    fontWeight: "600",
    marginLeft: 6,
  },
  footerContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 75, // Raised much higher to clear phone system gesture/navigation bars cleanly
    backgroundColor: "#EBF8FF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  actionButton: {
    width: "100%",
    backgroundColor: "#005082",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});