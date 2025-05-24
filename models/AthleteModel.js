// Simple model for athlete data
const athletes = [
  { id: "1", name: "Sarmiento", position: "Point Guard (PG)" },
  { id: "2", name: "Amaro", position: "Shooting Guard (SG)" },
  { id: "3", name: "Taugan", position: "Small Forward (SF)" },
  { id: "4", name: "Caronan", position: "Power Forward (PF)" },
  { id: "5", name: "Garcia", position: "Center (C)" },
];

export default {
  getAllAthletes: () => athletes,
  getAthleteById: (id) => athletes.find((athlete) => athlete.id === id),
  addAthlete: (athlete) => {
    const newAthlete = { id: (athletes.length + 1).toString(), ...athlete };
    athletes.push(newAthlete);
    return newAthlete;
  },
};
