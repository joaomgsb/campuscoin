<?php

class DB
{
    private static function connect()
    {
        try {
            $config = [
                'host' => 'localhost',
                'port' => '',
                'dbname' => 'campus_coin',
                'user' => 'root',
                'password' => ''
            ];

            $credentials = 'mysql:';

            foreach ($config as $key => $value) {
                $credentials .= "$key=$value;";
            }

            $credentials = rtrim($credentials, ';');

            $pdo = new \PDO($credentials);
            $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            return $pdo;
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
    }

    public static function statement(string $query, array $bind = [])
    {
        try {
            $pdo = self::connect();
            $statement = $pdo->prepare($query);

            if (count($bind) > 0) {
                foreach ($bind as $key => $value) {
                    $statement->bindValue($key, $value);
                }
            }

            $execute = $statement->execute();

            if (stripos($query, "SELECT") !== false) {
                return [
                    'statement' => $execute,
                    'fetch' => $statement->fetchAll(\PDO::FETCH_ASSOC)
                ];
            }

            if (stripos($query, "INSERT") !== false) {
                $id = $pdo->lastInsertId();

                return [
                    'statement' => $execute,
                    'id' => $id
                ];
            }

            return ['statement' => $execute];
        } catch (\PDOException $th) {
            return [
                'statement' => false,
                'message' => $th->getMessage(),
                'line' => $th->getLine(),
                'trace' => $th->getTrace()
            ];
        }
    }

    public static function insert(string $table, array $collection)
    {
        try {
            $pdo = self::connect();

            $columns = implode(',', array_keys($collection));
            $rows = ':' . implode(', :', array_keys($collection));

            $sql = "INSERT INTO $table ($columns) VALUES ($rows)";

            $statement = $pdo->prepare($sql);

            foreach ($collection as $key => $value) {
                $statement->bindValue(":$key", $value);
            }

            $statement = $statement->execute();

            $id = $pdo->lastInsertId();

            return [
                'statement' => $statement,
                'id' => $id
            ];
        } catch (\PDOException $th) {
            return [
                'statement' => false,
                'message' => $th->getMessage(),
                'line' => $th->getLine(),
                'trace' => $th->getTrace()
            ];
        }
    }

    public static function update(
        string $table,
        array $setCollection,
        array $whereCollection = []
    ) {
        try {
            $pdo = self::connect();

            $setList = array_map(function ($column) {
                return "$column = :$column";
            }, array_keys($setCollection));
            $set = implode(', ', $setList);

            $whereList = array_map(function ($condition) {
                [$column, $value, $operator] = $condition;
                $handleOperator = $operator ?? '=';

                return "{$column} {$handleOperator} {$value}";
            }, array_values($whereCollection));
            $where = !empty($whereList) ? 'WHERE ' . implode(' ', $whereList) : '';

            $sql = "UPDATE {$table} SET {$set} {$where}";

            $statement = $pdo->prepare($sql);

            foreach ($setCollection as $column => $value) {
                $statement->bindValue(":$column", $value);
            }

            $statement = $statement->execute();

            return [
                'statement' => $statement
            ];
        } catch (\PDOException $th) {
            return [
                'statement' => false,
                'message' => $th->getMessage(),
                'line' => $th->getLine(),
                'trace' => $th->getTrace()
            ];
        }
    }

    public static function debugWithBind(string $query, array $bind)
    {
        $keys = [];

        foreach ($bind as $key => $value) {
            if (is_string($key)) {
                $keys[] = '/' . $key . '/';
            } else {
                $keys[] = '/[?]/';
            }
        }

        $query = preg_replace($keys, $bind, $query, 1, $count);

        return $query;
    }
}