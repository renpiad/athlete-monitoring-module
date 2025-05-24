import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import AthleteController from "../../controllers/AthleteController";
import AthleteItem from "../components/AthleteItem";
import SearchBar from "../components/SearchBar";

const AthletesScreen = ({ onAthleteSelect }) => {
  const [athletes, setAthletes] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    // Load initial data
    setAthletes(AthleteController.getAthletes());
  }, []);

  const handleSearch = (text) => {
    setAthletes(AthleteController.searchAthletes(text));
  };

  const handleSort = () => {
    setSortAscending(!sortAscending);
    setAthletes(AthleteController.sortAthletesByName(sortAscending));
  };

  const handleAthletePress = (athlete) => {
    if (onAthleteSelect) {
      onAthleteSelect(athlete);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} onSort={handleSort} />
      <FlatList
        data={athletes}
        renderItem={({ item }) => (
          <AthleteItem athlete={item} onPress={handleAthletePress} />
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

export default AthletesScreen;
