const fs = require("fs");
const path = require("path");

const initDirectory = (source) => {
  fs.mkdir(source, { recursive: true }, () => {});
};

initDirectory(path.join(__dirname, "project-dist"));

let finalContent = "";
fs.readFile(path.join(__dirname, "template.html"), "utf-8", (err, data) => {
  finalContent = data;
});

fs.readdir(path.join(__dirname, "components"), async (err, files) => {
  await files.forEach(async (file) => {
    let fileName = file.split(".html").join("").trim();

    await fs.readFile(
      path.join(__dirname, "components", file),
      "utf-8",
      async (err, data) => {
        finalContent = await finalContent.replace(`{{${fileName}}}`, data);
        await fs.writeFile(
          path.join(__dirname, "project-dist", "index.html"),
          finalContent,
          "utf-8",
          (err) => {}
        );
      }
    );
  });
});

fs.writeFile(path.join(__dirname, "project-dist", "style.css"), "", () => {});

fs.readdir(path.join(__dirname, "styles"), (err, data) => {
  if (err) console.log(err);

  data.forEach((file) => {
    if (path.extname(file) === ".css") {
      fs.readFile(path.join(__dirname, "styles", file), (err, data) => {
        fs.appendFile(
          path.join(__dirname, "project-dist", "style.css"),
          data,
          () => {}
        );
      });
    }
  });
});

initDirectory(path.join(__dirname, "project-dist", "assets"));

fs.readdir(path.join(__dirname, "assets"), (err, data) => {
  data.forEach((dir) => {
    initDirectory(path.join(__dirname, "project-dist", "assets", dir));
    fs.readdir(path.join(__dirname, "assets", dir), (err, files) => {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, "assets", dir, file),
          path.join(__dirname, "project-dist", "assets", dir, file),
          (err) => {
            if (err) console.log(err);
          }
        );
      });
    });
  });
});
