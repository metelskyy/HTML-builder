const fs = require("fs");
const path = require("path");

const copyDir = async () => {
  await fs.mkdir(
    path.join(__dirname, "files-copy"),
    { recursive: true },
    () => {}
  );

  await fs.readdir(path.join(__dirname, "files-copy"), (err, data) => {
    data.forEach((file) => {
      fs.unlink(path.join(__dirname, "files-copy", file), () => {});
    });
  });

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
};
copyDir();
