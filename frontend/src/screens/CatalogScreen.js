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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
// Icons
import { Ionicons } from "@expo/vector-icons";
// Import axios instance configured in services/api.js
import api from "../services/api";

// Mapping matching short image names to local assets
const localImages = {
  "daikin_sensira.jpg": require("../../assets/Daikin Sensira 12000 BTU.jpg"),
  "carrier_infinity.jpg": require("../../assets/Carrier Infinity Centralized.jpg"),
  "mitsubishi_multi.jpg": require("../../assets/Mitsubishi Electric Multi.jpg"),
  "lg_cassette.jpg": require("../../assets/LG Cassette Commercial 24k.jpg"),
  "samsung_floor.jpg": require("../../assets/Samsung Floor Standing AC.jpg"),
  "smart_hub.jpg": require("../../assets/Daikin Sensira 12000 BTU.jpg"),
  "smart.jpg": require("../../assets/Smart Control Pro.jpg"),
};

export default function CatalogScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withDelay(100, withTiming(1, { duration: 800 }));
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Impossible de charger le catalogue. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [
        {
          translateY: interpolate(
            fadeAnim.value,
            [0, 1],
            [20, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        removeClippedSubviews={false}
      >
        <Animated.View style={[styles.header, animatedStyle]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#005082" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>AR FROID</Text>
        </Animated.View>

        <Animated.View style={[styles.titleSection, animatedStyle]}>
          <Text style={styles.mainTitle}>Product Catalog</Text>
          <Text style={styles.subtitle}>
            Découvrez le sommet de l'ingénierie climatique. Des systèmes CVC
            conçus avec précision pour les espaces modernes.
          </Text>
        </Animated.View>

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#005082" />
            <Text style={styles.loadingText}>Chargement des produits...</Text>
          </View>
        )}

        {error && !loading && (
          <View style={styles.centerContainer}>
            <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchProducts}
            >
              <Text style={styles.retryText}>Réessayer</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading &&
          !error &&
          products.map((item, index) => {
            const imageName = item.image || item.imageUrl;
            const imageSource =
              localImages[imageName] || localImages["daikin_sensira.jpg"];

            return (
              <Animated.View
                key={item.id || index}
                style={[styles.productCard, animatedStyle]}
              >
                {item.badge ? (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                ) : null}

                <View style={styles.imageContainer}>
                  <Image
                    source={imageSource}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription} numberOfLines={3}>
                  {item.description}
                </Text>

                <View style={styles.cardFooterSeparator} />

                <View style={styles.cardFooter}>
                  <Text style={styles.priceText}>{item.price} DH</Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("ProductDetails", {
                        productId: item.id,
                      })
                    }
                  >
                    <Text style={styles.detailsButtonText}>
                      Voir les détails
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            );
          })}

        <Animated.View style={[styles.bottomButtonContainer, animatedStyle]}>
          <TouchableOpacity
            style={styles.downloadButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("PdfViewer")}
          >
            <Text style={styles.downloadButtonText}>
              Télécharger le Catalogue
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
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
    paddingBottom: 120,
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
  titleSection: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
  },
  centerContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  errorText: {
    marginTop: 8,
    fontSize: 13,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: "#005082",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    position: "relative",
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
  imageContainer: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#005082",
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 17,
    marginBottom: 16,
  },
  cardFooterSeparator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
  detailsButton: {
    backgroundColor: "#005082",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomButtonContainer: {
    marginTop: 10,
    width: "100%",
  },
  downloadButton: {
    width: "100%",
    backgroundColor: "#005082",
    borderRadius: 28,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  downloadButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
