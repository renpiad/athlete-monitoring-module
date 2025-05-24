import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";

const QuarterScores = ({ gameInfo }) => {
  const [scores, setScores] = useState({
    team: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      ot: "",
      total: 0,
    },
    opponent: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      ot: "",
      total: 0,
    },
  });

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
    outputRange: [0, 110], // Increased height
  });

  // Update the score for a specific team and quarter
  const updateScore = (team, quarter, value) => {
    // Only allow numbers
    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }

    setScores((prevScores) => {
      const newScores = {
        ...prevScores,
        [team]: {
          ...prevScores[team],
          [quarter]: value,
        },
      };

      // Calculate total
      const total =
        (newScores[team].q1 === "" ? 0 : parseInt(newScores[team].q1)) +
        (newScores[team].q2 === "" ? 0 : parseInt(newScores[team].q2)) +
        (newScores[team].q3 === "" ? 0 : parseInt(newScores[team].q3)) +
        (newScores[team].q4 === "" ? 0 : parseInt(newScores[team].q4)) +
        (newScores[team].ot === "" ? 0 : parseInt(newScores[team].ot));

      newScores[team].total = total;

      return newScores;
    });
  };

  const getQuarterInput = (team, quarter) => {
    return (
      <View style={styles.inputCell}>
        <TextInput
          style={styles.scoreInput}
          keyboardType="numeric"
          value={scores[team][quarter]}
          onChangeText={(text) => updateScore(team, quarter, text)}
          maxLength={3}
        />
      </View>
    );
  };

  // Determine team name based on league/division if available
  const getTeamName = () => {
    if (!gameInfo) return "Our Team";

    const league = gameInfo.league || "";
    const division = gameInfo.division || "";

    if (league && division) {
      return `${division} Team`;
    } else if (league) {
      return `${league} Team`;
    } else {
      return "Our Team";
    }
  };

  // Get summary of scores when collapsed
  const getScoreSummary = () => {
    return `${scores.team.total} - ${scores.opponent.total}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerRow} onPress={toggleExpand}>
        <Text style={styles.headerTitle}>Quarter Scores</Text>
        <View style={styles.headerRight}>
          {!isExpanded && (
            <Text style={styles.scoreSummary}>{getScoreSummary()}</Text>
          )}
          <Text style={styles.expandIcon}>{isExpanded ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.scoresContainer,
          { maxHeight: animatedHeight, overflow: "hidden" },
        ]}
      >
        <View style={styles.tableContainer}>
          {/* Headers */}
          <View style={styles.scoreRow}>
            <View style={styles.teamCell}>
              <Text style={styles.cellLabel}>Team</Text>
            </View>
            <View style={styles.quarterCell}>
              <Text style={styles.cellLabel}>Q1</Text>
            </View>
            <View style={styles.quarterCell}>
              <Text style={styles.cellLabel}>Q2</Text>
            </View>
            <View style={styles.quarterCell}>
              <Text style={styles.cellLabel}>Q3</Text>
            </View>
            <View style={styles.quarterCell}>
              <Text style={styles.cellLabel}>Q4</Text>
            </View>
            <View style={styles.quarterCell}>
              <Text style={styles.cellLabel}>OT</Text>
            </View>
            <View style={styles.quarterCell}>
              <Text style={styles.cellLabel}>T</Text>
            </View>
          </View>

          {/* Team Row */}
          <View style={styles.scoreRow}>
            <View style={styles.teamCell}>
              <Text
                style={styles.teamText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {getTeamName()}
              </Text>
            </View>
            {getQuarterInput("team", "q1")}
            {getQuarterInput("team", "q2")}
            {getQuarterInput("team", "q3")}
            {getQuarterInput("team", "q4")}
            {getQuarterInput("team", "ot")}
            <View style={styles.totalCell}>
              <Text style={styles.totalText}>{scores.team.total}</Text>
            </View>
          </View>

          {/* Opponent Row */}
          <View style={styles.scoreRow}>
            <View style={styles.teamCell}>
              <Text
                style={styles.teamText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {gameInfo.opponent || "Opponent"}
              </Text>
            </View>
            {getQuarterInput("opponent", "q1")}
            {getQuarterInput("opponent", "q2")}
            {getQuarterInput("opponent", "q3")}
            {getQuarterInput("opponent", "q4")}
            {getQuarterInput("opponent", "ot")}
            <View style={styles.totalCell}>
              <Text style={styles.totalText}>{scores.opponent.total}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 5,
    backgroundColor: "#F5F5F5",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  expandIcon: {
    fontSize: 12,
    color: "#666666",
  },
  scoreSummary: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 10,
  },
  scoresContainer: {
    marginTop: 5,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  scoreRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
    height: 36,
  },
  teamCell: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    justifyContent: "center",
  },
  quarterCell: {
    width: 40,
    alignItems: "center",
    paddingVertical: 6,
  },
  cellLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666666",
  },
  teamText: {
    fontSize: 13,
    color: "#333333",
  },
  inputCell: {
    width: 40,
    paddingVertical: 6,
    alignItems: "center",
  },
  scoreInput: {
    width: 32,
    height: 28,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    textAlign: "center",
    fontSize: 14,
    backgroundColor: "#F9F9F9",
    borderRadius: 4,
  },
  totalCell: {
    width: 40,
    paddingVertical: 6,
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default QuarterScores;
