const fs = require("fs");
const path = require("path");

fs.writeFile(
  path.join(__dirname, "project-dist", "bundle.css"),
  "",
  "utf-8",
  () => {}
);

fs.readdir(path.join(__dirname, "styles"), (err, data) => {
  if (err) console.log(err);
  data.forEach((file) => {
    if (path.extname(file) === ".css") {
      fs.readFile(
        path.join(__dirname, "styles", file),
        "utf-8",
        (err, data) => {
          fs.appendFile(
            path.join(__dirname, "project-dist", "bundle.css"),
            data,
            "utf-8",
            () => {}
          );
        }
      );
    }
  });
});
