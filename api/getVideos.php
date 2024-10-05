<?php
header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';
require_once __DIR__ . '/ApiResponse.php';

$where = isset($_GET["id-video"]) ? "where id = {$_GET["id-video"]}" : "";

$sql = "select * from videos $where";

$result = DB::statement($sql);

if(count($result['fetch']) > 0){
    ApiResponse::send($result['fetch'], 200, 'Vídeos encontrados');
}

ApiResponse::send([], 404, 'Nenhum vídeo encontrado');