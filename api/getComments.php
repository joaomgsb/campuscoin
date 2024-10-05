<?php
header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';
require_once __DIR__ . '/ApiResponse.php';

$and = isset($_GET["id-video"]) ? "and videoid = {$_GET["id-video"]}" : "";

$sql = "select comment,
               datetime,
               likes,
               name,
               videoid,
               avatar,
               userid,
               comments.id id
         from comments,
              users
        where comments.userid = users.id $and";

$result = DB::statement($sql);

if(count($result['fetch']) > 0){
    ApiResponse::send($result['fetch'], 200, 'Comentários encontrados');
}

ApiResponse::send([], 404, 'Nenhum comentário encontrado');