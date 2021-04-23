// Required for prompt the user
const prompt = require("prompt-sync")({ sigint: true });

// Define the global variables
const rows = 8;
const columns = 9;

// Define the theater schema skeleton
const defineSchema = (rows) => {
  const schema = [];
  for (let row = 0; row < rows; row++) {
    schema[row] = 0;
  }
  return schema;
};

const handleSeat = (schema, num, row) => {
  const test = schema[row] + num <= columns;
  if (test) {
    schema[row] += num;
  }
  return test;
};

const showSchema = (array) => {
  array.forEach((row, index) => {
    let line = `Row ${index}: `;
    for (let col = 0; col < columns; col++) {
      line += col < row ? "[x]" : "[ ]";
    }
    console.log(line);
  });
};

const schema = defineSchema(rows);

const fetchUserDatas = (question, min, max) => {
  answer = parseInt(prompt(question));
  if (isNaN(answer) || answer > max || answer < min) {
    console.log(`A number between ${min} to ${max} is required`);
    fetchUserDatas(question, min, max);
  }
  return answer;
};

const nbPlaces = fetchUserDatas(
  "How many places do you need (Max 9) ? ",
  1,
  columns
);
const numRow = fetchUserDatas("Please enter a theater row (0 to 8): ", 0, rows);

return handleSeat(schema, nbPlaces, numRow)
  ? showSchema(schema)
  : console.log("not possible");
