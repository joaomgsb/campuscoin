<?php

class ApiResponse{
    /**
     * Função para devolver resposta json ao client
     *
     * @param array $data
     * 
     * @return string Json com resultado do array informado
     * 
     */
    public static function send($data, $status_code, $message = ''){

        echo json_encode([
            'message' => $message,
            'data' => $data,
            'status_code' => $status_code
        ]);
        die();
    }
}