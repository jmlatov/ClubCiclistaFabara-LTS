<?php
// Habilitar errores para debug (quitar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Headers CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Max-Age: 86400'); // 24 horas

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' && isset($_GET['_method'])) {
  $override = strtoupper($_GET['_method']);
  if (in_array($override, ['PUT', 'DELETE'])) {
    $method = $override;
  }
}

// Manejar preflight OPTIONS
//if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//    http_response_code(204);
//    exit();
//}

if ($method === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// Configuración de la base de datos
$host = 'PPSQL100.dns-servicio.com';
$port = '5432';
$dbname = '7784568_ccf_events';
$user = 'ccf_user';
$password = 'Y*031ekb7';

// Intentar conexión a la base de datos
try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection failed',
        'message' => $e->getMessage()
    ]);
    exit();
}

// Obtener método HTTP y path
//$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Log para debug
error_log("Request: $method $path");

// Función para enviar respuesta JSON
function sendResponse($statusCode, $data) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// Función para obtener el body JSON
function getJsonBody() {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendResponse(400, ['error' => 'Invalid JSON']);
    }
    
    return $data;
}

// Función para validar evento
function validateEvent($data, $isUpdate = false) {
    $required = $isUpdate ? [] : ['title', 'date', 'type'];
    $errors = [];
    
    foreach ($required as $field) {
        if (empty($data[$field])) {
            $errors[] = "Field '$field' is required";
        }
    }
    
    if (!empty($data['type']) && !in_array($data['type'], ['ruta', 'prueba', 'noticia', 'otro'])) {
        $errors[] = "Invalid type. Must be one of: ruta, prueba, noticia, otro";
    }
    
    if (!empty($data['date'])) {
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data['date'])) {
            $errors[] = "Invalid date format. Use YYYY-MM-DD";
        }
    }
    
    return $errors;
}

// Routing
try {
    // GET /api/events - Obtener todos los eventos
    if ($method === 'GET' && count($pathParts) >= 2 && $pathParts[1] === 'events') {
        if (count($pathParts) === 2) {
            // GET /api/events
            $stmt = $pdo->query('
                SELECT 
                    id::text, 
                    title, 
                    date::text, 
                    type, 
                    description, 
                    url, 
                    image_url as "imageUrl",
                    created_at,
                    updated_at
                FROM events 
                ORDER BY date ASC, created_at DESC
            ');
            $events = $stmt->fetchAll();
            sendResponse(200, $events);
        } else {
            // GET /api/events/{id}
            $id = $pathParts[2];
            $stmt = $pdo->prepare('
                SELECT 
                    id::text, 
                    title, 
                    date::text, 
                    type, 
                    description, 
                    url, 
                    image_url as "imageUrl",
                    created_at,
                    updated_at
                FROM events 
                WHERE id = ?
            ');
            $stmt->execute([$id]);
            $event = $stmt->fetch();
            
            if (!$event) {
                sendResponse(404, ['error' => 'Event not found']);
            }
            
            sendResponse(200, $event);
        }
    }
    
    // POST /api/events - Crear nuevo evento
    elseif ($method === 'POST' && count($pathParts) === 2 && $pathParts[1] === 'events') {
        $data = getJsonBody();
        
        // Validar datos
        $errors = validateEvent($data);
        if (!empty($errors)) {
            sendResponse(400, ['error' => 'Validation failed', 'details' => $errors]);
        }
        
        // Insertar evento
        $stmt = $pdo->prepare('
            INSERT INTO events (title, date, type, description, url, image_url) 
            VALUES (?, ?, ?, ?, ?, ?) 
            RETURNING 
                id::text, 
                title, 
                date::text, 
                type, 
                description, 
                url, 
                image_url as "imageUrl",
                created_at,
                updated_at
        ');
        
        $stmt->execute([
            $data['title'],
            $data['date'],
            $data['type'],
            $data['description'] ?? null,
            $data['url'] ?? null,
            $data['imageUrl'] ?? null
        ]);
        
        $newEvent = $stmt->fetch();
        sendResponse(201, $newEvent);
    }
    
    // PUT /api/events/{id} - Actualizar evento
    elseif ($method === 'PUT' && count($pathParts) === 3 && $pathParts[1] === 'events') {
        $id = $pathParts[2];
        $data = getJsonBody();
        
        // Validar datos
        $errors = validateEvent($data, true);
        if (!empty($errors)) {
            sendResponse(400, ['error' => 'Validation failed', 'details' => $errors]);
        }
        
        // Verificar que el evento existe
        $checkStmt = $pdo->prepare('SELECT id FROM events WHERE id = ?');
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            sendResponse(404, ['error' => 'Event not found']);
        }
        
        // Construir query de actualización
        $fields = [];
        $values = [];
        $paramCount = 1;
        
        if (isset($data['title'])) {
            $fields[] = "title = ?";
            $values[] = $data['title'];
            $paramCount++;
        }
        if (isset($data['date'])) {
            $fields[] = "date = ?";
            $values[] = $data['date'];
            $paramCount++;
        }
        if (isset($data['type'])) {
            $fields[] = "type = ?";
            $values[] = $data['type'];
            $paramCount++;
        }
        if (isset($data['description'])) {
            $fields[] = "description = ?";
            $values[] = $data['description'];
            $paramCount++;
        }
        if (isset($data['url'])) {
            $fields[] = "url = ?";
            $values[] = $data['url'];
            $paramCount++;
        }
        if (isset($data['imageUrl'])) {
            $fields[] = "image_url = ?";
            $values[] = $data['imageUrl'];
            $paramCount++;
        }
        
        if (empty($fields)) {
            sendResponse(400, ['error' => 'No fields to update']);
        }
        
        $values[] = $id;
        $sql = "
            UPDATE events 
            SET " . implode(', ', $fields) . " 
            WHERE id = ? 
            RETURNING 
                id::text, 
                title, 
                date::text, 
                type, 
                description, 
                url, 
                image_url as \"imageUrl\",
                created_at,
                updated_at
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        $updatedEvent = $stmt->fetch();
        
        sendResponse(200, $updatedEvent);
    }
    
    // DELETE /api/events/{id} - Eliminar evento
    elseif ($method === 'DELETE' && count($pathParts) === 3 && $pathParts[1] === 'events') {
        $id = $pathParts[2];
        
        // Verificar que el evento existe
        $checkStmt = $pdo->prepare('SELECT id FROM events WHERE id = ?');
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            sendResponse(404, ['error' => 'Event not found']);
        }
        
        // Eliminar evento
        $stmt = $pdo->prepare('DELETE FROM events WHERE id = ?');
        $stmt->execute([$id]);
        
        sendResponse(204, null);
    }
    
    // Ruta no encontrada
    else {
        sendResponse(404, [
            'error' => 'Endpoint not found',
            'method' => $method,
            'path' => $path
        ]);
    }
    
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    sendResponse(500, [
        'error' => 'Database error',
        'message' => $e->getMessage()
    ]);
} catch (Exception $e) {
    error_log("General error: " . $e->getMessage());
    sendResponse(500, [
        'error' => 'Internal server error',
        'message' => $e->getMessage()
    ]);
}
?>
