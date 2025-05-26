import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import AddButton from "../components/AddButton";
import GameController from "../../controllers/GameController";

const GameRecordsScreen = ({ athlete, onBack, onGameSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get all games (in a real app, this would be filtered by athlete)
  const games = GameController.getGames();

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleAddGame = () => {
    console.log("Add new game for athlete:", athlete?.name);
    // Logic to add a new game
  };

  const filteredGames = searchQuery
    ? GameController.searchGames(searchQuery)
    : games;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Records</Text>
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

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterIcon}>⇅</Text>
            </TouchableOpacity>
          </View>

          {/* Game List */}
          <View style={styles.gameListContainer}>
            {filteredGames.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={styles.gameItem}
                onPress={() => onGameSelect(game)}
              >
                <Text style={styles.gameName}>{game.name}</Text>
                <View style={styles.gameRightSection}>
                  <Text style={styles.gameDate}>{game.date}</Text>
                  <Text style={styles.arrowIcon}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Add Button */}
        <AddButton onPress={handleAddGame} />
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
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#999",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    padding: 0,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  filterIcon: {
    fontSize: 18,
    color: "#333",
  },
  gameListContainer: {
    marginTop: 5,
  },
  gameItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gameName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  gameRightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  gameDate: {
    fontSize: 14,
    color: "#999",
    marginRight: 10,
  },
  arrowIcon: {
    fontSize: 18,
    color: "#666666",
  },
});

export default GameRecordsScreen;
