<?php
header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';
require_once __DIR__ . '/ApiResponse.php';

$result = DB::insert('videos', [
    'url' => $_POST['url'],
    'name' => $_POST['name']
]);

if($result['statement']){
    ApiResponse::send([
        'success' => true
    ], 201, 'Vídeo Cadastrado com sucesso');
}

ApiResponse::send([
    'success' => false
], 400, 'Erro ao cadastrar o vídeo');