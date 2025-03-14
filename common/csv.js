/**
 * @param {Array<object>} data - JSON data to convert to CSV
 * @returns {string} - CSV formatted string
 */
// Function to convert JSON data to CSV
function jsonToCSV(data) {
    // Extract headers from the first object
    const headers = Object.keys(data[0]);
  
    // Create the CSV string
    const csvRows = [headers.join(",")];
  
    // Add the data rows
    csvRows.push(...data.map(row => headers.map(header => row[header]).join(",")));
  
    // Join all rows with newline characters
    return csvRows.join("\n");
}

/**
 * @param {Array<object>} jsonData - JSON data to download as CSV
 * @param {string} filename - Name of the file to download
 */
function downloadJsonToCsv(jsonData, filename){
    const csvData = jsonToCSV(jsonData)
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
