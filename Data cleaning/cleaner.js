const fs = require("fs");

// Load your data file (replace with your actual file path)
const raw = fs.readFileSync("data.js", "utf-8");

// Extract just the array from the file
const sampleListings = eval(
  raw.match(/const sampleListings\s*=\s*(\[\s*[\s\S]*?\]);/)[1]
);

// Convert the image object to a plain URL string
const cleanedListings = sampleListings.map((listing) => {
  return {
    ...listing,
    image: listing.image.url,
  };
});

// Convert back to JS style module export
const finalOutput = `const sampleListings = ${JSON.stringify(
  cleanedListings,
  null,
  2
)};\n\nmodule.exports = { data: sampleListings };`;

// Save the updated file
fs.writeFileSync("cleaned_data.js", finalOutput, "utf-8");

console.log("✅ File cleaned and saved as cleaned_data.js");
