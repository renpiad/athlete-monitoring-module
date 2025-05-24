import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const RealTimeStats = ({ player }) => {
  const [currentQuarter, setCurrentQuarter] = useState(1);
  const [stats, setStats] = useState({
    fieldGoals2pt: { made: 0, attempted: 0 },
    fieldGoals3pt: { made: 0, attempted: 0 },
    freeThrows: { made: 0, attempted: 0 },
    rebounds: { offensive: 0, defensive: 0 },
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    fouls: 0,
  });

  // Helper function to update stats
  const updateStat = (category, subcategory, value) => {
    setStats((prevStats) => {
      if (subcategory) {
        return {
          ...prevStats,
          [category]: {
            ...prevStats[category],
            [subcategory]: Math.max(
              0,
              prevStats[category][subcategory] + value
            ),
          },
        };
      } else {
        return {
          ...prevStats,
          [category]: Math.max(0, prevStats[category] + value),
        };
      }
    });
  };

  if (!player) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPlayerText}>Please select a player</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Quarter Selector */}
      <View style={styles.quarterSelector}>
        <Text style={styles.sectionTitle}>Quarter</Text>
        <View style={styles.quarterButtons}>
          {[1, 2, 3, 4, "OT"].map((quarter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.quarterButton,
                currentQuarter === quarter ? styles.activeQuarterButton : null,
              ]}
              onPress={() => setCurrentQuarter(quarter)}
            >
              <Text
                style={[
                  styles.quarterButtonText,
                  currentQuarter === quarter
                    ? styles.activeQuarterButtonText
                    : null,
                ]}
              >
                {quarter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Field Goals - 2 Points */}
      <View style={styles.statSection}>
        <Text style={styles.sectionTitle}>2-Point Field Goals</Text>
        <View style={styles.statRow}>
          <View style={styles.statInfo}>
            <Text style={styles.statValue}>
              {stats.fieldGoals2pt.made}/{stats.fieldGoals2pt.attempted}
            </Text>
            <Text style={styles.statLabel}>
              {stats.fieldGoals2pt.attempted > 0
                ? `${(
                    (stats.fieldGoals2pt.made / stats.fieldGoals2pt.attempted) *
                    100
                  ).toFixed(1)}%`
                : "0.0%"}
            </Text>
          </View>
          <View style={styles.statControls}>
            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Made</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("fieldGoals2pt", "made", -1)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => {
                    updateStat("fieldGoals2pt", "made", 1);
                    updateStat("fieldGoals2pt", "attempted", 1);
                  }}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Missed</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("fieldGoals2pt", "attempted", -1)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("fieldGoals2pt", "attempted", 1)}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Field Goals - 3 Points */}
      <View style={styles.statSection}>
        <Text style={styles.sectionTitle}>3-Point Field Goals</Text>
        <View style={styles.statRow}>
          <View style={styles.statInfo}>
            <Text style={styles.statValue}>
              {stats.fieldGoals3pt.made}/{stats.fieldGoals3pt.attempted}
            </Text>
            <Text style={styles.statLabel}>
              {stats.fieldGoals3pt.attempted > 0
                ? `${(
                    (stats.fieldGoals3pt.made / stats.fieldGoals3pt.attempted) *
                    100
                  ).toFixed(1)}%`
                : "0.0%"}
            </Text>
          </View>
          <View style={styles.statControls}>
            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Made</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("fieldGoals3pt", "made", -1)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => {
                    updateStat("fieldGoals3pt", "made", 1);
                    updateStat("fieldGoals3pt", "attempted", 1);
                  }}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Missed</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("fieldGoals3pt", "attempted", -1)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("fieldGoals3pt", "attempted", 1)}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Free Throws */}
      <View style={styles.statSection}>
        <Text style={styles.sectionTitle}>Free Throws</Text>
        <View style={styles.statRow}>
          <View style={styles.statInfo}>
            <Text style={styles.statValue}>
              {stats.freeThrows.made}/{stats.freeThrows.attempted}
            </Text>
            <Text style={styles.statLabel}>
              {stats.freeThrows.attempted > 0
                ? `${(
                    (stats.freeThrows.made / stats.freeThrows.attempted) *
                    100
                  ).toFixed(1)}%`
                : "0.0%"}
            </Text>
          </View>
          <View style={styles.statControls}>
            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Made</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("freeThrows", "made", -1)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => {
                    updateStat("freeThrows", "made", 1);
                    updateStat("freeThrows", "attempted", 1);
                  }}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Missed</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("freeThrows", "attempted", -1)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("freeThrows", "attempted", 1)}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Rebounds */}
      <View style={styles.statSection}>
        <Text style={styles.sectionTitle}>Rebounds</Text>
        <View style={styles.statRow}>
          <View style={styles.statInfo}>
            <Text style={styles.statValue}>
              {stats.rebounds.offensive + stats.rebounds.defensive}
            </Text>
            <Text style={styles.statLabel}>
              Total ({stats.rebounds.offensive} OFF, {stats.rebounds.defensive}{" "}
              DEF)
            </Text>
          </View>
          <View style={styles.statControls}>
            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Offensive</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("rebounds", "offensive", -1)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("rebounds", "offensive", 1)}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.controlGroup}>
              <Text style={styles.controlLabel}>Defensive</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("rebounds", "defensive", -1)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => updateStat("rebounds", "defensive", 1)}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Other Stats */}
      <View style={styles.statSection}>
        <Text style={styles.sectionTitle}>Other Stats</Text>

        {/* Assists */}
        <View style={styles.simpleStatRow}>
          <Text style={styles.simpleStatLabel}>Assists</Text>
          <Text style={styles.simpleStatValue}>{stats.assists}</Text>
          <View style={styles.simpleButtons}>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("assists", null, -1)}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("assists", null, 1)}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Steals */}
        <View style={styles.simpleStatRow}>
          <Text style={styles.simpleStatLabel}>Steals</Text>
          <Text style={styles.simpleStatValue}>{stats.steals}</Text>
          <View style={styles.simpleButtons}>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("steals", null, -1)}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("steals", null, 1)}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Blocks */}
        <View style={styles.simpleStatRow}>
          <Text style={styles.simpleStatLabel}>Blocks</Text>
          <Text style={styles.simpleStatValue}>{stats.blocks}</Text>
          <View style={styles.simpleButtons}>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("blocks", null, -1)}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("blocks", null, 1)}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Turnovers */}
        <View style={styles.simpleStatRow}>
          <Text style={styles.simpleStatLabel}>Turnovers</Text>
          <Text style={styles.simpleStatValue}>{stats.turnovers}</Text>
          <View style={styles.simpleButtons}>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("turnovers", null, -1)}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("turnovers", null, 1)}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fouls */}
        <View style={styles.simpleStatRow}>
          <Text style={styles.simpleStatLabel}>Fouls</Text>
          <Text style={styles.simpleStatValue}>{stats.fouls}</Text>
          <View style={styles.simpleButtons}>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("fouls", null, -1)}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.simpleButton}
              onPress={() => updateStat("fouls", null, 1)}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Player Summary */}
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Points:{" "}
            {stats.fieldGoals2pt.made * 2 +
              stats.fieldGoals3pt.made * 3 +
              stats.freeThrows.made}
          </Text>
          <Text style={styles.summaryText}>
            FG: {stats.fieldGoals2pt.made + stats.fieldGoals3pt.made}/
            {stats.fieldGoals2pt.attempted + stats.fieldGoals3pt.attempted}
            {stats.fieldGoals2pt.attempted + stats.fieldGoals3pt.attempted > 0
              ? ` (${(
                  ((stats.fieldGoals2pt.made + stats.fieldGoals3pt.made) /
                    (stats.fieldGoals2pt.attempted +
                      stats.fieldGoals3pt.attempted)) *
                  100
                ).toFixed(1)}%)`
              : " (0.0%)"}
          </Text>
          <Text style={styles.summaryText}>
            Rebounds: {stats.rebounds.offensive + stats.rebounds.defensive} |
            Assists: {stats.assists} | Steals: {stats.steals}
          </Text>
          <Text style={styles.summaryText}>
            Blocks: {stats.blocks} | Turnovers: {stats.turnovers} | Fouls:{" "}
            {stats.fouls}
          </Text>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Stats</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  noPlayerText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#999999",
  },
  quarterSelector: {
    marginBottom: 15,
  },
  quarterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quarterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center",
  },
  activeQuarterButton: {
    backgroundColor: "#E6F0FF",
    borderColor: "#4A90E2",
  },
  quarterButtonText: {
    fontSize: 14,
    color: "#333333",
  },
  activeQuarterButtonText: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  statSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  statInfo: {
    flex: 1,
    marginRight: 5,
    minWidth: 80,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666666",
  },
  statControls: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  controlGroup: {
    marginLeft: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  controlLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 5,
  },
  buttons: {
    flexDirection: "row",
  },
  controlButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 18,
    margin: 3,
  },
  controlButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  simpleStatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 8,
  },
  simpleStatLabel: {
    flex: 2,
    fontSize: 14,
    color: "#333333",
  },
  simpleStatValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  simpleButtons: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  simpleButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 18,
    margin: 3,
  },
  summarySection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#EDF5FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCDDEE",
  },
  summary: {},
  summaryText: {
    fontSize: 14,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RealTimeStats;
