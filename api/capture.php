<?php

header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';

$data = json_decode(file_get_contents('php://input'));

foreach ($data->images as $key => $value) {

    $path = "../public/assets/lib/face-api/labels/" . md5($data->id) . "/" . $key . ".png";

    $directory = dirname($path);

    if (!file_exists($directory)) mkdir($directory, 0777, true);

    if (file_put_contents($path, file_get_contents($value)) !== false) {
        
    }
}

$result = DB::update('users', ['directory' => md5($data->id)], [["id", $data->id, "="]]);

if($result['statement']){
    echo json_encode([
        "message" => "Rosto gravado com sucesso!",
        "error" => false
    ]);
}else{
    echo json_encode([
        "message" => "Erro ao cadastrar facial!",
        "error" => true
    ]);
}