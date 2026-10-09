import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Get screen width for responsive sizing
const { width } = Dimensions.get("window");

export default function SplashScreen() {
  // Animation values for logo scaling and text appearance
  const logoScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Run animations sequentially for a smooth entrance effect
    Animated.sequence([
      // 1. Logo zoom-in with a spring/bounce effect
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 15,
        friction: 4,
        useNativeDriver: true,
      }),
      // 2. Text fade-in and slide-up after the logo appears
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [logoScale, textOpacity, textTranslateY]);

  return (
    // Background gradient matching the Figma design theme
    <LinearGradient
      colors={["#F8FCFF", "#D6EEFE", "#A7DBFF"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* Animated logo container with spring scale */}
      <Animated.View style={{ transform: [{ scale: logoScale }] }}>
        <Animated.Image
          source={require("../../assets/logo (3).png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Animated text container for titles */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        <Text style={styles.title}>FROID & CLIMATISATION</Text>
        <Text style={styles.subtitle}>VOTRE EXPERT EN CONFORT THERMIQUE</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Logo image dimensions and margins
  logo: {
    width: width * 0.6,
    height: 180,
    marginBottom: 10,
  },
  // Wrapper for text content
  textContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  // Main title styling
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#005B9F",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  // Subtitle styling
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#546E7A",
    letterSpacing: 0.8,
  },
});
