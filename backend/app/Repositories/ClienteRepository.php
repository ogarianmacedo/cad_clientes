<?php

namespace App\Repositories;

use Exception;
use PDO;

/**
 * Class ClienteRepository
 * @package App\Repositories
 */
class ClienteRepository extends Conn
{
    /**
     * @var string
     */
    private string $table = 'tb_clientes';

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        try {
            $page = (int)$_GET['page'];
            $rowsPerPage = 10;

            $limit = ($page - 1) * $rowsPerPage;

            $query = "SELECT * FROM {$this->table} ORDER BY id DESC LIMIT {$limit}, {$rowsPerPage}";

            return  $this->db->query($query)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception();
        }
    }

    /**
     * @param $params
     * @throws Exception
     */
    public function create($params)
    {
        try {
            $sql = "INSERT INTO {$this->table} (nome, nascimento, cpf, celular, email, endereco, observacao)
                    VALUES (:nome, :nascimento, :cpf, :celular, :email, :endereco, :observacao)";

            $sqlPrepare = $this->db->prepare($sql);
            $sqlPrepare->bindValue(":nome", $params['nome']);
            $sqlPrepare->bindValue(":email", $params['email']);
            $sqlPrepare->bindValue(":nascimento", $params['nascimento']);
            $sqlPrepare->bindValue(":cpf", $params['cpf']);
            $sqlPrepare->bindValue(":celular", $params['celular']);
            $sqlPrepare->bindValue(":endereco", $params['endereco']);
            $sqlPrepare->bindValue(":observacao", $params['observacao']);

            $sqlPrepare->execute();
        } catch (Exception $e) {
            throw new Exception();
        }
    }

    /**
     * @param $id
     * @return array
     * @throws Exception
     */
    public function getById($id): array
    {
        try {
            $query = "SELECT * FROM {$this->table} where id = $id";
            return $this->db->query($query)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception();
        }
    }

    /**
     * @param $params
     * @param $id
     * @throws Exception
     */
    public function update($params, $id)
    {
        try {
            $sql = "UPDATE {$this->table}
                    SET nome = :nome,
                        nascimento = :nascimento,
                        cpf = :cpf,
                        celular = :celular,
                        email = :email,
                        endereco = :endereco,
                        observacao = :observacao
                    WHERE id = :id";

            $sqlPrepare = $this->db->prepare($sql);
            $sqlPrepare->bindValue(":id", $id);
            $sqlPrepare->bindValue(":nome", $params['nome']);
            $sqlPrepare->bindValue(":email", $params['email']);
            $sqlPrepare->bindValue(":nascimento", $params['nascimento']);
            $sqlPrepare->bindValue(":cpf", $params['cpf']);
            $sqlPrepare->bindValue(":celular", $params['celular']);
            $sqlPrepare->bindValue(":endereco", $params['endereco']);
            $sqlPrepare->bindValue(":observacao", $params['observacao']);

            $sqlPrepare->execute();
        } catch (Exception $e) {
            throw new Exception();
        }
    }

    /**
     * @param $id
     * @return mixed
     * @throws Exception
     */
    public function delete($id)
    {
        try {
            $sql = "DELETE FROM {$this->table} WHERE id = :id";

            $sqlPrepare = $this->db->prepare($sql);
            $sqlPrepare->bindValue(":id", $id);

            $sqlPrepare->execute();
        } catch (Exception $e) {
            throw new Exception();
        }
    }
}
