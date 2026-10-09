import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";

export default function PdfViewerScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const pdfUrl = "https://files.catbox.moe/b5gbb3.pdf";
  // The Google Docs Viewer URL wrapper
  const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

  // Handle sharing the PDF file
  const handleShare = async () => {
    try {
      setSharing(true);
      const filename = "AR_Froid_Catalogue.pdf";
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      const downloadResult = await FileSystem.downloadAsync(pdfUrl, fileUri);

      if (downloadResult.status === 200) {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadResult.uri, {
            mimeType: "application/pdf",
            dialogTitle: "Partager le Catalogue",
            UTI: "com.adobe.pdf",
          });
        } else {
          Alert.alert("Information", "Le partage n'est pas disponible.");
        }
      } else {
        Alert.alert("Erreur", "Impossible de préparer le fichier.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur est survenue.");
    } finally {
      setSharing(false);
    }
  };

  // Handle downloading the PDF file
  const handleDownload = async () => {
    try {
      setDownloading(true);
      await WebBrowser.openBrowserAsync(pdfUrl);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de lancer le téléchargement.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#005082" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>CATALOGUE PDF</Text>
        <View style={styles.spacer} />
      </View>

      {/* Viewer container styled as a Card enclosing the PDF */}
      <View style={styles.viewerContainer}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#005082" />
            <Text style={styles.loadingText}>Chargement du catalogue...</Text>
          </View>
        )}
        {/* WebView displaying the PDF inside the card */}
        <WebView
          source={{ uri: googleViewerUrl }}
          style={styles.webView}
          onLoadEnd={() => setLoading(false)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
        />
      </View>

      {/* Footer container holding the original styled buttons */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          activeOpacity={0.8}
          disabled={sharing}
        >
          {sharing ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <View style={styles.buttonContent}>
              <Ionicons
                name="share-social-outline"
                size={18}
                color="#FFFFFF"
                style={styles.iconStyle}
              />
              <Text style={styles.buttonText}>Partager le Catalogue</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownload}
          activeOpacity={0.8}
          disabled={downloading}
        >
          {downloading ? (
            <ActivityIndicator size="small" color="#005082" />
          ) : (
            <View style={styles.buttonContent}>
              <Ionicons
                name="download-outline"
                size={18}
                color="#005082"
                style={styles.iconStyle}
              />
              <Text style={styles.downloadButtonText}>Télécharger le PDF</Text>
            </View>
          )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#EBF8FF",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#005082",
    letterSpacing: 1,
  },
  spacer: {
    width: 38,
  },
  viewerContainer: {
    flex: 1,
    marginHorizontal: 12, // Card margins on left and right
    marginBottom: 8,
    marginTop: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 16, // Rounded corners for the PDF card
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  webView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  footerContainer: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    paddingTop: 4,
    gap: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    marginRight: 8,
  },
  shareButton: {
    backgroundColor: "#005082",
    borderRadius: 14,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#005082",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  downloadButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#005082",
    borderRadius: 14,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  downloadButtonText: {
    color: "#005082",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
