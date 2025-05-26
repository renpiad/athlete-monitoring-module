import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import AddButton from "../components/AddButton";

const GameReportScreen = ({ athlete, game, onBack }) => {
  // Sample game statistics based on the image
  const gameStats = {
    totalFieldGoal: {
      made: 6,
      attempts: 14,
      percentage: 42.86,
    },
    twoPointsFieldGoal: {
      made: 3,
      attempts: 9,
      percentage: 33.33,
    },
    threePointsFieldGoal: {
      made: 3,
      attempts: 5,
      percentage: 60.0,
    },
    totalPoints: 19,
    assists: 8,
    steals: 0,
    blocks: 3,
    turnovers: 4,
    fouls: 2,
    rebounds: {
      offensive: 1,
      defensive: 6,
      total: 7,
    },
  };

  const handleAddReport = () => {
    console.log(
      "Add new report for athlete:",
      athlete?.name,
      "game:",
      game?.name
    );
    // Logic to add a new report
  };

  // Helper function to render stat row with percentage
  const renderStatRowWithPercentage = (title, made, attempts, percentage) => (
    <View>
      <View style={styles.statHeaderRow}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statPercentage}>{percentage}%</Text>
      </View>
      <View style={styles.statDetailRow}>
        <Text style={styles.statLabel}>Made:</Text>
        <Text style={styles.statValue}>{made}</Text>
      </View>
      <View style={styles.statDetailRow}>
        <Text style={styles.statLabel}>Attempt:</Text>
        <Text style={styles.statValue}>{attempts}</Text>
      </View>
    </View>
  );

  // Helper function to render simple stat row
  const renderStatRow = (title, value) => (
    <View style={styles.simpleStatRow}>
      <Text style={styles.simpleStatTitle}>{title}</Text>
      <Text style={styles.simpleStatValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Report</Text>
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

          {/* Game Title */}
          <View style={styles.gameTitleContainer}>
            <Text style={styles.gameTitle}>
              {game?.name || "Game 1"} Statistics
            </Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            {/* Total Field Goal */}
            <View style={[styles.statSection, styles.totalFieldGoalSection]}>
              {renderStatRowWithPercentage(
                "Total Field Goal",
                gameStats.totalFieldGoal.made,
                gameStats.totalFieldGoal.attempts,
                gameStats.totalFieldGoal.percentage
              )}
            </View>

            {/* 2PTS Field Goal */}
            <View style={[styles.statSection, styles.twoPtsFieldGoalSection]}>
              {renderStatRowWithPercentage(
                "2PTS Field Goal",
                gameStats.twoPointsFieldGoal.made,
                gameStats.twoPointsFieldGoal.attempts,
                gameStats.twoPointsFieldGoal.percentage
              )}
            </View>

            {/* 3PTS Field Goal */}
            <View style={[styles.statSection, styles.threePtsFieldGoalSection]}>
              {renderStatRowWithPercentage(
                "3PTS Field Goal",
                gameStats.threePointsFieldGoal.made,
                gameStats.threePointsFieldGoal.attempts,
                gameStats.threePointsFieldGoal.percentage
              )}
            </View>

            {/* Other Stats */}
            <View style={styles.otherStatsSection}>
              {renderStatRow("Total Points", gameStats.totalPoints)}
              {renderStatRow("Assist", gameStats.assists)}
              {renderStatRow("Steal", gameStats.steals)}
              {renderStatRow("Block", gameStats.blocks)}
              {renderStatRow("Turn Over", gameStats.turnovers)}
              {renderStatRow("Fouls", gameStats.fouls)}

              {/* Rebounds */}
              <View style={styles.reboundsContainer}>
                <Text style={styles.simpleStatTitle}>Rebounds</Text>
                <View style={styles.reboundDetails}>
                  <Text style={styles.reboundText}>
                    Offensive: {gameStats.rebounds.offensive}
                  </Text>
                  <Text style={styles.reboundText}>
                    Defensive: {gameStats.rebounds.defensive}
                  </Text>
                  <Text style={styles.reboundTotal}>
                    Total: {gameStats.rebounds.total}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Add Button */}
        <AddButton onPress={handleAddReport} />
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar activeTab="calendar" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#F8F8F8",
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
  gameTitleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  statsContainer: {
    paddingBottom: 20,
  },
  statSection: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  totalFieldGoalSection: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30", // Red
  },
  twoPtsFieldGoalSection: {
    borderLeftWidth: 4,
    borderLeftColor: "#FFCC00", // Yellow
  },
  threePtsFieldGoalSection: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CD964", // Green
  },
  statHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  statPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  statDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statValue: {
    fontSize: 14,
    color: "#333",
  },
  otherStatsSection: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  simpleStatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  simpleStatTitle: {
    fontSize: 14,
    color: "#333",
  },
  simpleStatValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  reboundsContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  reboundDetails: {
    marginTop: 5,
  },
  reboundText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  reboundTotal: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "right",
    marginTop: 5,
  },
});

export default GameReportScreen;
