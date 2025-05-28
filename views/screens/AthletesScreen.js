import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import AthleteController from "../../controllers/AthleteController";
import AthleteItem from "../components/AthleteItem";
import SearchBar from "../components/SearchBar";
import AddAthleteForm from "../components/AddAthleteForm";
import AddButton from "../components/AddButton";

const AthletesScreen = ({ onAthleteSelect }) => {
  const [athletes, setAthletes] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleAddAthlete = (newAthlete) => {
    const addedAthlete = AthleteController.addAthlete(newAthlete);
    setAthletes(AthleteController.getAthletes());
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
        contentContainerStyle={styles.listContent}
      />
      <AddButton onPress={() => setShowAddForm(true)} />
      <AddAthleteForm
        visible={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddAthlete}
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
  listContent: {
    paddingBottom: 120, // Increased padding to ensure last items are visible above the higher positioned add button
  },
});

export default AthletesScreen;
