<?php
header("Content-Type: application/json");

require_once __DIR__ . '/DB.php';
require_once __DIR__ . '/ApiResponse.php';

$avatar = '';

if(isset($_FILES['avatar'])){
    $type = mime_content_type($_FILES['avatar']['tmp_name']);
    $avatar = "data:$type;base64," . base64_encode(file_get_contents($_FILES['avatar']['tmp_name']));
}

$result = DB::insert('users', [
    'email' => $_POST['email'],
    'name' => $_POST['name'],
    'password' => md5($_POST['password']),
    'avatar' => $avatar
]);

if($result['statement']){
    ApiResponse::send([
        'success' => true,
        'id' => $result['id']
    ], 201, 'Usuário Criado com sucesso');
}

ApiResponse::send([
    'success' => false
], 400, 'Erro ao criar usuário');