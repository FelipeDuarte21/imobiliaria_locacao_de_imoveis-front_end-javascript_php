<?php
    include_once("cabecalhoPrincipal.php");
    include_once("cabecalhoAluguel.php");
?>

    <!--Contéudo da Página-->
    <div class="container-fluid">
        
        <!--Mostra as locações-->
        <div id="painel-listar">
            <div class="row justify-content-center">

                <div class="col-xl-12">

                    <div class="mt-3">

                        <a href="#" class="btn btn-primary btn-novo" data-toggle="tooltip" data-placement="right" title="Alugar imóvel">
                            <i class="fas fa-plus-square mr-1"></i>Novo
                        </a>

                        <a href="#" class="btn btn-info btn-prop-inq" data-toggle="tooltip" data-placement="right" title="Relação de Proprietários e Inquilinos">
                            <i class="fas fa-users mr-1"></i>Proprietários e Inquilinos
                        </a>
                    
                    </div>

                    <div class="mt-3 mb-4">

                        <div class="card">

                            <div class="card-header">
                                <i class="fas fa-fw fa-table mr-1"></i>Lista de Locações
                            </div>

                            <div class="card-body">

                                <div class="row mb-2">

                                    <div class="col-6">
            
                                        <div class="form-inline">
                                            <form id="formulario-de-busca">
                                                <input type="text" id="field-search-name" class="form-control form-control-sm" placeholder="Pesquisar...">
            
                                                <button type="submit" class="btn btn-primary btn-sm">
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
                                        <thead>
                                            <tr class="text-center">
                                                <th scope="col">Id</th>
                                                <th scope="col">Inquilino</th>
                                                <th scope="col">Imóvel</th>
                                                <th scope="col">Proprietário</th>
                                                <th scope="col">Data da Locação</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Selecionar</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center" id="lista-de-locacoes">
                                        </tbody>
                                        <tfoot>
                                            <tr class="text-center">
                                                <th scope="col">Id</th>
                                                <th scope="col">Inquilino</th>
                                                <th scope="col">Imóvel</th>
                                                <th scope="col">Proprietário</th>
                                                <th scope="col">Data da Locação</th>
                                                <th scope="col">Valor</th>
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
        
        <!--Painel de formulario de locação de imovel-->
        <div id="painel-cadastrar">
            <div class="row justify-content-center">

                <div class="col-xl-12">

                    <div class="mt-3"> 

                        <a href="#" class="btn btn-danger btn-voltar">
                            <i class="fas fa-undo-alt mr-1 btn-voltar"></i>Voltar
                        </a>
                
                    </div>

                    <div class="mt-3 mb-4">

                        <div class="card">

                            <div class="card-header">
                                <i class="fas fa-file-contract mr-1"></i>Locação de Imóvel
                            </div>
                            
                            <div class="card-body">

                                <form id="formulario-de-cadastro">

                                    <div class="row justify-content-center mt-3">

                                        <div class="col-xl-9">

                                            <fieldset>
                                                <legend>Dados Gerais</legend>

                                                <input type="hidden" name="idLocacao" value="0">

                                                <div class="form-group">
                                                    <label class="mb-0" for="inquilinos">Inquilino</label>
                                                    <select name="inquilino" id="inquilinos" class="form-control">
                                                        <option value="0">Selecione o inquilino</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label  class="mb-0" for="proprietarios">Proprietário</label>
                                                    <select name="proprietario" id="proprietarios" class="form-control">
                                                        <option value="0">Selecione o proprietário</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label  class="mb-0" for="imoveis">Imóvel</label>
                                                    <select name="imovel" id="imoveis" class="form-control" disabled="disabled">
                                                    </select>
                                                </div>

                                            </fieldset>

                                        </div>

                                    </div>

                                    <div class="row justify-content-center mt-3">

                                        <div class="col-xl-9">

                                            <fieldset>

                                                <legend>Dados da Locação</legend>

                                                <div class="form-row">

                                                    <div class="col-xl-6">

                                                        <div class="form-group">
                                                            <label class="mb-0" for="valorAluguel">Valor do Aluguel</label>
                                                            <input type="number" min="0" step="0,01" class="form-control" id="valorAluguel" name="valor">
                                                        </div>
                                                            
                                                    </div>

                                                    <div class="col-xl-6">

                                                        <div class="form-group">
                                                            <label class="mb-0" for="dataLocacao">Data da Locação</label>
                                                            <input type="date" class="form-control" id="dataLocacao" name="data" disabled="disabled">
                                                        </div>

                                                    </div>

                                                </div>

                                                <div class="form-row">

                                                    <div class="col-xl-4">

                                                        <div class="form-group">
                                                            <label class="mb-0" for="tempoContrato">Tempo de Contrato</label>
                                                            <input type="number" min="3" class="form-control" id="tempoContrato" name="tempo" placeholder="Tempo em meses">
                                                        </div>

                                                    </div>

                                                    <div class="col-xl-4">

                                                        <div class="form-group">
                                                            <label class="mb-0" for="inicioContrato">Início do Contrato</label>
                                                            <input type="date" min="3" class="form-control" id="inicioContrato" name="dataInicio">
                                                        </div>

                                                    </div>

                                                    <div class="col-xl-4">

                                                        <div class="form-group">
                                                            <label class="mb-0" for="terminoContrato">Termino do Contrato</label>
                                                            <input type="date" min="3" class="form-control" id="terminoContrato" name="dataTermino" disabled="disabled">
                                                        </div>

                                                    </div>

                                                </div>

                                                <div class="btnsControle mt-2 float-right">
                                                                                
                                                    <button type="submit" class="btn btn-success">
                                                        <i class="far fa-save mr-1"></i>Alugar
                                                    </button>
                    
                                                </div>
                                                    
                                            </fieldset>

                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>

        <!--Painel com as informações da locação-->
        <div id="painel-exibir">
            <div class="row justify-content-center">

                <div class="col-xl-12">
                  
                    <div class="mt-3"> 

                        <a href="#" class="btn btn-danger btn-voltar">
                            <i class="fas fa-undo-alt mr-1 btn-voltar"></i>Voltar
                        </a>

                    </div>

                    <div class="mt-3  mb-4">

                        <div class="card">

                            <div class="card-header">
                                <i class="fas fa-fw fa-table mr-1"></i>Dados da Locação
                            </div>

                            <div class="card-body">

                                <div class="row" id="exibir-dados">

                                    <div class="col-xl-6">

                                        <div class="card mt-2">

                                            <div class="card-header">
                                                <h5 class="card-title">Dados Gerais</h5>
                                            </div>

                                            <div class="card-body">

                                                <h6 class="mb-0">Inquilino</h6>
                                                <span id="inquilino">-</span>

                                                <h6 class="mt-2 mb-0">Proprietário</h6>
                                                <span id="proprietario">-</span>

                                                <h6 class="mt-2 mb-0">Endereço</h6>
                                                <span id="endereco">-</span>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="col-xl-6">

                                        <div class="card mt-2">

                                            <div class="card-header">
                                                <h5 class="card-title">Dados da Locação</h5>
                                            </div>

                                            <div class="card-body">

                                                <h6 class="mb-0">Valor do Aluguel</h6>
                                                <span id="valor">-</span>

                                                <h6 class="mt-2 mb-0">Data da Locação</h6>
                                                <span id="data">-</span>

                                                <h6 class="mt-2 mb-0">Tempo de Contrato</h6>
                                                <span id="tempo">-</span>

                                                <h6 class="mt-2 mb-0">Início de Contrato</h6>
                                                <span id="dataInicio">-</span>

                                                <h6 class="mt-2 mb-0">Término de Contrato</h6>
                                                <span id="dataTermino">-</span>

                                            </div>

                                        </div>

                                    </div>
                                
                                </div>

                            </div>

                        </div>

                    </div>
                    
                </div>

            </div>
        </div>

        <!--Painel com a relação proprietarios e inquilinos-->
        <div id="painel-prop-inq">
            <div class="row justify-content-center">
                
                <div class="col-xl-12">
                        
                    <div class="mt-3"> 

                        <a href="#" class="btn btn-danger btn-voltar">
                            <i class="fas fa-undo-alt mr-1 btn-voltar"></i>Voltar
                        </a>

                    </div>

                    <div class="mt-3 mb-3">
                        
                        <div class="card">

                            <div class="card-header">
                                <i class="fas fa-fw fa-table mr-1"></i>Proprietários e Inquilinos
                            </div>

                            <div class="card-body">

                                <div class="row mb-2">

                                    <div class="col-6">

                                        <div class="form-inline">
                                            <form id="formulario-de-busca">
                                                <input type="text" id="field-search-name" class="form-control form-control-sm" placeholder="Pesquisar...">

                                                <button type="submit" class="btn btn-primary btn-sm">
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
                                    <table class="table table-bordered">
                                        <thead class="text-center">
                                            <tr>
                                                <th scope="col">Proprietário</th>
                                                <th scope="col">Imóvel</th>
                                                <th scope="col">Inquilino</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center" id="tabelaProprietarioInquilino">
                                        </tbody>
                                        <tfoot class="text-center">
                                            <tr>
                                                <th scope="col">Proprietário</th>
                                                <th scope="col">Imóvel</th>
                                                <th scope="col">Inquilino</th>
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

    </div>
    <!--Até aqui-->

    <?php
        include_once("scripts.php");
    ?>

    <script src="js/repository/LocacaoRepository.js"></script>
    <script src="js/controller/LocacaoController.js"></script>
    <script src="js/indexLocacao.js"></script>
</body>
</html>