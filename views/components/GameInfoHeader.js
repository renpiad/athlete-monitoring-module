import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

const GameInfoHeader = ({ gameInfo }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [animation] = useState(new Animated.Value(1));

  // Toggle the expanded state
  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;

    Animated.timing(animation, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  // Calculate the height for animation
  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Reduced height
  });

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get a summary for collapsed state
  const getHeaderSummary = () => {
    return `${gameInfo.league} - ${gameInfo.opponent}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleRow} onPress={toggleExpand}>
        <Text style={styles.gameTitle} numberOfLines={1} ellipsizeMode="tail">
          {gameInfo.league} - {gameInfo.season}
        </Text>
        <View style={styles.titleRight}>
          {!isExpanded && (
            <Text
              style={styles.summaryText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              vs {gameInfo.opponent}
            </Text>
          )}
          <Text style={styles.expandIcon}>{isExpanded ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.detailsContainer,
          { maxHeight: animatedHeight, overflow: "hidden" },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text
              style={styles.infoValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatDate(gameInfo.gameDate)}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Game:</Text>
            <Text
              style={styles.infoValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {gameInfo.gameNumber}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Venue:</Text>
            <Text
              style={styles.infoValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {gameInfo.venue}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Type:</Text>
            <Text
              style={styles.infoValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {gameInfo.gameType}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Division:</Text>
            <Text
              style={styles.infoValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {gameInfo.division}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Opponent:</Text>
            <Text
              style={styles.infoValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {gameInfo.opponent}
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 2,
    paddingBottom: 4,
    backgroundColor: "#F5F5F5",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  titleRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    flex: 1,
    marginRight: 10,
  },
  summaryText: {
    fontSize: 12,
    color: "#333333",
    marginRight: 8,
  },
  expandIcon: {
    fontSize: 11,
    color: "#666666",
  },
  detailsContainer: {
    marginTop: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  infoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#666666",
    marginRight: 3,
    flexShrink: 0,
  },
  infoValue: {
    fontSize: 11,
    color: "#333333",
    flex: 1,
  },
});

export default GameInfoHeader;
