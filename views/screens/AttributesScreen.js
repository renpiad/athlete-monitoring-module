import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomNavBar from "../components/BottomNavBar";
import SwipeableRow from "../components/SwipeableRow";

const AttributesScreen = ({ athlete, onBack }) => {
  // Sample attribute data for demonstration
  const [physicalAttributes, setPhysicalAttributes] = useState([
    { id: "1", name: "Height", value: "6'5", unit: "ft/in" },
    { id: "2", name: "Weight", value: "212", unit: "lbs" },
    { id: "3", name: "Wingspan", value: "6'11", unit: "ft/in" },
    { id: "4", name: "Standing Reach", value: "8'4", unit: "ft/in" },
    { id: "5", name: "Vertical Jump", value: "36", unit: "in" },
  ]);

  const handleEdit = (attribute) => {
    Alert.alert("Edit Attribute", `Edit ${attribute.name}`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Edit",
        onPress: () => console.log("Edit pressed for", attribute.name),
      },
    ]);
  };

  const handleDelete = (attribute) => {
    Alert.alert(
      "Delete Attribute",
      `Are you sure you want to delete ${attribute.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            const updatedAttributes = physicalAttributes.filter(
              (item) => item.id !== attribute.id
            );
            setPhysicalAttributes(updatedAttributes);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Attributes</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar} />
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>
                {athlete?.name || "Player Name"}
              </Text>
              <Text style={styles.playerPosition}>
                {athlete?.position || "Position"}
              </Text>
            </View>
          </View>

          {/* Physical & Performance Measurements */}
          <View style={styles.attributesSection}>
            <Text style={styles.sectionTitle}>
              Physical & Performance Measurements
            </Text>

            {physicalAttributes.map((attribute) => (
              <SwipeableRow
                key={attribute.id}
                onEdit={() => handleEdit(attribute)}
                onDelete={() => handleDelete(attribute)}
              >
                <View style={styles.attributeItem}>
                  <View style={styles.attributeLeft}>
                    <Text style={styles.attributeName}>{attribute.name}</Text>
                    <View style={styles.attributeValueContainer}>
                      <Text style={styles.attributeValue}>
                        {attribute.value}
                      </Text>
                      <Text style={styles.attributeUnit}>{attribute.unit}</Text>
                    </View>
                  </View>
                </View>
              </SwipeableRow>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavBar activeTab="calendar" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F0F0F0",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#DDDDDD",
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  playerPosition: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  attributesSection: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  attributeItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "space-between",
  },
  attributeLeft: {
    flex: 1,
  },
  attributeName: {
    fontSize: 14,
    color: "#333333",
  },
  attributeValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 5,
  },
  attributeValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  attributeUnit: {
    fontSize: 12,
    color: "#999999",
  },
});

export default AttributesScreen;
