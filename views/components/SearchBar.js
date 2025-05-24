import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const SearchBar = ({ onSearch, onSort }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
          onChangeText={onSearch}
        />
      </View>
      <TouchableOpacity style={styles.sortButton} onPress={onSort}>
        <Text style={styles.sortIcon}>↑↓</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    top: 10,
    padding: 8,
    marginBottom: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 0,
    paddingHorizontal: 8,
    marginRight: 8,
    height: 32,
  },
  searchIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    height: 32,
    fontSize: 14,
    padding: 0,
    paddingVertical: 0,
  },
  sortButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  sortIcon: {
    fontSize: 14,
  },
});

export default SearchBar;
