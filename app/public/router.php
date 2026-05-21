<?php
// Router for PHP built-in server — forwards all non-file requests to Symfony
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$filepath = __DIR__ . $path;
if ($path !== '/' && is_file($filepath)) {
    return false;
}
require_once __DIR__ . '/index.php';
