import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddButton = ({ onPress }) => {
  const insets = useSafeAreaInsets();

  // Adjust bottom position based on platform and safe area
  const bottomPosition =
    Platform.OS === "ios"
      ? Math.max(insets.bottom, 20) + 60 // For iOS
      : 70; // For Android

  return (
    <TouchableOpacity
      style={[styles.addButton, { bottom: bottomPosition }]}
      onPress={onPress}
    >
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 30,
    top: 650,
    width: 48,
    height: 48,
    backgroundColor: "red",
    borderRadius: 6,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 28,
  },
});

export default AddButton;
