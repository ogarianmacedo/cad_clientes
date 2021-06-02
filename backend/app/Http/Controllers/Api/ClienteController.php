<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\ClienteRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class ClienteController
 * @package App\Http\Controllers\Api
 */
class ClienteController extends Controller
{
    private ClienteRepository $clienteRepository;

    /**
     * ClienteController constructor.
     *
     * @param ClienteRepository $clienteRepository
     */
    public function __construct(ClienteRepository $clienteRepository)
    {
        $this->clienteRepository = $clienteRepository;
    }

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $clientes = $this->clienteRepository->getAll();
            return response()->json($clientes);
        } catch (Exception $e) {
            return response()->json(['message' => 'Dados não encontrados!'], 404);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $this->clienteRepository->create($request->all());
            return response()->json(['message' => 'Cadastrado com sucesso!']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao cadastrar!'], 400);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        try {
            $cliente = $this->clienteRepository->getById($id);
            return response()->json($cliente);
        } catch (Exception $e) {
            return response()->json(['message' => 'Dados não encontrados!'], 404);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $this->clienteRepository->update($request->all(), $id);
            return response()->json(['message' => 'Editado com sucesso!']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao editar!'], 400);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        try {
            $this->clienteRepository->delete($id);
            return response()->json(['message' => 'Excluído com sucesso!']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao excluir!'],400);
        }
    }
}
