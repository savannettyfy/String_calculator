
export function add(input) {
  // Set the default delimiter to a comma
  let defaultDelimiter = ',';

  if (input.length === 0) {
    return 0;
  }

  // Check if the input starts with a custom delimiter definition
  if (input.startsWith('//') && input.length > 2) {

    defaultDelimiter = input.charAt(2);

    // Find the index of the first newline character
    const customDelimiterMatch = input.search(/\\n/g);

    // If no newline is found, throw an error
    if (customDelimiterMatch === -1) {
      throw new Error("Invalid Input");
    }

    // Set the delimiter to the substring found between "//" and the newline
    defaultDelimiter = input.substring(2, customDelimiterMatch);

    // Update the input string to exclude the delimiter definition
    input = input.substring(customDelimiterMatch + 2);
  }

  // Replace any newline characters in the input with the default delimiter
  input = input.replace(/\\n/g, defaultDelimiter);

  // Split the input string into an array of numbers using the delimiter
  const separatedValue = input.split(defaultDelimiter);

  // Filter out negative numbers from the separated values
  const negatives = separatedValue?.filter(num => num < 0);

  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  // Sum the valid numbers, parsing them as integers
  return separatedValue.reduce((acc, num) => acc + parseInt(num), 0);
}
