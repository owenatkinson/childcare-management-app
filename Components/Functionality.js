import moment from "moment";
import { Alert } from "react-native";

export const convertDate = (dateInput) => {
  return moment(dateInput).format("D/M/YYYY");
};

export const convertTime = (dateInput) => {
  return moment(dateInput).format("HH:mm");
};

export const parseDate = (dateInput) => {
  return moment(dateInput.toDate()).format("D/M/YYYY");
};

export const convertToTimestamp = (dateInput) => {
  dateInput = dateInput.split("/");
  return new Date(dateInput[2], dateInput[1] - 1, dateInput[0]);
};

export const getMonth = (dateInput) => {
  dateInput = dateInput.split("/");
  return dateInput[1];
};

export const getYear = (dateInput) => {
  dateInput = dateInput.split("/");
  return dateInput[2];
};

export const doNumbersMatch = (num1, num2) => {
  return num1 == num2;
};

export const convertDateCheckType = (dateInput) => {
  if (dateInput instanceof Date) {
    return moment(dateInput).format("D/M/YYYY");
  } else {
    return moment(dateInput.toDate()).format("D/M/YYYY");
  }
};

export const isWeekday = (date) => {
  var myDate = date.split("/");
  var newDate = myDate[2] + "/" + myDate[1] + "/" + myDate[0];
  var weekendDate = new Date(newDate);
  return weekendDate.getDay() == 0 || weekendDate.getDay() == 6;
};

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

export const missingDataAlert = () => {
  Alert.alert("Missing input", "There are fields that are missing input, please fill these before trying again. Use \'N/A\' if applicable.");
}

export const invalidTimeAlert = () => {
  Alert.alert("Invalid Time", "You have entered an invalid time within this form, please correct this before trying again. Use this format - '14:00'");
}

export const numericDataAlert = () => {
  Alert.alert("Numeric input required", "You have entered non-numeric input where numeric input is required, please review your input and try again.");
}

export const isValidTime = (input) => {  
  return moment(input, "HH:mm").isValid() && (input.length == 5 || input.length == 4);
}

export const isInputEmpty = (input) => {
  return input.length == 0;
}

export const isNumeric = (input) => {
  if (typeof input != "string") return false;
  return !isNaN(input) && !isNaN(parseFloat(input));
}

export const trimAllergyString = (input) => {
  return input.replace("en:", "");
}