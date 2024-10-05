<?php
header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';
require_once __DIR__ . '/ApiResponse.php';

$sql = "select * from users where email = '{$_GET['email']}'";

$result = DB::statement($sql);

if(count($result['fetch']) > 0){
    ApiResponse::send([
        'emailExists' => true
    ], 200, 'Este usuário já está cadastrado. Por favor, faça login.');
}

ApiResponse::send([
    'emailExists' => false
], 200, 'Usuário não cadastrado');