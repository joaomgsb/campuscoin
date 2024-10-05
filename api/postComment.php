<?php
header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';
require_once __DIR__ . '/ApiResponse.php';

$result = DB::insert('comments', [
    'userid' => $_POST['userid'],
    'videoid' => $_POST['id-video'],
    'comment' => $_POST['comment'],
    'likes' => $_POST['likes'],
]);

if($result['statement']){
    ApiResponse::send([
        'success' => true,
        'userid' => $_POST['userid'],
        'videoid' => $_POST['id-video'],
        'comment' => $_POST['comment'],
        'likes' => $_POST['likes'],
    ], 201, 'Vídeo Cadastrado com sucesso');
}

ApiResponse::send([
    'success' => false
], 400, 'Erro ao cadastrar o vídeo');