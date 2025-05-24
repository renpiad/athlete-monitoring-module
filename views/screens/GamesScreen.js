import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import GameController from "../../controllers/GameController";
import GameItem from "../components/GameItem";
import SearchBar from "../components/SearchBar";

const GamesScreen = ({ onGameSelect }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    // Load initial data
    const allGames = GameController.getGames();
    setGames(allGames);
    setFilteredGames(allGames);
  }, []);

  const handleSearch = (text) => {
    setFilteredGames(GameController.searchGames(text));
  };

  const handleSort = () => {
    setSortAscending(!sortAscending);
    setFilteredGames(GameController.sortGamesByName(sortAscending));
  };

  const handleGamePress = (game) => {
    if (onGameSelect) {
      onGameSelect(game);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} onSort={handleSort} />
      <FlatList
        data={filteredGames}
        renderItem={({ item }) => (
          <GameItem game={item} onPress={() => handleGamePress(item)} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  list: {
    flex: 1,
  },
});

export default GamesScreen;
