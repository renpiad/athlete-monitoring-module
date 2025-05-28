import React, { useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import TabBar from "../components/TabBar";
import BottomNavBar from "../components/BottomNavBar";
import AddButton from "../components/AddButton";
import AthletesScreen from "./AthletesScreen";
import GamesScreen from "./GamesScreen";
import AthleteDetailScreen from "./AthleteDetailScreen";
import AttributesScreen from "./AttributesScreen";
import GameStatsScreen from "./GameStatsScreen";
import InjuryRecordsScreen from "./InjuryRecordsScreen";
import InjuryCategoryDetailScreen from "./InjuryCategoryDetailScreen";
import GameRecordsScreen from "./GameRecordsScreen";
import GameReportScreen from "./GameReportScreen";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState("Athletes");
  const [currentScreen, setCurrentScreen] = useState("Main"); // Main, AthleteDetail, Attributes, etc.
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedInjuryCategory, setSelectedInjuryCategory] = useState(null);
  const [selectedAthleteGame, setSelectedAthleteGame] = useState(null);

  const handleAddButton = () => {
    console.log(`Add ${activeTab === "Athletes" ? "Athlete" : "Game"}`);
    // Logic to add new athlete or game
  };

  const handleAthleteSelect = (athlete) => {
    setSelectedAthlete(athlete);
    setCurrentScreen("AthleteDetail");
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setCurrentScreen("GameStats");
  };

  const handleBackToMain = () => {
    setCurrentScreen("Main");
  };

  const handleBackToAthleteDetail = () => {
    setCurrentScreen("AthleteDetail");
  };

  const handleBackToInjuryRecords = () => {
    setCurrentScreen("InjuryRecords");
  };

  const handleBackToGameRecords = () => {
    setCurrentScreen("GameRecords");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    if (category === "Attributes") {
      setCurrentScreen("Attributes");
    } else if (category === "Injury Records") {
      setCurrentScreen("InjuryRecords");
    } else if (category === "Game Records") {
      setCurrentScreen("GameRecords");
    } else {
      console.log(
        `Selected category: ${category} for athlete: ${
          selectedAthlete?.name || "Player"
        }`
      );
    }
  };

  const handleInjuryCategorySelect = (injuryCategory) => {
    setSelectedInjuryCategory(injuryCategory);
    setCurrentScreen("InjuryCategoryDetail");
  };

  const handleAthleteGameSelect = (game) => {
    setSelectedAthleteGame(game);
    setCurrentScreen("GameReport");
  };

  // Calculate bottom margin to accommodate navigation bar
  const bottomMargin = Platform.OS === "ios" ? 100 : 90;

  const renderScreen = () => {
    switch (currentScreen) {
      case "Main":
        return (
          <>
            <Header title="Athletes & Games" />
            <TabBar
              tabs={["Athletes", "Games"]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <View style={[styles.content, { marginBottom: bottomMargin }]}>
              {activeTab === "Athletes" ? (
                <AthletesScreen onAthleteSelect={handleAthleteSelect} />
              ) : (
                <GamesScreen onGameSelect={handleGameSelect} />
              )}
            </View>
            <BottomNavBar
              activeTab={activeTab === "Athletes" ? "home" : "calendar"}
            />
          </>
        );
      case "AthleteDetail":
        return (
          <AthleteDetailScreen
            athlete={selectedAthlete}
            onBack={handleBackToMain}
            onCategorySelect={handleCategorySelect}
          />
        );
      case "Attributes":
        return (
          <AttributesScreen
            athlete={selectedAthlete}
            onBack={handleBackToAthleteDetail}
          />
        );
      case "InjuryRecords":
        return (
          <InjuryRecordsScreen
            athlete={selectedAthlete}
            onBack={handleBackToAthleteDetail}
            onInjuryCategorySelect={handleInjuryCategorySelect}
          />
        );
      case "InjuryCategoryDetail":
        return (
          <InjuryCategoryDetailScreen
            athlete={selectedAthlete}
            categoryName={selectedInjuryCategory}
            onBack={handleBackToInjuryRecords}
          />
        );
      case "GameRecords":
        return (
          <GameRecordsScreen
            athlete={selectedAthlete}
            onBack={handleBackToAthleteDetail}
            onGameSelect={handleAthleteGameSelect}
          />
        );
      case "GameReport":
        return (
          <GameReportScreen
            athlete={selectedAthlete}
            game={selectedAthleteGame}
            onBack={handleBackToGameRecords}
          />
        );
      case "GameStats":
        return (
          <GameStatsScreen game={selectedGame} onBack={handleBackToMain} />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="auto" />
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
});

export default MainScreen;
