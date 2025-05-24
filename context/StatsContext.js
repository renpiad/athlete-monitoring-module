import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Create context
const StatsContext = createContext(null);

// Check if we're running in a web environment
const isWeb = Platform.OS === "web";

// Game initial state structure
const initialGameStats = {
  gameInfo: {
    gameDate: new Date(),
    venue: "",
    gameType: "Regular Season",
    gameNumber: "Game #1",
    league: "",
    division: "",
    opponent: "",
    season: "",
  },
  quarterScores: {
    q1: { homeScore: "0", awayScore: "0" },
    q2: { homeScore: "0", awayScore: "0" },
    q3: { homeScore: "0", awayScore: "0" },
    q4: { homeScore: "0", awayScore: "0" },
    ot: { homeScore: "0", awayScore: "0" },
  },
  players: [],
  playerStats: {},
  lastUpdated: null,
  source: null, // 'realtime' or 'sheet'
};

// Provider component
export const StatsProvider = ({ children }) => {
  const [gameStats, setGameStats] = useState(initialGameStats);
  const [isDataModified, setIsDataModified] = useState(false);

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      if (isWeb) {
        console.log(
          "Running in web mode - localStorage used instead of AsyncStorage"
        );
        try {
          const storedData = localStorage.getItem("gameStats");
          if (storedData) {
            const parsedData = JSON.parse(storedData);

            // Convert string date back to Date object
            if (parsedData.gameInfo && parsedData.gameInfo.gameDate) {
              parsedData.gameInfo.gameDate = new Date(
                parsedData.gameInfo.gameDate
              );
            }

            setGameStats(parsedData);
          }
        } catch (error) {
          console.error("Error loading data in web:", error);
        }
        return;
      }

      try {
        const storedData = await AsyncStorage.getItem("gameStats");
        if (storedData) {
          const parsedData = JSON.parse(storedData);

          // Convert string date back to Date object
          if (parsedData.gameInfo && parsedData.gameInfo.gameDate) {
            parsedData.gameInfo.gameDate = new Date(
              parsedData.gameInfo.gameDate
            );
          }

          setGameStats(parsedData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Save data to storage when it changes
  useEffect(() => {
    const saveData = async () => {
      if (!isDataModified) return;

      if (isWeb) {
        try {
          localStorage.setItem("gameStats", JSON.stringify(gameStats));
          setIsDataModified(false);
        } catch (error) {
          console.error("Error saving data in web:", error);
        }
        return;
      }

      try {
        await AsyncStorage.setItem("gameStats", JSON.stringify(gameStats));
        setIsDataModified(false);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    saveData();
  }, [gameStats, isDataModified]);

  // Update game info
  const updateGameInfo = (info) => {
    setGameStats((prev) => ({
      ...prev,
      gameInfo: { ...prev.gameInfo, ...info },
      lastUpdated: new Date(),
    }));
    setIsDataModified(true);
  };

  // Update quarter scores
  const updateQuarterScores = (quarter, team, score) => {
    setGameStats((prev) => ({
      ...prev,
      quarterScores: {
        ...prev.quarterScores,
        [quarter]: {
          ...prev.quarterScores[quarter],
          [team]: score,
        },
      },
      lastUpdated: new Date(),
    }));
    setIsDataModified(true);
  };

  // Update players list
  const updatePlayers = (playersList) => {
    setGameStats((prev) => ({
      ...prev,
      players: playersList,
      lastUpdated: new Date(),
    }));
    setIsDataModified(true);
  };

  // Update a single player's stats
  const updatePlayerStats = (playerId, stats, source) => {
    setGameStats((prev) => ({
      ...prev,
      playerStats: {
        ...prev.playerStats,
        [playerId]: {
          ...prev.playerStats[playerId],
          ...stats,
        },
      },
      source: source || prev.source,
      lastUpdated: new Date(),
    }));
    setIsDataModified(true);
  };

  // Get total game score
  const getTotalScore = () => {
    const home = Object.values(gameStats.quarterScores).reduce(
      (sum, quarter) => sum + (parseInt(quarter.homeScore) || 0),
      0
    );
    const away = Object.values(gameStats.quarterScores).reduce(
      (sum, quarter) => sum + (parseInt(quarter.awayScore) || 0),
      0
    );
    return { home, away };
  };

  // Reset all stats to initial values
  const resetAllStats = async () => {
    if (isWeb) {
      try {
        localStorage.removeItem("gameStats");
        setGameStats(initialGameStats);
        setIsDataModified(false);
      } catch (error) {
        console.error("Error resetting data in web:", error);
      }
      return;
    }

    try {
      await AsyncStorage.removeItem("gameStats");
      setGameStats(initialGameStats);
      setIsDataModified(false);
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  };

  // Validate stats for consistency
  const validateStats = () => {
    const issues = [];
    const totals = getTotalScore();

    // Check if player points add up to team score
    const playerPointsTotal = Object.values(gameStats.playerStats).reduce(
      (sum, player) => sum + (player.points || 0),
      0
    );

    if (playerPointsTotal !== totals.home) {
      issues.push(
        `Team score (${totals.home}) doesn't match sum of player points (${playerPointsTotal})`
      );
    }

    // Add other validation checks here

    return issues;
  };

  const value = {
    gameStats,
    updateGameInfo,
    updateQuarterScores,
    updatePlayers,
    updatePlayerStats,
    getTotalScore,
    validateStats,
    resetAllStats,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};

// Custom hook for using the context
export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
};
