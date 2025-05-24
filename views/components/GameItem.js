import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GameItem = ({ game, onPress }) => {
  return (
    <TouchableOpacity style={styles.gameItemContainer} onPress={onPress}>
      <Text style={styles.gameName} numberOfLines={1} ellipsizeMode="tail">
        {game.name}
      </Text>
      <View style={styles.gameDetail}>
        <Text style={styles.gameDate} numberOfLines={1} ellipsizeMode="tail">
          {game.date}
        </Text>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gameItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  gameName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  gameDetail: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
  },
  gameDate: {
    marginRight: 10,
    color: "#666666",
    maxWidth: 120,
  },
  arrowIcon: {
    fontSize: 20,
    color: "#666666",
  },
});

export default GameItem;
