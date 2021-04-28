// Required for prompt the user
const prompt = require("prompt-sync")({ sigint: true });

// Define the global variables
const rows = 8;
const columns = 9;

// Define the colors
const white = "\x1b[37m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";
const magenta = "\x1b[35m";
const cyan = "\x1b[36m";
const bold = "\x1b[1m";
const reset = "\x1b[0m";

// Define the theater schema skeleton
const defineSchema = (rows) => {
  const schema = [];
  for (let row = 0; row < rows; row++) {
    schema[row] = 0;
  }
  return schema;
};

const schema = defineSchema(rows);

// Manage the user entries
const handleSeat = (schema, num, row) => {
  // If enough free seat
  if (schema[row - 1] + num <= columns) {
    schema[row - 1] += num; // Reservation of the seats
    return showSchema(schema); // return the theater schema
  }
  // else return an error
  else {
    if (columns - schema[row - 1] > 0) {
      const remainingSeats = columns - schema[row - 1];
      const seat = remainingSeats > 1 ? "seats" : "seat";
      console.log(
        `${bold}${red}Sorry but only ${remainingSeats} ${seat} are available in the ${row}th row${reset}\n`
      );
    } else {
      console.log(
        `${bold}${red}Sorry but no seat are available in the ${row}th row${reset}\n`
      );
    }
  }
};

// Display of the theater schema
const showSchema = (array) => {
  // Seats row
  let firstLine = "| Seats | ";
  for (let col = 0; col < columns; col++) {
    firstLine += ` ${col + 1} `;
  }
  firstLine += " |";

  // separator row
  let separator = " ";
  for (let i = 1; i < firstLine.length - 1; i++) {
    separator += "=";
  }

  // welcome row
  console.log(
    magenta,
    bold,
    "\n /  Welcome to the Simplon's Theater \\",
    white
  );

  console.log(separator);
  console.log(firstLine);
  console.log(separator);

  // Seating plan
  array.forEach((row, index) => {
    let line = `| Row ${index + 1} | `;
    for (let col = 0; col < columns; col++) {
      line += col < row ? `${cyan} x ${white}` : " - ";
    }
    console.log(line, "|");
  });
  console.log(separator, reset, "\n");
};

// Verify if the answer's format of the user is correct
const fetchUserData = (question, min, max) => {
  const answer = parseInt(prompt(question));
  if (isNaN(answer) || answer > max || answer < min) {
    console.log(
      `${red}${bold}/!\\ A number between ${min} to ${max} is required${reset}`
    );
    return fetchUserData(question, min, max);
  }
  return answer;
};

// Looping menu display
do {
  const nbPlaces = fetchUserData(
    `How many places do you need (Max ${columns}, ${yellow}CTRL + C to exit${white}) ? `,
    1,
    columns
  );
  const numRow = fetchUserData(
    `Please enter a theater row (1 to ${rows}): `,
    1,
    rows
  );

  handleSeat(schema, nbPlaces, numRow);
} while (true);
