// Function to convert JSON data to CSV
function jsonToCSV(data) {
    // Extract headers from the first object
    const headers = Object.keys(data[0]);
  
    // Create the CSV string
    const csvRows = [];
    
    // Add the headers row
    csvRows.push(headers.join(","));
  
    // Add the data rows
    data.forEach(row => {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(","));
    });
  
    // Join all rows with newline characters
    return csvRows.join("\n");
}

function downloadJsonToCsv(jsonData, filename){
    const csvData = jsonToCSV(jsonData)
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
