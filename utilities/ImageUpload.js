const fs = require("fs").promises; // Import the fs module with promises

async function uploadFile(fileData, fileName, fileFolder) {
  // Remove data:image/jpeg;base64, from the base64 string if present
  const base64Data = fileData.replace(/^data:image\/\w+;base64,/, "");

  // Create a Buffer from the base64 string
  const imageBuffer = Buffer.from(base64Data, "base64");

  // Save the image file on the server
  const imagePath = `./uploads/${fileFolder}/${fileName}.jpg`;
  await fs.writeFile(imagePath, imageBuffer);
}

module.exports = uploadFile;
