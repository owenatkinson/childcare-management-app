import moment from "moment";
import { Alert } from "react-native";

// Uses moment to convert the date to "D/M/YYYY" format
export const convertDate = (dateInput) => {
  return moment(dateInput).format("D/M/YYYY");
};

// Uses moment to convert the time to "HH:mm" format
export const convertTime = (timeInput) => {
  return moment(timeInput).format("HH:mm");
};

// Uses moment to convert a string to a date and then display in "D/M/YYYY" format
export const parseDate = (dateInput) => {
  return moment(dateInput.toDate()).format("D/M/YYYY");
};

// Converts a date into a timestamp
export const convertToTimestamp = (dateInput) => {
  dateInput = dateInput.split("/");
  return new Date(dateInput[2], dateInput[1] - 1, dateInput[0]);
};

// Extracts the month value from a date
export const getMonth = (dateInput) => {
  dateInput = dateInput.split("/");
  return dateInput[1];
};

// Extracts the year value from a date
export const getYear = (dateInput) => {
  dateInput = dateInput.split("/");
  return dateInput[2];
};

// Returns a boolean value to represent if the two supplied numbers match
export const doNumbersMatch = (num1, num2) => {
  return num1 == num2;
};

// Handles date conversion to "D/M/YYYY" depending on type of variable supplied
export const convertDateCheckType = (dateInput) => {
  if (dateInput instanceof Date) {
    return moment(dateInput).format("D/M/YYYY");
  } else {
    return moment(dateInput.toDate()).format("D/M/YYYY");
  }
};

// Returns a boolean value to represent if a supplied date is a weekday
export const isWeekday = (dateInput) => {
  var splitDate = dateInput.split("/");
  var newDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
  var weekendDate = new Date(newDate);
  return weekendDate.getDay() == 0 || weekendDate.getDay() == 6;
};

// Returns a boolean value to represent if a supplied date is a the first monday of the month
export const getMonday = (date) => {
  var myDate = date.split("/");
  var newDate = myDate[2] + "/" + myDate[1] + "/" + myDate[0];
  var mondayDate = new Date(newDate);

  mondayDate.setDate(1);

  while (mondayDate.getDay() !== 1) {
    mondayDate.setDate(mondayDate.getDate() + 1);
  }

  var parsedDate = convertDate(mondayDate);

  return date == parsedDate;
};

// Provides an alert declaring that there is absent data
export const missingDataAlert = () => {
  Alert.alert("Missing input", "There are fields that are missing input, please fill these before trying again. Use \'N/A\' if applicable.");
}

// Provides an alert declaring that there is an invalid time input
export const invalidTimeAlert = () => {
  Alert.alert("Invalid Time", "You have entered an invalid time within this form, please correct this before trying again. Use this format - '14:00'");
}

// Provides an alert declaring that there is an invalid data type input
export const numericDataAlert = () => {
  Alert.alert("Numeric input required", "You have entered non-numeric input where numeric input is required, please review your input and try again.");
}

// Returns a boolean value that represents if a valid time has been supplied 
export const isValidTime = (timeInput) => {  
  return moment(timeInput, "HH:mm").isValid() && (timeInput.length == 5 || timeInput.length == 4);
}

// Returns a boolean value that represents if an input is empty 
export const isInputEmpty = (input) => {
  return input.length == 0;
}

// Returns a boolean value that represents if an input is numeric 
export const isNumeric = (input) => {
  if (typeof input != "string") return false;
  return !isNaN(input) && !isNaN(parseFloat(input));
}

// Trims allergy text to display only valuable information
export const trimAllergyString = (allergyInput) => {
  return allergyInput.replace("en:", "");
}