const fs = require('fs');
const pdf = require('pdf-parse');

const parsePDF = async (filePath) => {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Parse the PDF content
    const options = {
      "max" : 3
    }
    const data = await pdf(dataBuffer, options);

    // Extract text from the parsed data
    const text = data.text.trim();

    // Organize paragraphs into a JSON object
    const paragraphsObject = organizeParagraphs(text);

    return paragraphsObject;
  } catch (error) {
    console.error('Error parsing PDF:', error.message);
    throw error;
  }
}

const organizeParagraphs = (text) => {
  const paragraphsObject = {};
  const lines = text.split('\n');
  let currentTitle = '';
  let currentParagraph = '';

  for (const line of lines) {
    // Check if the line is a title in uppercase
    if (line === line.toUpperCase() && line.trim() !== '') {
      // Save the previous title and paragraph
      if (currentTitle !== '' && currentParagraph !== '') {
        paragraphsObject[currentTitle] = currentParagraph.trim();
        currentParagraph = '';
      }

      // Set the new title
      currentTitle = line;
    } else {
      // Add the line to the current paragraph
      currentParagraph += line;
    }
  }

  // Save the last title and paragraph
  if (currentTitle !== '' && currentParagraph !== '') {
    paragraphsObject[currentTitle] = currentParagraph.trim();
  }

  return paragraphsObject;
}

// Example usage
const filePath = './pdf/space-marines.pdf';


parsePDF(filePath)
  .then(paragraphsObject => {
    console.log('Parsed paragraphs from PDF:\n', JSON.stringify(paragraphsObject, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });