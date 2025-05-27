import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameInfoHeader from "../components/GameInfoHeader";
import TabBar from "../components/TabBar";
import BottomNavBar from "../components/BottomNavBar";
import PlayerSelector from "../components/PlayerSelector";
import RealTimeStats from "../components/RealTimeStats";
import StatsSheetForm from "../components/StatsSheetForm";
import QuarterScores from "../components/QuarterScores";
import { useStats } from "../../context/StatsContext";
import ReportGenerator from "../components/ReportGenerator";

const GameStatsScreen = ({ game, onBack }) => {
  const {
    gameStats,
    updateGameInfo,
    updateQuarterScores,
    updatePlayers,
    resetAllStats,
  } = useStats();

  const [activeTab, setActiveTab] = useState("Real-Time");
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Sample player data
  const players = [
    {
      id: "1",
      name: "John Smith",
      position: "Guard",
      number: "23",
      image: null,
    },
    {
      id: "2",
      name: "Michael Johnson",
      position: "Forward",
      number: "10",
      image: null,
    },
    {
      id: "3",
      name: "David Williams",
      position: "Center",
      number: "7",
      image: null,
    },
  ];

  useEffect(() => {
    // Update gameInfo with data from the selected game and set players
    if (game) {
      updateGameInfo({
        gameDate: game.gameDate || new Date(),
        venue: game.venue || "University Gym",
        gameType: game.gameType || "Regular Season",
        gameNumber: game.gameNumber || "Game #1",
        league: game.league || "University League",
        division: game.division || "Men's Division",
        opponent: game.opponent || "Rival University",
        season: game.season || "Season 2023-2024",
      });

      updatePlayers(players);
    }
  }, [game]);

  // Use gameStats from context
  const handleScoreChange = (quarter, team, value) => {
    updateQuarterScores(quarter, team, value);
  };

  const handleAthleteSelect = (athlete) => {
    setSelectedAthlete(athlete);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenReport = () => {
    setShowReportModal(true);
  };

  const handleCloseReport = () => {
    setShowReportModal(false);
  };

  const handleResetStats = () => {
    Alert.alert(
      "Reset Stats",
      "Are you sure you want to reset all stats? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", onPress: () => resetAllStats(), style: "destructive" },
      ]
    );
  };

  const renderContent = () => {
    if (activeTab === "Real-Time") {
      return (
        <>
          <PlayerSelector
            players={players}
            selectedPlayer={selectedAthlete}
            onSelectPlayer={handleAthleteSelect}
          />
          <RealTimeStats
            player={selectedAthlete || (players.length > 0 ? players[0] : null)}
          />
        </>
      );
    } else if (activeTab === "Stats Sheet") {
      return <StatsSheetForm players={players} gameInfo={gameStats.gameInfo} />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {game ? game.name : "Game Stats"}
        </Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleOpenReport}
          >
            <Text style={styles.headerButtonText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleResetStats}
          >
            <Text style={styles.headerButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Game Information Header */}
        <GameInfoHeader gameInfo={gameStats.gameInfo} />

        {/* Quarter Scores */}
        <QuarterScores
          gameInfo={gameStats.gameInfo}
          quarterData={gameStats.quarterScores}
          onScoreChange={handleScoreChange}
        />

        {/* Tab Navigation */}
        <TabBar
          tabs={["Real-Time", "Stats Sheet"]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Main Content */}
        <View style={styles.content}>{renderContent()}</View>
      </ScrollView>

      {/* Report Modal */}
      <Modal
        visible={showReportModal}
        animationType="slide"
        onRequestClose={handleCloseReport}
      >
        <ReportGenerator onClose={handleCloseReport} />
      </Modal>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 3,
  },
  backIcon: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
  },
  headerButtonText: {
    fontSize: 12,
    color: "#333333",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: 50, // Reduced space for bottom navigation
  },
});

export default GameStatsScreen;
