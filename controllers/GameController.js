import GameModel from "../models/GameModel";

export default {
  getGames: () => GameModel.getAllGames(),
  getGameById: (id) => GameModel.getGameById(id),
  addGame: (game) => GameModel.addGame(game),

  // Filter games by search term
  searchGames: (term) => {
    if (!term) return GameModel.getAllGames();

    const games = GameModel.getAllGames();
    return games.filter(
      (game) =>
        game.name.toLowerCase().includes(term.toLowerCase()) ||
        game.date.toLowerCase().includes(term.toLowerCase())
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
