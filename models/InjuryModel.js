// Sample model for injury data
const injuryRecords = [
  {
    id: "1",
    athleteId: "1",
    category: "Ankle Injuries",
    date: "January 10, 2023",
    location: "Right Ankle",
    severity: "Grade 2 Sprain (Moderate)",
    duration: "3 weeks",
    status: "In-recovery",
    details:
      "Injury occurred during landing after a jump shot. Player was able to walk off court with assistance.",
  },
  {
    id: "2",
    athleteId: "1",
    category: "Ankle Injuries",
    date: "December 09, 2024",
    location: "Left Ankle",
    severity: "Grade 3 Sprain (Severe)",
    duration: "6 weeks",
    status: "Fully recovered",
    details:
      "Injury occurred during landing after a jump shot. Player was able to walk off court with assistance.",
  },
];

export default {
  getAllInjuryRecords: () => injuryRecords,

  getInjuryRecordsByAthlete: (athleteId) => {
    return injuryRecords.filter((record) => record.athleteId === athleteId);
  },

  getInjuryRecordsByCategory: (athleteId, category) => {
    return injuryRecords.filter(
      (record) => record.athleteId === athleteId && record.category === category
    );
  },

  addInjuryRecord: (record) => {
    const newRecord = {
      id: (injuryRecords.length + 1).toString(),
      ...record,
    };
    injuryRecords.push(newRecord);
    return newRecord;
  },

  getCategoryCounts: (athleteId) => {
    const records = injuryRecords.filter(
      (record) => record.athleteId === athleteId
    );

    // Get unique categories
    const categories = [...new Set(records.map((record) => record.category))];

    // Count records for each category
    return categories.map((category) => {
      const count = records.filter(
        (record) => record.category === category
      ).length;
      return {
        category,
        count: `${count} ${count === 1 ? "Record" : "Records"}`,
      };
    });
  },
};
