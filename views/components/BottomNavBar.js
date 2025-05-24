import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomNavBar = ({ activeTab = "home" }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 10) }]}
    >
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Text style={styles.navIcon}>📅</Text>
            {activeTab === "calendar" && (
              <View style={styles.activeIndicator} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Text style={styles.navIcon}>🎮</Text>
            {activeTab === "games" && <View style={styles.activeIndicator} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    zIndex: 999,
  },
  bottomNav: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#FFFFFF",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navIconContainer: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 22,
  },
  activeIndicator: {
    height: 3,
    width: 20,
    backgroundColor: "red",
    marginTop: 3,
  },
});

export default BottomNavBar;
