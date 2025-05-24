import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
// hello negro
const AthleteDetailScreen = ({ athlete, onBack, onCategorySelect }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Athlete Menu</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <Text style={styles.playerName}>
            {athlete?.name || "Player Name"}
          </Text>
        </View>

        {/* Category Options */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => onCategorySelect("Attributes")}
          >
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>Attributes</Text>
              <Text style={styles.categoryDescription}>Description</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => onCategorySelect("Injury Records")}
          >
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>Injury Records</Text>
              <Text style={styles.categoryDescription}>Description</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => onCategorySelect("Game Records")}
          >
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>Game Records</Text>
              <Text style={styles.categoryDescription}>Description</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar activeTab="calendar" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingBottom: 60, // Add space for bottom nav
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 15, // Reduced from 50 to 15
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  placeholder: {
    width: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20, // Reduced from 25 to 20
    backgroundColor: "#F0F0F0",
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 70, // Reduced size
    height: 70, // Reduced size
    borderRadius: 35,
    backgroundColor: "#DDDDDD",
  },
  playerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#003366", // Blue color as shown in image
  },
  categoryContainer: {
    paddingHorizontal: 0,
    marginTop: 0,
  },
  categoryItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryDescription: {
    fontSize: 12,
    color: "#999999",
  },
  arrowIcon: {
    fontSize: 18,
    color: "#666666",
  },
});

export default AthleteDetailScreen;
