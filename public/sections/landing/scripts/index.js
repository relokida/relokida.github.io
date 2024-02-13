const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

// Get the folder path where the script is located
const folderPath = __dirname;

// Function to square up PNG images
async function squareImages() {
    try {
        // Get list of files in folder
        const files = fs.readdirSync(folderPath);

        // Filter PNG files
        const pngFiles = files.filter(file => file.endsWith('.png'));

        // Process each PNG file
        for (let i = 0; i < pngFiles.length; i++) {
            const file = pngFiles[i];
            const filePath = path.join(folderPath, file);
            const squaredFilePath = path.join(folderPath, `${i}_squared.png`);

            // Open image
            const image = await Jimp.read(filePath);

            // Resize and crop image to 800x800 pixels
            await image.cover(800, 800).writeAsync(squaredFilePath);

            // Delete original file
            fs.unlinkSync(filePath);
        }

        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
squareImages();

