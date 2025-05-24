import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AthleteItem = ({ athlete, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(athlete)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.playerLabel}>Player name:</Text>
        <Text style={styles.playerName}>{athlete.name}</Text>
        <Text style={styles.playerPosition}>{athlete.position}</Text>
      </View>
      <TouchableOpacity style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#DDDDDD",
  },
  itemInfo: {
    flex: 1,
  },
  playerLabel: {
    fontSize: 12,
    color: "#999999",
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playerPosition: {
    fontSize: 14,
    color: "#666666",
  },
  arrowContainer: {},
  arrowIcon: {
    fontSize: 20,
    color: "#666666",
  },
});

export default AthleteItem;
