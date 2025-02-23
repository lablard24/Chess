const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads"); // Adjust folder path

fs.readdir(uploadDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    fs.unlink(path.join(uploadDir, file), (err) => {
      if (err) console.error("Error deleting file:", err);
      else console.log(`Deleted: ${file}`);
    });
  });
});
