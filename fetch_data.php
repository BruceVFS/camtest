<?php
// Database connection parameters
$hostname = 'vodasure-instance-1.cwgtrwe8bohh.eu-west-1.rds.amazonaws.com';
$username = 'vodasureapi';
$password = 'Ip4v5@nP.';
$database = 'Vodasure';

// Create a connection to the database
$connection = new mysqli($hostname, $username, $password, $database);

// Check the connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Get the search text from the POST request
$searchText = $_POST['searchText'];

// Prepare the query using a prepared statement
$query = "SELECT * FROM config.tac_lists WHERE product_code LIKE ? OR serial_number LIKE ? OR product_description LIKE ?";
$stmt = $connection->prepare($query);
$searchPattern = "%" . $searchText . "%";
$stmt->bind_param("sss", $searchPattern, $searchPattern, $searchPattern);

// Execute the query
$stmt->execute();

// Get the result set
$result = $stmt->get_result();

// Fetch and store the results in an array
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close the prepared statement and connection
$stmt->close();
$connection->close();

// Return the results as JSON
$response = array(
    "success" => true,
    "data" => $data
);
echo json_encode($response);
?>
