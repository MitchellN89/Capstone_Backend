const fs = require("fs").promises; // Import the fs module with promises
const Tesseract = require("tesseract.js");

async function uploadFile(fileData, fileName, fileFolder) {
  // Remove data:image/jpeg;base64, from the base64 string if present
  const base64Data = fileData.replace(/^data:image\/\w+;base64,/, "");

  // Create a Buffer from the base64 string
  const imageBuffer = Buffer.from(base64Data, "base64");

  // Save the image file on the server
  const imagePath = `./uploads/${fileFolder}/${fileName}.jpg`;
  await fs.writeFile(imagePath, imageBuffer);

  // Use Tesseract.js to recognize text
  await Tesseract.recognize(imageBuffer, "eng", {
    logger: (info) => console.log(info),
  });
}

module.exports = uploadFile;
