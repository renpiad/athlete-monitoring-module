import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import AddButton from "../components/AddButton";
import InjuryController from "../../controllers/InjuryController";

const InjuryRecordsScreen = ({ athlete, onBack, onInjuryCategorySelect }) => {
  const [injuryCategories, setInjuryCategories] = useState([]);

  useEffect(() => {
    // Fetch injury categories for this athlete
    if (athlete) {
      const categories = InjuryController.getInjuryCategories(athlete.id);
      setInjuryCategories(categories);
    }
  }, [athlete]);

  const handleAddInjury = () => {
    console.log("Add new injury for athlete:", athlete?.name);
    // Logic to add a new injury
  };

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

      <View style={styles.mainContent}>
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
        <AddButton onPress={handleAddInjury} />
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
  mainContent: {
    flex: 1,
    paddingBottom: 120, // Increased padding for the higher positioned add button
  },
  content: {
    flex: 1,
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
});

export default InjuryRecordsScreen;
