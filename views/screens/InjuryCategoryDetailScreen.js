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

const InjuryCategoryDetailScreen = ({ athlete, categoryName, onBack }) => {
  const [injuryRecords, setInjuryRecords] = useState([]);

  useEffect(() => {
    // Fetch injury records for this athlete and category
    if (athlete && categoryName) {
      const records = InjuryController.getInjuryRecordsByCategory(
        athlete.id,
        categoryName
      );
      setInjuryRecords(records);
    }
  }, [athlete, categoryName]);

  const handleAddInjuryRecord = () => {
    console.log(
      "Add new injury record for athlete:",
      athlete?.name,
      "category:",
      categoryName
    );
    // Logic to add a new injury record
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in-recovery":
        return "#FF9500"; // Orange
      case "fully recovered":
        return "#4CD964"; // Green
      case "critical":
        return "#FF3B30"; // Red
      default:
        return "#8E8E93"; // Gray
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
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

          {/* Injury Records */}
          <View style={styles.recordsContainer}>
            {injuryRecords.length > 0 ? (
              injuryRecords.map((record) => (
                <View key={record.id} style={styles.recordCard}>
                  <View style={styles.recordHeader}>
                    <Text style={styles.recordDate}>{record.date}</Text>
                    <View
                      style={[
                        styles.statusTag,
                        { backgroundColor: getStatusColor(record.status) },
                      ]}
                    >
                      <Text style={styles.statusText}>{record.status}</Text>
                    </View>
                  </View>

                  <View style={styles.recordInfoRow}>
                    <Text style={styles.infoLabel}>Location</Text>
                    <Text style={styles.infoValue}>{record.location}</Text>
                  </View>

                  <View style={styles.recordInfoRow}>
                    <Text style={styles.infoLabel}>Severity</Text>
                    <Text style={styles.infoValue}>{record.severity}</Text>
                  </View>

                  <View style={styles.recordInfoRow}>
                    <Text style={styles.infoLabel}>Duration</Text>
                    <Text style={styles.infoValue}>{record.duration}</Text>
                  </View>

                  <View style={styles.detailsSection}>
                    <Text style={styles.infoLabel}>Details</Text>
                    <Text style={styles.detailsText}>{record.details}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No injury records found for this category.
                </Text>
                <Text style={styles.emptyStateSubText}>
                  Add a new record using the + button below.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Add Button */}
        <AddButton onPress={handleAddInjuryRecord} />
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar activeTab="calendar" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
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
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
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
  recordsContainer: {
    padding: 10,
  },
  recordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  recordDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
  },
  recordInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "400",
  },
  detailsSection: {
    marginTop: 10,
  },
  detailsText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    lineHeight: 20,
  },
  emptyState: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});

export default InjuryCategoryDetailScreen;
