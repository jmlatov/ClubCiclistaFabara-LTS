<?php
// Debug específico para PUT
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Log de la petición
error_log("=== PUT DEBUG START ===");
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("URI: " . $_SERVER['REQUEST_URI']);
error_log("Content-Type: " . ($_SERVER['CONTENT_TYPE'] ?? 'not set'));

// Headers CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Solo procesar PUT
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Obtener el body
$input = file_get_contents('php://input');
error_log("Raw input: " . $input);

// Decodificar JSON
$data = json_decode($input, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON decode error: " . json_last_error_msg());
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON', 'details' => json_last_error_msg()]);
    exit();
}

error_log("Decoded data: " . print_r($data, true));

// Obtener ID de la URL
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));
error_log("Path parts: " . print_r($pathParts, true));

if (count($pathParts) < 3) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing event ID']);
    exit();
}

$id = $pathParts[2];
error_log("Event ID: " . $id);

// Simular respuesta exitosa para debug
$response = [
    'success' => true,
    'message' => 'PUT request processed',
    'id' => $id,
    'data' => $data,
    'path' => $path
];

echo json_encode($response);
error_log("=== PUT DEBUG END ===");
?>
