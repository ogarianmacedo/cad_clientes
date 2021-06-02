<?php

use Illuminate\Support\Facades\Route;

/**
 * Rota = api/clientes/
 */
Route::group(['prefix' => 'clientes'], function () {
    Route::get('', 'Api\ClienteController@index');
    Route::post('create', 'Api\ClienteController@store');
    Route::get('/{id}', 'Api\ClienteController@show');
    Route::put('update/{id}', 'Api\ClienteController@update');
    Route::delete('delete/{id}', 'Api\ClienteController@destroy');
});
