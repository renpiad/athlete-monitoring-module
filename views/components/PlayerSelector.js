import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

const PlayerSelector = ({ players, selectedPlayer, onSelectPlayer }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Player</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {players.map((player) => (
          <TouchableOpacity
            key={player.id}
            style={[
              styles.playerCard,
              selectedPlayer?.id === player.id
                ? styles.selectedPlayerCard
                : null,
            ]}
            onPress={() => onSelectPlayer(player)}
          >
            <View style={styles.playerAvatar}>
              {player.image ? (
                <Image source={player.image} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.playerNumber}>{player.number}</Text>
                </View>
              )}
            </View>
            <Text
              style={styles.playerName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {player.name}
            </Text>
            <Text
              style={styles.playerPosition}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {player.position}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContent: {
    paddingRight: 20,
  },
  playerCard: {
    width: 70,
    alignItems: "center",
    marginRight: 15,
    padding: 5,
    borderRadius: 8,
  },
  selectedPlayerCard: {
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
  playerNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  playerName: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    width: "100%",
  },
  playerPosition: {
    fontSize: 10,
    color: "#666666",
    textAlign: "center",
    width: "100%",
  },
});

export default PlayerSelector;
