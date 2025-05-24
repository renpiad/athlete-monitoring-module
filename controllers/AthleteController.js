import AthleteModel from "../models/AthleteModel";

export default {
  getAthletes: () => AthleteModel.getAllAthletes(),
  getAthleteById: (id) => AthleteModel.getAthleteById(id),
  addAthlete: (athlete) => AthleteModel.addAthlete(athlete),

  // Filter athletes by search term
  searchAthletes: (term) => {
    if (!term) return AthleteModel.getAllAthletes();

    const athletes = AthleteModel.getAllAthletes();
    return athletes.filter(
      (athlete) =>
        athlete.name.toLowerCase().includes(term.toLowerCase()) ||
        athlete.position.toLowerCase().includes(term.toLowerCase())
    );
  },

  // Sort athletes by name
  sortAthletesByName: (ascending = true) => {
    const athletes = AthleteModel.getAllAthletes();
    return [...athletes].sort((a, b) => {
      return ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  },
};
