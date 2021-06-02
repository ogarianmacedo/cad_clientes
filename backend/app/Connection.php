<?php

namespace App;

use Exception;
use PDO;
use PDOException;

/**
 * Class Connection
 * @package App
 */
class Connection
{
    /**
     * @return PDO
     * @throws Exception
     */
    public static function getDb(): PDO
    {
        try {
            return new PDO(
                "mysql:host=" . env('DB_HOST') . ";dbname=" . env('DB_DATABASE') . ";charset=utf8",
                env('DB_USERNAME'),
                env('DB_PASSWORD')
            );
        } catch (PDOException $e) {
            throw new Exception($e->getMessage(), $e->getCode());
        }
    }
}
