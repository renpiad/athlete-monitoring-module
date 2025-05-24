import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const StatsSheetForm = ({ players, gameInfo }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(
    players.length > 0 ? players[0].id : null
  );
  const [stats, setStats] = useState({
    totalFieldGoalsMade: "",
    totalFieldGoalsAttempted: "",
    twoPointMade: "",
    twoPointAttempted: "",
    threePointMade: "",
    threePointAttempted: "",
    freeThrowsMade: "",
    freeThrowsAttempted: "",
    offensiveRebounds: "",
    defensiveRebounds: "",
    assists: "",
    steals: "",
    blocks: "",
    turnovers: "",
    fouls: "",
  });

  const handleInputChange = (field, value) => {
    setStats((prevStats) => ({
      ...prevStats,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Logic to save stats
    console.log("Saving stats for player:", selectedPlayer);
    console.log("Stats:", stats);
  };

  // Helper to calculate percentage
  const calculatePercentage = (made, attempted) => {
    if (!made || !attempted) return "0.0%";
    return `${((parseInt(made) / parseInt(attempted)) * 100).toFixed(1)}%`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.selectPlayerContainer}>
        <Text style={styles.label}>Select an athlete</Text>
        <View style={styles.selectInput}>
          <Picker
            selectedValue={selectedPlayer}
            onValueChange={(itemValue) => setSelectedPlayer(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {players.map((player) => (
              <Picker.Item
                key={player.id}
                label={player.name}
                value={player.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shooting Statistics</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Total Field Goals
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Made</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stats.totalFieldGoalsMade}
                onChangeText={(text) =>
                  handleInputChange("totalFieldGoalsMade", text)
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Attempt</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stats.totalFieldGoalsAttempted}
                onChangeText={(text) =>
                  handleInputChange("totalFieldGoalsAttempted", text)
                }
              />
            </View>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageLabel}>
                {calculatePercentage(
                  stats.totalFieldGoalsMade,
                  stats.totalFieldGoalsAttempted
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            2-Point Field Goals
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Made</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stats.twoPointMade}
                onChangeText={(text) => handleInputChange("twoPointMade", text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Attempt</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stats.twoPointAttempted}
                onChangeText={(text) =>
                  handleInputChange("twoPointAttempted", text)
                }
              />
            </View>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageLabel}>
                {calculatePercentage(
                  stats.twoPointMade,
                  stats.twoPointAttempted
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            3-Point Field Goals
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Made</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stats.threePointMade}
                onChangeText={(text) =>
                  handleInputChange("threePointMade", text)
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Attempt</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stats.threePointAttempted}
                onChangeText={(text) =>
                  handleInputChange("threePointAttempted", text)
                }
              />
            </View>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageLabel}>
                {calculatePercentage(
                  stats.threePointMade,
                  stats.threePointAttempted
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Free Throws
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Made</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stats.freeThrowsMade}
                onChangeText={(text) =>
                  handleInputChange("freeThrowsMade", text)
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Attempt</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stats.freeThrowsAttempted}
                onChangeText={(text) =>
                  handleInputChange("freeThrowsAttempted", text)
                }
              />
            </View>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageLabel}>
                {calculatePercentage(
                  stats.freeThrowsMade,
                  stats.freeThrowsAttempted
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rebounding</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Offensive Rebounds
          </Text>
          <TextInput
            style={[styles.input, styles.wideInput]}
            keyboardType="numeric"
            value={stats.offensiveRebounds}
            onChangeText={(text) =>
              handleInputChange("offensiveRebounds", text)
            }
          />
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Defensive Rebounds
          </Text>
          <TextInput
            style={[styles.input, styles.wideInput]}
            keyboardType="numeric"
            value={stats.defensiveRebounds}
            onChangeText={(text) =>
              handleInputChange("defensiveRebounds", text)
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other Stats</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Assists
          </Text>
          <TextInput
            style={[styles.input, styles.wideInput]}
            keyboardType="numeric"
            value={stats.assists}
            onChangeText={(text) => handleInputChange("assists", text)}
          />
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Steals
          </Text>
          <TextInput
            style={[styles.input, styles.wideInput]}
            keyboardType="numeric"
            value={stats.steals}
            onChangeText={(text) => handleInputChange("steals", text)}
          />
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Blocks
          </Text>
          <TextInput
            style={[styles.input, styles.wideInput]}
            keyboardType="numeric"
            value={stats.blocks}
            onChangeText={(text) => handleInputChange("blocks", text)}
          />
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Turnovers
          </Text>
          <TextInput
            style={[styles.input, styles.wideInput]}
            keyboardType="numeric"
            value={stats.turnovers}
            onChangeText={(text) => handleInputChange("turnovers", text)}
          />
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
            Fouls
          </Text>
          <TextInput
            style={[styles.input, styles.wideInput]}
            keyboardType="numeric"
            value={stats.fouls}
            onChangeText={(text) => handleInputChange("fouls", text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
  selectPlayerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  selectInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    height: Platform.OS === "ios" ? 150 : 50,
  },
  picker: {
    height: Platform.OS === "ios" ? 150 : 50,
  },
  pickerItem: {
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statRow: {
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    minWidth: 80,
    marginHorizontal: 2,
  },
  inputLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    padding: 5,
  },
  percentageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },
  percentageLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  wideInput: {
    width: "50%",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StatsSheetForm;
