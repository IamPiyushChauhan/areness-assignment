// Function to validate email format
export const validateEmail = (email) => {
  return String(email) // Convert email to string
    .toLowerCase() // Convert to lowercase for case-insensitive matching
    .match(
      // Use regex match to validate email format
      // Regular expression pattern for validating email addresses
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
