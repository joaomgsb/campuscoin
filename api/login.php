<?php
header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';
require_once __DIR__ . '/ApiResponse.php';

if(isset($_POST['hash'])){
    $sql = "select * from users where directory = '{$_POST['hash']}'";
}else{
    $sql = "select * from users where email = '{$_POST['email']}' and password = md5('{$_POST['password']}')";
}

$result = DB::statement($sql);

if(count($result['fetch']) > 0){
    ApiResponse::send([
        'login' => true,
        'email' => $result['fetch'][0]['email'],
        'name' => $result['fetch'][0]['name'],
        'avatar' => $result['fetch'][0]['avatar'],
        'id' => $result['fetch'][0]['id'],
    ], 200, 'Usuário Logado com sucesso');
}

ApiResponse::send([
    'login' => false
], 403, 'Usuário ou senha inválidos');