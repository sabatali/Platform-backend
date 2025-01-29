import fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const UpdatePdf = async ({existingPdfPath, imagePath, topic, note, addedBy, outputPdfPath}) =>  {
  console.log("🚀 ~ UpdatePdf ~ existingPdfPath:", existingPdfPath)
  // Read the existing PDF and the image
  const existingPdfBytes = fs.readFileSync(existingPdfPath);
  const imageBytes = fs.readFileSync(imagePath);

  // Load the existing PDF document
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the image into the PDF
  const image = await pdfDoc.embedPng(imageBytes); // If your image is PNG, use embedPng
  
  // Scale image to fit
  const scale = 0.5; // Adjust scale as needed
  const { width, height } = image.scale(scale);  // Get image width and height after scaling

  // Define margins
  const marginTop = 50;
  const marginBottom = 50;
  const marginLeft = 50;
  const marginRight = 50;

  // Calculate the page width and height with margins
  const pageWidth = width + marginLeft + marginRight;
  const pageHeight = height + marginTop + marginBottom + 100;

  // Dynamically set the page size to match the image size with margins
  const page = pdfDoc.addPage([pageWidth, pageHeight]);  // Page size matches image size + margins

  // Set font for the text
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const textSize = 15;

  // Add the Topic and Note with margins at the top
  page.drawText(`Topic: ${topic}`, {
    x: marginLeft,
    y: pageHeight - marginTop + 10,  // Positioning below the top margin
    size: textSize,
    font: font,
  });
  
  page.drawText(`Note: ${note}`, {
    x: marginLeft,
    y: pageHeight - marginTop - 20,  // Positioning below the topic text
    size: textSize,
    font: font,
  });

  // Draw the image on the page with margins
  page.drawImage(image, {
    x: marginLeft,  // Starting position from the left margin
    y: marginBottom, // Starting position from the bottom margin
    width: width,
    height: height,
  });

  // Add the footer text "Image added By: {addedBy}" at the bottom
  page.drawText(`Image added By: ${addedBy}`, {
    x: marginLeft,
    y: marginBottom - 20,  // Y-coordinate for footer (above the bottom margin)
    size: 12,
    font: font,
  });

  // Add footer text (LearnSnapify & Developed By Sabat Ali) at the bottom right
  const footerText = 'LearnSnapify | Developed By Sabat Ali';
  const footerWidth = font.widthOfTextAtSize(footerText, 12);
  const footerX = width - footerWidth - 20; // 20px padding from the right
  const footerY = 20; // 20px from the bottom
  page.drawText(footerText, {
    x: footerX,
    y: footerY,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();

  // Write the updated PDF to a new file
  fs.writeFileSync(outputPdfPath, pdfBytes);
  console.log('Updated PDF saved at:', outputPdfPath);

  return outputPdfPath
}

// // Example usage
// const existingPdfPath = '/Users/devpumas/Desktop/Project/src/Utils/created_pdf_with_table.pdf';  // Path to the existing PDF
// const imagePath = '/Users/devpumas/Desktop/Project/assest/image.png';           // Path to the image to add
// const topic = 'New Updates';
// const note = 'Important details';
// const addedBy = 'John Doe';               // Who added the image
// const outputPdfPath = './updated.pdf';    // Path where the updated PDF will be saved

// UpdatePdf(existingPdfPath, imagePath, topic, note, addedBy, outputPdfPath)
//   .then(() => console.log('PDF updated successfully'))
//   .catch((error) => console.error('Error updating PDF:', error));
