import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const windowWidth = Dimensions.get("window").width;
const buttonSize = Math.min(windowWidth * 0.13, 50); // 13% of screen width, max 50px

const styles = StyleSheet.create({
  addButton: {
    position: "relative",
    alignSelf: "flex-end",
    marginRight: windowWidth * 0.05, // 5% of screen width
    marginBottom: 20,
    width: buttonSize,
    height: buttonSize,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: buttonSize * 0.64, // 64% of button size
    color: "#FFFFFF",
    fontWeight: "bold",
    lineHeight: buttonSize * 0.64,
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export default AddButton;
