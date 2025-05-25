import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";

const InjuryRecordsScreen = ({ athlete, onBack, onInjuryCategorySelect }) => {
  // Sample injury categories
  const injuryCategories = [
    { id: "1", name: "Ankle Injuries", count: "0 Records" },
    { id: "2", name: "Leg Injuries", count: "0 Records" },
    { id: "3", name: "Shoulder Injuries", count: "0 Records" },
    { id: "4", name: "Finger Injuries", count: "0 Records" },
    { id: "5", name: "Achilles Tendon Injuries", count: "0 Records" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Injury Records</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <Text style={styles.playerName}>
            {athlete?.name || "Player Name"}
          </Text>
          <Text style={styles.playerPosition}>
            {athlete?.position || "Position"}
          </Text>
        </View>

        {/* Injury Categories */}
        <View style={styles.categoriesContainer}>
          {injuryCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => onInjuryCategorySelect(category.name)}
            >
              <View style={styles.categoryIcon}>
                {category.name.includes("Ankle") && (
                  <Text style={styles.iconText}>🦶</Text>
                )}
                {category.name.includes("Leg") && (
                  <Text style={styles.iconText}>🦵</Text>
                )}
                {category.name.includes("Shoulder") && (
                  <Text style={styles.iconText}>💪</Text>
                )}
                {category.name.includes("Finger") && (
                  <Text style={styles.iconText}>👋</Text>
                )}
                {category.name.includes("Achilles") && (
                  <Text style={styles.iconText}>🦶</Text>
                )}
              </View>
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count}</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

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
    paddingTop: 15,
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
    paddingVertical: 20,
    backgroundColor: "#F0F0F0",
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#DDDDDD",
  },
  playerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  playerPosition: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  categoriesContainer: {
    marginTop: 10,
  },
  categoryItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  categoryIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryCount: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 18,
    color: "#666666",
    marginLeft: 10,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default InjuryRecordsScreen;
