<?php
    include_once("cabecalhoPrincipal.php");
    include_once("cabecalhoAluguel.php");
?>

    <!--Contéudo da Página-->
    <div class="container-fluid">

        <!--Mostra os alugueis, painel principal-->
        <div id="painel-listar">
            <div class="row justify-content-center">

                <div class="col-xl-12">

                    <div class="mt-5"></div>

                    <div class="lista-aluguel mt-3 mb-4">

                        <div class="card">

                            <div class="card-header">
                                <i class="fas fa-fw fa-table mr-1"></i>Lista de Alugueis
                            </div>

                            <div class="card-body">

                                <div class="row mb-2">

                                    <div class="col-6">

                                        <div class="buscarPeriodoAluguel mb-3 mt-2">
                                            <form class="form form-inline" id="form-search-date">
                                                <label for="inicio" class="mr-2">De:</label>
                                                <input type="date" id="inicio" name="inicio" class="form-control form-control-sm mr-2">
                                                <label for="fim" class="mr-2">Até:</label>
                                                <input type="date" id="fim" name="fim" class="form-control form-control-sm">
                                                <button class="btn btn-primary btn-sm ml-1">
                                                    <i class="fas fa-search mr-1"></i>Pesquisar
                                                </button>
                                            </form>
                                        </div>

                                    </div>

                                    <div class="col-6">
                                        <div class="float-right">
                                            <div class="form-inline">
                                                <label for="qtdRegistros" class="mr-2 mb-0">Exibir:</label>
                                                <select name="qtdRegistros" id="qtdRegistros" class="form-control">
                                                    <option value="5">5</option>
                                                    <option value="10" selected>10</option>
                                                    <option value="15">15</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="table-responsive-lg">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead class="text-center">
                                            <tr>
                                                <th scope="col">Vencimento</th>
                                                <th scope="col">Inquilino</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Selecionar</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center" id="lista-de-alugueis">
                                        </tbody>
                                        <tfoot class="text-center">
                                            <tr>
                                                <th scope="col">Vencimento</th>
                                                <th scope="col">Inquilino</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Selecionar</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                <div>
                                    <ul class="pagination float-right mt-2 paging-system">
                                        <!--Paginação-->
                                    </ul>
                                </div>
            
                            </div>

                        </div>

                    </div>

                </div>
        
            </div>

        </div>

        <!--Painel para pagar o aluguel-->
        <div id="painel-pagarAluguel">
            <div class="row justify-content-center">

                <div class="col-xl-12">

                    <div class="mt-3"> 

                        <a href="#" class="btn btn-danger btn-voltar">
                            <i class="fas fa-undo-alt mr-1 btn-voltar"></i>Voltar
                        </a>
                
                    </div>


                    <div class="registrar-pagamento mt-3 mb-4">

                        <div class="card">

                            <div class="card-header">
                                <i class="fas fa-dollar-sign mr-1"></i>Pagar Aluguel
                            </div>

                            <div class="card-body">

                                <form id="formulario-de-pagamento">
                                    <div class="row justify-content-center">
                                        <div class="col-xl-9">
                                            <fieldset>
                                                <legend>Dados Gerais</legend>

                                                <input type="hidden" name="idAluguel" value="0">

                                                <div class="form-group">
                                                    <label for="inquilino" class="mb-0">Inquilino</label>
                                                    <input type="text" name="inquilino" id="fInquilino" class="form-control" disabled="disabled">
                                                </div>

                                                <div class="form-group">
                                                    <label for="imovel" class="mb-0">Imóvel</label>
                                                    <input type="text" name="imovel" id="fImovel" class="form-control" disabled="disabled">
                                                </div>

                                                <div class="row">
                                                    <div class="col-xl-6">
                                                        <div class="form-group">
                                                            <label for="vencimento" class="mb-0">Vencimento</label>
                                                            <input type="date" name="dataVencimento" id="fVencimento" class="form-control" disabled="disabled">
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-6">
                                                        <div class="form-group">
                                                            <label for="valor" class="mb-0">Valor</label>
                                                            <input type="text" name="valor" id="fValor" class="form-control" disabled="disabled">
                                                        </div>
                                                    </div>
                                                </div>

                                                <button class="btn btn-success float-right mt-2" type="submit">
                                                    <i class="fas fa-cash-register mr-1"></i>Registrar Pagamento
                                                </button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </form>

                            </div>

                        </div>

                        <div class="alert alert-success mt-3 collapse" id="alert-sucesso">
                            <strong>Sucesso!</strong> Pagamento registrado com sucesso!
                            <button type="button" class="close" id="btn-alert-sucesso">&times;</button>
                        </div>

                        <div class="alert alert-danger mt-3 collapse" id="alert-erro">
                            <strong>Erro!</strong> Erro ao registrar pagamento!
                            <button type="button" class="close" id="btn-alert-erro">&times;</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>

        <!--Painel com os alugueis do inquilino-->
        <div id="painel-alugueisInquilino">
            <div class="row justify-content-center">

                <div class="col-xl-12">

                    <div class="mt-3"> 

                        <a href="#" class="btn btn-danger btn-voltar">
                            <i class="fas fa-undo-alt mr-1 btn-voltar"></i>Voltar
                        </a>
                
                    </div>

                    <div class="lista-aluguel mt-3 mb-4">

                        <div class="card">

                            <div class="card-header">
                                <i class="fas fa-fw fa-table mr-1"></i>Alugueis do Inquilino
                            </div>

                            <div class="card-body">
                                
                                <div class="card mt-2">
                                    <div class="card-header">
                                        <h5 class="card-title">Dados Gerais</h5>
                                    </div>
                                    <div class="card-body">

                                        <h6 class="mb-0">Inquilino</h6>
                                        <span id="infoInquilino">-</span>

                                        <h6 class="mt-2 mb-0">Endereço do Imóvel</h6>
                                        <span id="infoEndereco">-</span>

                                        <h6 class="mt-2 mb-0">Valor do Aluguel</h6>
                                        <span id="infoValor">-</span>

                                    </div>
                                </div>

                                <div class="float-right mt-4 mb-1">
                                    <div class="form-inline">
                                        <label for="qtdRegistros" class="mr-2 mb-0">Exibir:</label>
                                        <select name="qtdRegistros" id="qtdRegistros2" class="form-control">
                                            <option value="5">5</option>
                                            <option value="10" selected>10</option>
                                            <option value="15">15</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="table-responsive-lg">
                                    <table class="table table-bordered mt-2 tabelaAlugueis">
                                        <thead class="text-center">
                                            <tr>
                                                <th scope="col">Data de Vencimento</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Data do Pagamento</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center" id="tabelaAlugueis">
                                        
                                        </tbody>
                                        <tfoot class="text-center">
                                            <tr>
                                                <th scope="col">Data de Vencimento</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Data do Pagamento</th>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div>
                                    <ul class="pagination float-right mt-2 paging-system2">
                                        <!--Paginação-->
                                    </ul>
                                </div>

                                </div>

                            </div>

                        </div>

                    </div>


                </div>

            </div>
        </div>

    </div>
    <!-- Até aqui-->

    <?php
        include_once("scripts.php");
    ?>

    <script src="js/repository/AluguelRepository.js"></script>
    <script src="js/controller/AluguelController.js"></script>
    <script src="js/indexAluguel.js"></script>
    
</body>
</html>