import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useStats } from "../../context/StatsContext";

const ReportGenerator = ({ onClose }) => {
  const { gameStats, validateStats } = useStats();
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationIssues, setValidationIssues] = useState([]);

  // Function to validate stats before generating report
  const validateBeforeGenerate = () => {
    const issues = validateStats();
    setValidationIssues(issues);
    return issues.length === 0;
  };

  // Function to generate and display the report
  const generateReport = () => {
    if (!validateBeforeGenerate()) {
      return;
    }

    setIsGenerating(true);
    // Simulate report generation process
    setTimeout(() => {
      setIsGenerating(false);
      Alert.alert(
        "Report Generated",
        "Your report has been successfully generated",
        [{ text: "OK" }]
      );
    }, 1000);
  };

  // Calculate team totals
  const calculateTeamTotals = () => {
    const totals = {
      points: 0,
      fgMade: 0,
      fgAttempts: 0,
      fg2Made: 0,
      fg2Attempts: 0,
      fg3Made: 0,
      fg3Attempts: 0,
      ftMade: 0,
      ftAttempts: 0,
      offRebounds: 0,
      defRebounds: 0,
      totalRebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
    };

    Object.values(gameStats.playerStats).forEach((player) => {
      totals.points += player.points || 0;
      totals.fgMade += player.fgMade || 0;
      totals.fgAttempts += player.fgAttempts || 0;
      totals.fg2Made += player.fg2Made || 0;
      totals.fg2Attempts += player.fg2Attempts || 0;
      totals.fg3Made += player.fg3Made || 0;
      totals.fg3Attempts += player.fg3Attempts || 0;
      totals.ftMade += player.ftMade || 0;
      totals.ftAttempts += player.ftAttempts || 0;
      totals.offRebounds += player.offRebounds || 0;
      totals.defRebounds += player.defRebounds || 0;
      totals.totalRebounds +=
        (player.offRebounds || 0) + (player.defRebounds || 0);
      totals.assists += player.assists || 0;
      totals.steals += player.steals || 0;
      totals.blocks += player.blocks || 0;
      totals.turnovers += player.turnovers || 0;
      totals.fouls += player.fouls || 0;
    });

    return totals;
  };

  // Calculate percentages
  const calculatePercentage = (made, attempts) => {
    if (!attempts) return "0.0%";
    return ((made / attempts) * 100).toFixed(1) + "%";
  };

  const renderReportPreview = () => {
    const teamTotals = calculateTeamTotals();
    const quarterScores = gameStats.quarterScores;
    const totalScore = {
      home: Object.values(quarterScores).reduce(
        (sum, q) => sum + (parseInt(q.homeScore) || 0),
        0
      ),
      away: Object.values(quarterScores).reduce(
        (sum, q) => sum + (parseInt(q.awayScore) || 0),
        0
      ),
    };

    return (
      <ScrollView style={styles.reportContainer}>
        {/* Header */}
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>
            {gameStats.gameInfo.league} BASKETBALL
          </Text>
          <Text style={styles.reportSubtitle}>
            {gameStats.gameInfo.season} - {gameStats.gameInfo.gameType}
          </Text>
          <Text style={styles.reportGameInfo}>
            {gameStats.gameInfo.venue},{" "}
            {gameStats.gameInfo.gameDate?.toDateString()}
          </Text>
        </View>

        {/* Quarter Scores */}
        <View style={styles.scoreTable}>
          <Text style={styles.sectionTitle}>QUARTER SCORES</Text>
          <View style={styles.scoreHeader}>
            <Text style={[styles.scoreCell, styles.teamCell]}>TEAM</Text>
            <Text style={styles.scoreCell}>Q1</Text>
            <Text style={styles.scoreCell}>Q2</Text>
            <Text style={styles.scoreCell}>Q3</Text>
            <Text style={styles.scoreCell}>Q4</Text>
            <Text style={styles.scoreCell}>OT</Text>
            <Text style={styles.scoreCell}>TOTAL</Text>
          </View>

          <View style={styles.scoreRow}>
            <Text style={[styles.scoreCell, styles.teamCell]}>
              {gameStats.gameInfo.division || "HOME TEAM"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.q1?.homeScore || "0"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.q2?.homeScore || "0"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.q3?.homeScore || "0"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.q4?.homeScore || "0"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.ot?.homeScore || "0"}
            </Text>
            <Text style={[styles.scoreCell, styles.totalCell]}>
              {totalScore.home}
            </Text>
          </View>

          <View style={styles.scoreRow}>
            <Text style={[styles.scoreCell, styles.teamCell]}>
              {gameStats.gameInfo.opponent || "OPPONENT"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.q1?.awayScore || "0"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.q2?.awayScore || "0"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.q3?.awayScore || "0"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.q4?.awayScore || "0"}
            </Text>
            <Text style={styles.scoreCell}>
              {quarterScores.ot?.awayScore || "0"}
            </Text>
            <Text style={[styles.scoreCell, styles.totalCell]}>
              {totalScore.away}
            </Text>
          </View>
        </View>

        {/* Player Stats Table */}
        <View style={styles.statsTable}>
          <Text style={styles.sectionTitle}>PLAYER STATISTICS</Text>
          <View style={styles.statsHeader}>
            <Text style={[styles.statsCell, styles.playerCell]}>PLAYER</Text>
            <Text style={styles.statsCell}>MIN</Text>
            <Text style={styles.statsCell}>PTS</Text>
            <Text style={[styles.statsCell, styles.wideCell]}>FG</Text>
            <Text style={[styles.statsCell, styles.wideCell]}>3PT</Text>
            <Text style={[styles.statsCell, styles.wideCell]}>FT</Text>
            <Text style={[styles.statsCell, styles.wideCell]}>REB</Text>
            <Text style={styles.statsCell}>AST</Text>
            <Text style={styles.statsCell}>STL</Text>
            <Text style={styles.statsCell}>BLK</Text>
            <Text style={styles.statsCell}>TO</Text>
            <Text style={styles.statsCell}>PF</Text>
          </View>

          {gameStats.players.map((player) => {
            const stats = gameStats.playerStats[player.id] || {};
            return (
              <View key={player.id} style={styles.statsRow}>
                <Text style={[styles.statsCell, styles.playerCell]}>
                  {player.number} {player.name}
                </Text>
                <Text style={styles.statsCell}>{stats.minutes || "0"}</Text>
                <Text style={styles.statsCell}>{stats.points || "0"}</Text>
                <Text style={[styles.statsCell, styles.wideCell]}>
                  {stats.fgMade || "0"}/{stats.fgAttempts || "0"}
                </Text>
                <Text style={[styles.statsCell, styles.wideCell]}>
                  {stats.fg3Made || "0"}/{stats.fg3Attempts || "0"}
                </Text>
                <Text style={[styles.statsCell, styles.wideCell]}>
                  {stats.ftMade || "0"}/{stats.ftAttempts || "0"}
                </Text>
                <Text style={[styles.statsCell, styles.wideCell]}>
                  {stats.totalRebounds || "0"}
                </Text>
                <Text style={styles.statsCell}>{stats.assists || "0"}</Text>
                <Text style={styles.statsCell}>{stats.steals || "0"}</Text>
                <Text style={styles.statsCell}>{stats.blocks || "0"}</Text>
                <Text style={styles.statsCell}>{stats.turnovers || "0"}</Text>
                <Text style={styles.statsCell}>{stats.fouls || "0"}</Text>
              </View>
            );
          })}

          {/* Team Totals Row */}
          <View style={[styles.statsRow, styles.totalsRow]}>
            <Text style={[styles.statsCell, styles.playerCell]}>
              TEAM TOTALS
            </Text>
            <Text style={styles.statsCell}>-</Text>
            <Text style={styles.statsCell}>{teamTotals.points}</Text>
            <Text style={[styles.statsCell, styles.wideCell]}>
              {teamTotals.fgMade}/{teamTotals.fgAttempts}
            </Text>
            <Text style={[styles.statsCell, styles.wideCell]}>
              {teamTotals.fg3Made}/{teamTotals.fg3Attempts}
            </Text>
            <Text style={[styles.statsCell, styles.wideCell]}>
              {teamTotals.ftMade}/{teamTotals.ftAttempts}
            </Text>
            <Text style={[styles.statsCell, styles.wideCell]}>
              {teamTotals.totalRebounds}
            </Text>
            <Text style={styles.statsCell}>{teamTotals.assists}</Text>
            <Text style={styles.statsCell}>{teamTotals.steals}</Text>
            <Text style={styles.statsCell}>{teamTotals.blocks}</Text>
            <Text style={styles.statsCell}>{teamTotals.turnovers}</Text>
            <Text style={styles.statsCell}>{teamTotals.fouls}</Text>
          </View>

          {/* Percentages Row */}
          <View style={[styles.statsRow, styles.percentageRow]}>
            <Text style={[styles.statsCell, styles.playerCell]}>
              PERCENTAGES
            </Text>
            <Text style={styles.statsCell}>-</Text>
            <Text style={styles.statsCell}>-</Text>
            <Text style={[styles.statsCell, styles.wideCell]}>
              {calculatePercentage(teamTotals.fgMade, teamTotals.fgAttempts)}
            </Text>
            <Text style={[styles.statsCell, styles.wideCell]}>
              {calculatePercentage(teamTotals.fg3Made, teamTotals.fg3Attempts)}
            </Text>
            <Text style={[styles.statsCell, styles.wideCell]}>
              {calculatePercentage(teamTotals.ftMade, teamTotals.ftAttempts)}
            </Text>
            <Text style={[styles.statsCell, styles.wideCell]}>-</Text>
            <Text style={styles.statsCell}>-</Text>
            <Text style={styles.statsCell}>-</Text>
            <Text style={styles.statsCell}>-</Text>
            <Text style={styles.statsCell}>-</Text>
            <Text style={styles.statsCell}>-</Text>
          </View>
        </View>

        {/* Additional Game Stats */}
        <View style={styles.additionalStats}>
          <Text style={styles.sectionTitle}>ADDITIONAL TEAM STATS</Text>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>POINTS OFF TURNOVERS</Text>
              <Text style={styles.statValue}>
                {gameStats.extraStats?.pointsOffTurnovers || "0"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>FAST BREAK POINTS</Text>
              <Text style={styles.statValue}>
                {gameStats.extraStats?.fastBreakPoints || "0"}
              </Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>SECOND CHANCE POINTS</Text>
              <Text style={styles.statValue}>
                {gameStats.extraStats?.secondChancePoints || "0"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>BIGGEST LEAD</Text>
              <Text style={styles.statValue}>
                {gameStats.extraStats?.biggestLead || "0"}
              </Text>
            </View>
          </View>
        </View>

        {/* Export Buttons */}
        <View style={styles.exportOptions}>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => {
              Alert.alert("Export", "PDF Export would happen here");
            }}
          >
            <Text style={styles.buttonText}>Export as PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => {
              Alert.alert("Print", "Print functionality would be here");
            }}
          >
            <Text style={styles.buttonText}>Print Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stats Report</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>

      {validationIssues.length > 0 && (
        <View style={styles.validationWarning}>
          <Text style={styles.warningTitle}>Validation Issues:</Text>
          {validationIssues.map((issue, index) => (
            <Text key={index} style={styles.warningText}>
              • {issue}
            </Text>
          ))}
        </View>
      )}

      {isGenerating ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Generating report...</Text>
        </View>
      ) : (
        <>
          {renderReportPreview()}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={generateReport}>
              <Text style={styles.buttonText}>
                {validationIssues.length > 0
                  ? "Generate Anyway"
                  : "Generate Report"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  validationWarning: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF3CD",
    borderWidth: 1,
    borderColor: "#FFEEBA",
    borderRadius: 5,
  },
  warningTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#856404",
  },
  warningText: {
    color: "#856404",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
  },
  button: {
    backgroundColor: "#0066cc",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  reportContainer: {
    flex: 1,
    padding: 10,
  },
  reportHeader: {
    alignItems: "center",
    marginBottom: 15,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  reportSubtitle: {
    fontSize: 16,
    marginVertical: 5,
  },
  reportGameInfo: {
    fontSize: 14,
    color: "#666666",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  scoreTable: {
    marginBottom: 20,
  },
  scoreHeader: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
  },
  scoreRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
  },
  scoreCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
  teamCell: {
    flex: 2,
    textAlign: "left",
    paddingLeft: 5,
    fontWeight: "bold",
  },
  totalCell: {
    fontWeight: "bold",
  },
  statsTable: {
    marginBottom: 20,
  },
  statsHeader: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
  },
  statsRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
  },
  statsCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
  },
  playerCell: {
    flex: 3,
    textAlign: "left",
    paddingLeft: 5,
  },
  wideCell: {
    flex: 1.5,
  },
  totalsRow: {
    backgroundColor: "#F9F9F9",
    paddingVertical: 8,
  },
  percentageRow: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 8,
  },
  additionalStats: {
    marginBottom: 20,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: "#F9F9F9",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    textAlign: "center",
  },
  exportOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  exportButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
});

export default ReportGenerator;
