const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, () => {});
fs.readdir(path.join(__dirname, "files"), (err, data) => {
  if (err) console.log(err);
  data.forEach((file) => {
    fs.copyFile(
      path.join(__dirname, "files", file),
      path.join(__dirname, "files-copy", file),
      (err) => {
        if (err) console.log(err);
      }
    );
  });
});
