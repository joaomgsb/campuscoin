<?php
header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';
require_once __DIR__ . '/ApiResponse.php';

$result = DB::update('comments', ['likes' => $_POST['like']], [["id", $_POST['idlike'], "="]]);

if($result['statement']){
    ApiResponse::send([
        'success' => true,
    ], 201, 'Like');
}

ApiResponse::send([
    'success' => false
], 400, 'Erro ao cadastrar o like');