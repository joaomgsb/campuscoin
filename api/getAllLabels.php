<?php

header("Content-Type: application/json");

$directory = realpath(dirname(__DIR__) . "/public/assets/lib/face-api/labels");

$dirs = scandir($directory);

$labels = [];

foreach ($dirs as $dir) {
    if (is_dir($directory . DIRECTORY_SEPARATOR . $dir) && $dir != '.' && $dir != '..') {
        $labels[] = $dir;
    }
}

echo json_encode([
    "labels" => $labels,
    "error" => count($labels) === 0
]);