const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (err, data) => {
    let res = "";
    data.forEach((file) => {
      fs.stat(
        path.join(__dirname, "secret-folder", file.name),
        (err, stats) => {
          if (file.isFile()) {
            res = `${file.name} - ${path.extname(file.name)} - ${
              stats.size + "b"
            }`;
            console.log(res);
          }
        }
      );
    });
  }
);
