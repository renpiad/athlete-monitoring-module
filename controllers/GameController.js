import GameModel from "../models/GameModel";

export default {
  getAllGames: () => GameModel.getAllGames(),

  // Alias for getAllGames to make it more intuitive
  getGames: () => GameModel.getAllGames(),

  getGameById: (id) => GameModel.getGameById(id),

  getGamesByPlayer: (playerId) => GameModel.getGamesByPlayer(playerId),

  getPlayerStatsForGame: (gameId, playerId) =>
    GameModel.getPlayerStatsForGame(gameId, playerId),

  addGame: (game) => GameModel.addGame(game),

  addPlayerStats: (gameId, playerId, stats) =>
    GameModel.addPlayerStats(gameId, playerId, stats),

  // Helper function to calculate field goal percentage
  calculatePercentage: (made, attempts) => {
    if (attempts === 0) return 0;
    return ((made / attempts) * 100).toFixed(2);
  },

  // Helper function to format stats for display
  formatGameStats: (stats) => {
    if (!stats) return null;

    return {
      ...stats,
      totalFieldGoal: {
        ...stats.totalFieldGoal,
        percentage: parseFloat(stats.totalFieldGoal.percentage),
      },
      twoPointsFieldGoal: {
        ...stats.twoPointsFieldGoal,
        percentage: parseFloat(stats.twoPointsFieldGoal.percentage),
      },
      threePointsFieldGoal: {
        ...stats.threePointsFieldGoal,
        percentage: parseFloat(stats.threePointsFieldGoal.percentage),
      },
    };
  },

  // Search games by name or date
  searchGames: (term) => {
    if (!term) return GameModel.getAllGames();

    const games = GameModel.getAllGames();
    return games.filter(
      (game) =>
        game.name.toLowerCase().includes(term.toLowerCase()) ||
        game.date.toLowerCase().includes(term.toLowerCase()) ||
        game.opponent.toLowerCase().includes(term.toLowerCase())
    );
  },

  // Sort games by name
  sortGamesByName: (ascending = true) => {
    const games = GameModel.getAllGames();
    return [...games].sort((a, b) => {
      return ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  },
};
