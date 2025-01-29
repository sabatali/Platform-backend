import fs from 'fs';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const createPdf = async ({ created_by, course, topic , title }) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a page to the PDF
  const page = pdfDoc.addPage([600, 400]); // Width x Height in points (1 point = 1/72 inch)
  const { width, height } = page.getSize();

  // Set the font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Title - centered at the top
  const titleText = title;
  page.drawText(titleText, {
    x: width / 2 - font.widthOfTextAtSize(titleText, 24) / 2,
    y: height - 50,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  // Set the spacing for the table
  const tableStartY = height - 100;

  // Draw table headers
  const headers = ['', ''];
  const headerSpacing = 200;
  page.drawText(headers[0], { x: 50, y: tableStartY, size: 18, font, color: rgb(0, 0, 0) });
  page.drawText(headers[1], { x: 50 + headerSpacing, y: tableStartY, size: 18, font, color: rgb(0, 0, 0) });

  // Draw table rows
  const rowSpacing = 40;
  const data = [
    ['Created by : ', created_by],
    ['Subject/Course : ', course],
    ['Topic : ', topic],
  ];

  data.forEach((row, index) => {
    const yPosition = tableStartY - (index + 1) * rowSpacing;
    page.drawText(row[0], { x: 50, y: yPosition, size: 16, font, color: rgb(0, 0, 0) });
    page.drawText(row[1], { x: 50 + headerSpacing, y: yPosition, size: 16, font, color: rgb(0, 0, 0) });
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

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  const outputPath = './created_pdf_with_table.pdf';
  fs.writeFileSync(outputPath, pdfBytes);

  console.log('PDF created at:', outputPath);

  return outputPath

};

// Example Usage
// createPdf({
//   created_by: 'John Doe',
//   course: 'Mathematics',
//   topic: 'Algebra',
// });
