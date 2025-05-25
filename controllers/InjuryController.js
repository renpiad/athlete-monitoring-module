import InjuryModel from "../models/InjuryModel";

export default {
  getAllInjuryRecords: () => InjuryModel.getAllInjuryRecords(),

  getInjuryRecordsByAthlete: (athleteId) =>
    InjuryModel.getInjuryRecordsByAthlete(athleteId),

  getInjuryRecordsByCategory: (athleteId, category) =>
    InjuryModel.getInjuryRecordsByCategory(athleteId, category),

  addInjuryRecord: (record) => InjuryModel.addInjuryRecord(record),

  // Get all injury categories with counts for an athlete
  getInjuryCategories: (athleteId) => {
    // Default categories that should always be shown
    const defaultCategories = [
      { id: "1", name: "Ankle Injuries", count: "0 Records" },
      { id: "2", name: "Leg Injuries", count: "0 Records" },
      { id: "3", name: "Shoulder Injuries", count: "0 Records" },
      { id: "4", name: "Finger Injuries", count: "0 Records" },
      { id: "5", name: "Achilles Tendon Injuries", count: "0 Records" },
    ];

    // Get actual category counts from the model
    const categoryCounts = InjuryModel.getCategoryCounts(athleteId);

    // Update default categories with actual counts
    return defaultCategories.map((category) => {
      const found = categoryCounts.find((c) => c.category === category.name);
      return {
        ...category,
        count: found ? found.count : category.count,
      };
    });
  },
};
