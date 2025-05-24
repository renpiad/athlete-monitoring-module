// Format a date string
export const formatDate = (dateString) => {
  return dateString; // Just a placeholder for now
};

// Filter an array by a search term
export const filterBySearchTerm = (array, term, properties) => {
  if (!term) return array;

  const lowercaseTerm = term.toLowerCase();
  return array.filter((item) =>
    properties.some(
      (prop) => item[prop] && item[prop].toLowerCase().includes(lowercaseTerm)
    )
  );
};

// Sort an array by a property
export const sortByProperty = (array, property, ascending = true) => {
  return [...array].sort((a, b) => {
    if (ascending) {
      return a[property].localeCompare(b[property]);
    } else {
      return b[property].localeCompare(a[property]);
    }
  });
};
