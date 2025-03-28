require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Filebase credentials

const filebaseGateway = 'https://inland-coffee-junglefowl.myfilebase.com/ipfs/';
const targetPath = process.argv[2];

// Helper function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  
  return arrayOfFiles;
}

// Function to upload a file to Filebase
async function uploadFileToFilebase(filePath, fileName) {
  try {
    const formData = new FormData();
    const fileStream = fs.createReadStream(filePath);
    
    // Append file
    formData.append('file', fileStream);
    
    const response = await axios.post(
      'https://api.filebase.io/v1/ipfs/add',
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          'Authorization': `Bearer ${filebaseKey}`,
        }
      }
    );
    
    return response.data.cid;
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, 
      error.response ? JSON.stringify(error.response.data) : error.message);
    throw error;
  }
}

// Function to upload entire directory
async function uploadDirectoryToFilebase(directoryPath) {
  try {
    console.log(`Uploading directory: ${directoryPath}`);
    
    const allFiles = getAllFiles(directoryPath);
    console.log(`Found ${allFiles.length} files to upload`);
    
    // Use IPFS Desktop or CLI approach for large folders
    console.log('For large folders, Filebase recommends using IPFS Desktop or CLI');
    console.log('Attempting direct upload of files...');
    
    // Upload index.html first to get root CID
    const indexHtmlPath = path.join(directoryPath, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
      console.error('index.html not found in the root directory!');
      return;
    }
    
    console.log('Uploading index.html first...');
    const rootCID = await uploadFileToFilebase(indexHtmlPath, 'index.html');
    console.log(`Root CID (index.html): ${rootCID}`);
    
    // Upload remaining files one by one
    const remainingFiles = allFiles.filter(f => f !== indexHtmlPath);
    
    console.log(`Uploading remaining ${remainingFiles.length} files...`);
    let successCount = 0;
    let failCount = 0;
    
    for (const filePath of remainingFiles) {
      try {
        const relativePath = path.relative(directoryPath, filePath);
        const cid = await uploadFileToFilebase(filePath, relativePath);
        successCount++;
        console.log(`Uploaded: ${relativePath} (${successCount}/${remainingFiles.length})`);
      } catch (error) {
        failCount++;
        console.log(`Failed: ${path.relative(directoryPath, filePath)}`);
      }
    }
    
    console.log(`
    Upload summary:
    - Total files: ${allFiles.length}
    - Successfully uploaded: ${successCount + 1} (including index.html)
    - Failed uploads: ${failCount}
    `);
    
    console.log('You can access your website at:');
    console.log(`${filebaseGateway}${rootCID}`);
  } catch (error) {
    console.error('Upload failed:', error.message);
  }
}

// Main script execution
if (!targetPath) {
  console.log('Usage: node filebase-script.js <directory-path>');
  process.exit(1);
}

try {
  const stats = fs.statSync(targetPath);
  if (stats.isDirectory()) {
    uploadDirectoryToFilebase(targetPath);
  } else {
    console.error(`Error: ${targetPath} is not a directory.`);
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
}
