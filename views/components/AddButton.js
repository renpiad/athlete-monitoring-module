import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddButton = ({ onPress, style }) => {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");

  // Calculate bottom position based on safe area
  const bottomPosition =
    Platform.OS === "ios" ? Math.max(insets.bottom, 20) + 40 : 100;

  return (
    <TouchableOpacity
      style={[styles.addButton, { bottom: bottomPosition }, style]}
      onPress={onPress}
    >
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 20,
    width: 55,
    height: 55,
    backgroundColor: "red",
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 30,
  },
});

export default AddButton;
