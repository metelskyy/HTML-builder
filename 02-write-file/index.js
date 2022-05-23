const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;
let text = "";

stdout.write(`Write text:\n`);
fs.writeFile(path.join(__dirname, "text.txt"), "", () => {});

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    stdout.write(`Goodbye`);
    process.exit();
  }
  text += data;
  fs.writeFile(path.join(__dirname, "text.txt"), text, () => {});
});

process.on("SIGINT", () => {
  stdout.write(`Goodbye`);
  process.exit();
});
