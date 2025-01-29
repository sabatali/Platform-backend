import axios from 'axios';
import fs from 'fs';

export const downloadFile = async (fileUrl) => {
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream', // Ensures data is treated as a stream
    });
    const outputLocationPath = "downloaded_file.pdf"
    // Create a write stream to save the file locally
    const writer = fs.createWriteStream(outputLocationPath);

    // Pipe the response data into the write stream
    response.data.pipe(writer);
    

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve('File downloaded successfully'));
      writer.on('error', (error) => reject(`Error downloading file: ${error}`));
    });
  } catch (error) {
    console.error('Error while downloading file:', error.message);
    throw error;
  }
};


