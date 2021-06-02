<?php

namespace App\Repositories;

use App\Connection;
use PDO;

/**
 * Class Conn
 * @package App\Repositories
 */
abstract class Conn
{
    /**
     * @var PDO
     */
    protected PDO $db;

    /**
     * Model constructor.
     */
    public function __construct()
    {
        $this->db = $this->getConnection();
    }

    /**
     * @return PDO
     */
    private function getConnection(): PDO
    {
        return Connection::getDb();
    }
}
