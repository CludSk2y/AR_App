import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
// Icons
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  // Shared values for creative staggered entry animations
  const headerAnim = useSharedValue(0);
  const heroAnim = useSharedValue(0);
  const dataCardsAnim = useSharedValue(0);
  const infoCardAnim = useSharedValue(0);
  const buttonAnim = useSharedValue(0);

  // Continuous glowing pulse animation for the snowflake badge
  const pulseAnim = useSharedValue(1);

  // Interactive button touch state
  const pressed = useSharedValue(0);

  useEffect(() => {
    // Dynamic sequence entry timing
    headerAnim.value = withDelay(80, withTiming(1, { duration: 600 }));
    heroAnim.value = withDelay(200, withTiming(1, { duration: 700 }));
    dataCardsAnim.value = withDelay(320, withTiming(1, { duration: 700 }));
    infoCardAnim.value = withDelay(440, withTiming(1, { duration: 700 }));
    buttonAnim.value = withDelay(
      560,
      withSpring(1, { damping: 10, stiffness: 100 }),
    );

    // Soft infinite breathing pulse on the core accent
    pulseAnim.value = withRepeat(
      withTiming(1.15, { duration: 1000 }),
      -1,
      true,
    );
  }, []);

  // Reusable dynamic entry generator
  const createAnimationStyle = (animValue, distance = 30) => {
    return useAnimatedStyle(() => ({
      opacity: animValue.value,
      transform: [
        {
          translateY: interpolate(
            animValue.value,
            [0, 1],
            [distance, 0],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            animValue.value,
            [0, 1],
            [0.95, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }));
  };

  const headerStyle = createAnimationStyle(headerAnim, 20);
  const heroStyle = createAnimationStyle(heroAnim, 35);
  const dataCardsStyle = createAnimationStyle(dataCardsAnim, 40);
  const infoCardStyle = createAnimationStyle(infoCardAnim, 45);
  const buttonStyle = createAnimationStyle(buttonAnim, 55);

  // Pulse effect style
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  // Smooth tactile feedback on button press
  const buttonPressStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      pressed.value,
      [0, 1],
      [1, 0.95],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      pressed.value,
      [0, 1],
      [1, 0.8],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Creative Top Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <View style={styles.headerLeft}>
            <Animated.View style={[styles.brandIconWrapper, pulseStyle]}>
              <MaterialCommunityIcons
                name="snowflake"
                size={22}
                color="#FFFFFF"
              />
            </Animated.View>
            <View>
              <Text style={styles.headerTitle}>AR FROID</Text>
              <Text style={styles.headerSubtitle}>Smart Ecosystem</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
            <Ionicons name="options-outline" size={22} color="#005082" />
          </TouchableOpacity>
        </Animated.View>

        {/* Dynamic Hero Showcase Card */}
        <Animated.View style={[styles.card, styles.heroCard, heroStyle]}>
          <Image
            source={require("../../assets/home.jpg")}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroGradientOverlay} />

          <View style={styles.floatingBadge}>
            <View style={styles.dotIndicator} />
            <Text style={styles.badgeText}>Live Systems</Text>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTextTitle}>Performance Pure</Text>
            <Text style={styles.heroTextSubtitle}>
              Solutions de climatisation haute précision pour environnements
              exigeants.
            </Text>
          </View>
        </Animated.View>

        {/* Modern Interactive Data Cards Row */}
        <Animated.View style={[styles.dataCardsRow, dataCardsStyle]}>
          {/* Temperature Widget */}
          <TouchableOpacity
            style={[styles.card, styles.dataCard]}
            activeOpacity={0.85}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="thermometer-lines"
                size={22}
                color="#005082"
              />
            </View>
            <Text style={styles.label}>TEMPÉRATURE</Text>
            <View style={styles.valueRow}>
              <Text style={styles.tempValue}>21</Text>
              <Text style={styles.unitSymbol}>°C</Text>
            </View>
          </TouchableOpacity>

          {/* Eco-Mode Widget */}
          <TouchableOpacity
            style={[styles.card, styles.dataCard]}
            activeOpacity={0.85}
          >
            <View style={[styles.iconCircle, styles.ecoCircleBg]}>
              <Ionicons name="leaf-outline" size={20} color="#059669" />
            </View>
            <Text style={styles.label}>ECO-MODE</Text>
            <Text style={styles.ecoValue}>Optimisé</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Feature Highlight Card */}
        <Animated.View style={[styles.card, styles.infoCard, infoCardStyle]}>
          <View style={styles.blueBar} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>L'Ingénierie du Confort</Text>
            <Text style={styles.infoSubtitle}>
              AR FROID redéfinit les standards du confort thermique avec des
              systèmes industriels intelligents et durables.
            </Text>
          </View>
        </Animated.View>

        {/* Creative Action CTA Button */}
        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={1}
            onPressIn={() => (pressed.value = 1)}
            onPressOut={() => (pressed.value = 0)}
            onPress={() => navigation.navigate("Catalog")}
          >
            <Animated.View style={[styles.buttonInner, buttonPressStyle]}>
              <Text style={styles.buttonText}>Explorer le Catalogue</Text>
              <View style={styles.arrowIconCircle}>
                <Ionicons name="arrow-forward" size={16} color="#005082" />
              </View>
            </Animated.View>
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
    padding: 18,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#005082",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#005082",
    marginLeft: 10,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: "600",
    color: "#0284C7",
    marginLeft: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  heroCard: {
    height: 330,
    padding: 0,
    overflow: "hidden",
    marginBottom: 18,
    justifyContent: "flex-end",
  },
  heroImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 40, 70, 0.25)",
  },
  floatingBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38BDF8",
    marginRight: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  heroTextContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    margin: 14,
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  heroTextTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 4,
  },
  heroTextSubtitle: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
  },
  dataCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  dataCard: {
    width: "48%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 22,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  ecoCircleBg: {
    backgroundColor: "#ECFDF5",
  },
  label: {
    fontSize: 10,
    color: "#64748B",
    marginBottom: 4,
    fontWeight: "800",
    letterSpacing: 1,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tempValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#005082",
    lineHeight: 32,
  },
  unitSymbol: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0284C7",
    marginLeft: 2,
    marginTop: 2,
  },
  ecoValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#005082",
    lineHeight: 26,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingVertical: 22,
  },
  blueBar: {
    width: 4,
    height: "100%",
    backgroundColor: "#005082",
    borderRadius: 2,
    marginRight: 14,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  infoSubtitle: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
  footerContainer: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 28, // Raised safely above system navigation bar
    backgroundColor: "#EBF8FF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  button: {
    width: "100%",
    backgroundColor: "#005082",
    borderRadius: 30,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonInner: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  arrowIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});