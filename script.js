document.addEventListener('DOMContentLoaded', function() {
  // Get references to the input and result elements
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // Attach an event listener to the button to trigger the search
  document.querySelector('button').addEventListener('click', searchCSV);

function searchCSV() {
  const searchText = searchInput.value.toLowerCase();

  // Fetch the CSV file using AJAX
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const csvData = xhr.responseText;

        // Parse the CSV data
        const lines = csvData.split('\n');
        const headers = lines[0].split(','); // Ensure correct CSV parsing here
        const searchFields = ['product_code', 'serial_number', 'product_description'];
        const results = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');

          // Check if the search text matches any of the search fields
          if (searchFields.some(field => headers.includes(field) && values[headers.indexOf(field)].toLowerCase().includes(searchText))) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
              entry[headers[j]] = values[j];
            }
            results.push(entry);
          }
        }

        // Display the search results
        displayResults(results);
      } else {
        console.error('Failed to fetch the CSV file.');
      }
    }
  };

    // Replace 'search_sample.csv' with the actual path to your CSV file
    xhr.open('GET', 'search_sample.csv', true);
    xhr.send();
  }

  function displayResults(results) {
    let html = '';
    if (results.length > 0) {
      html = '<table border="1"><tr>';
      Object.keys(results[0]).forEach(key => {
        html += `<th>${key}</th>`;
      });
      html += '</tr>';

      results.forEach(result => {
        html += '<tr>';
        Object.values(result).forEach(value => {
          html += `<td>${value}</td>`;
        });
        html += '</tr>';
      });

      html += '</table>';
    } else {
      html = '<p>No results found.</p>';
    }

    searchResults.innerHTML = html;
  }
});
