<?php
    include_once("cabecalhoPrincipal.php");
    include_once("cabecalhoAluguel.php");
?>

    <!--Conteúdo da Página-->
    <div class="container-fluid">

        <!--Mostra os proprietarios, painel principal -->
        <div id="painel-listar">
            <div class="row justify-content-center">

                <div class="col-xl-12">
                    
                    <!--Botões de acesso aos outros paineis-->
                    <div class="mt-3">
                                
                        <a href="#" class="btn btn-primary btn-novo" data-toggle="tooltip" data-placement="right" title="Cadastrar Proprietário">
                            <i class="fas fa-user-plus mr-1 btn-novo"></i>Novo
                        </a>

                    </div>

                    <div class="alert alert-success mt-3 collapse" id="alert-sucesso-excluir">
                        <strong>Sucesso!</strong> proprietário excluído com sucesso!
                        <button type="button" class="close" id="btn-alert-sucesso-excluir">&times;</button>
                    </div>
    
                    <div class="alert alert-danger mt-3 collapse" id="alert-erro-excluir">
                        <strong>Erro!</strong> erro ao excluir proprietário!
                        <button type="button" class="close" id="btn-alert-erro-excluir">&times;</button>
                    </div>

                    <div class="modal fade" id="modalExcluir" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <p class="font-weight-bold">Confirmação</p>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p>Deseja realmente excluir esse proprietário?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary sim-excluir">
                                        <i class="far fa-check-circle mr-1"></i>Sim
                                    </button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Não">
                                        <i class="fas fa-times-circle mr-1"></i>Não
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 mb-4">
            
                        <div class="card">
                                                
                            <div class="card-header">
                                <i class="fas fa-fw fa-table mr-1"></i>Lista de Proprietários
                            </div>
                                                
                            <div class="card-body">

                                <div class="row mb-2">

                                    <div class="col-6">
            
                                        <div class="form-inline">
                                            <form id="formulario-de-busca">
                                                <input type="text" id="field-search-name" class="form-control form-control-sm" placeholder="Pesquisar por nome...">
            
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
                                                <th scope="col">CPF</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Celular</th>
                                                <th scope="col">Telefone</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Selecionar</th>
                                            </tr>
                                        </thead>
                                            
                                        <tbody class="text-center" id="lista-de-pessoas"> 
                                            <!--Lista dos Proprietários-->
                                        </tbody>
                                            
                                        <tfoot>
                                            <tr class="text-center">
                                                <th scope="col">Id</th>
                                                <th scope="col">CPF</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Celular</th>
                                                <th scope="col">Telefone</th>
                                                <th scope="col">Email</th>
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

        <!--Painel de formulário de cadastro de proprietario-->
        <div id="painel-cadastrar">
            <div class="row justify-content-center mb-3" >

                <div class="col-xl-12">

                    <div class="mt-3"> 

                        <a href="#" class="btn btn-danger btn-voltar">
                            <i class="fas fa-undo-alt mr-1 btn-voltar"></i>Voltar
                        </a>
                
                    </div>

                    <div class="mt-3 mb-4">
                            
                        <div class="card">
                                
                            <div class="card-header">
                                <i class="fas fa-user-plus mr-1"></i>Cadastro/Alteração de Proprietário
                            </div>
                                
                            <div class="card-body">
                                                        
                                <form id="formulario-de-cadastro">
            
                                    <div class="row justify-content-center mt-3">
                                        <div class="col-xl-9">
                                            <fieldset>
                                                <legend>Dados Pessoais</legend>
                                            
                                                <div class="form-row">
            
                                                    <input type="hidden" name="idPessoa" value="0">
            
                                                    <div class="form-group col-xl-3">
                                                        <label for="cpf" class="mb-1">CPF</label>
                                                        <input type="text" name="cpf" id="cpf" class="form-control">
                                                    </div>
                                            
                                                    <div class="form-group col-xl-9">
                                                        <label for="nome" class="mb-1">Nome</label>
                                                        <input type="text" name="nome" id="nome" class="form-control">
                                                    </div>
            
                                                </div>
                                            
                                                <div class="form-row">
            
                                                    <div class="form-group col-xl-4">
                                                        <label for="nacionalidade" class="mb-1">Nacionalidade</label>
                                                        <input type="text" name="nacionalidade" id="nacionalidade" class="form-control">
                                                    </div>
                                            
                                                    <div class="form-group col-xl-4">
                                                        <label for="dataNascimento" class="mb-1">Data de Nascimento</label>
                                                        <input type="date" name="dataNascimento" id="dataNascimento" class="form-control">
                                                    </div>
                                                                                    
                                                    <div class="form-group col-xl-4">
                                                        <label for="estadoCivil" class="mb-1">Estado Civil</label>
                                                        <select name="estadoCivil" id="estadoCivil" class="form-control">
                                                            <option value="0" selected="selected">Selecionar</option>
                                                            <option value="1">Solteiro(a)</option>
                                                            <option value="2">Casado(a)</option>
                                                            <option value="3">Separado(a)</option>
                                                            <option value="4">Divorciado(a)</option>
                                                            <option value="5">Viúvo(a)</option>
                                                        </select>
                                                    </div>
            
                                                </div>
                                            
                                                <div class="form-row">
            
                                                    <div class="form-group col-xl-3">
                                                        <label for="identidade" class="mb-1">RG</label>
                                                        <input type="text" name="identidade" id="identidade" class="form-control">
                                                    </div>
            
                                                    <div class="form-group col-xl-4">
                                                        <label for="orgaoEmissor" class="mb-1">Orgão Emissor</label>
                                                        <input type="text" name="orgaoEmissor" id="orgaoEmissor" class="form-control">
                                                    </div>
                                                
                                                    <div class="form-group col-xl-5">
                                                        <label for="dataExpedicao" class="mb-1">Data de Expedição</label>
                                                        <input type="date" name="dataExpedicao" id="dataExpedicao" class="form-control">
                                                    </div>
            
                                                </div>
            
                                            </fieldset>
                                        </div>
                                    </div>
                                        
                                    <div class="row justify-content-center mt-3">
                                        <div class="col-xl-9">
                                            <fieldset>
                                                <legend>Endereço</legend>
                                        
                                                <div class="form-row">
                                                                
                                                    <div class="form-group col-xl-4">
                                                        <label for="cep" class="mb-1">CEP</label>
                                                        <input type="text" name="cep" id="cep" class="form-control">
                                                    </div>
                                        
                                                    <div class="form-group col-xl-2">
                                                        <label for="estado" class="mb-1">Estado</label>
                                                        <input type="text" name="estado" id="estado" class="form-control" max="2">
                                                    </div>
                                        
                                                    <div class="form-group col-xl-6">
                                                        <label for="cidade" class="mb-1">Cidade</label>
                                                        <input type="text" name="cidade" id="cidade" class="form-control">
                                                    </div>
            
                                                </div>
                                        
                                                <div class="form-row">
            
                                                    <div class="form-group col-xl-3">
                                                        <label for="bairro" class="mb-1">Bairro</label>
                                                        <input type="text" name="bairro" id="bairro" class="form-control">
                                                    </div>
                                        
                                                    <div class="form-group col-xl-7">
                                                        <label for="logradouro" class="mb-1">Logradouro</label>
                                                        <input type="text" name="logradouro" id="logradouro" class="form-control">
                                                    </div>
                                        
                                                    <div class="form-group col-xl-2">
                                                        <label for="numeroEnd" class="mb-1">Número</label>
                                                        <input type="text" name="numeroEnd" id="numeroEnd" class="form-control">
                                                    </div>
                                        
                                                </div>
                                        
                                                <div class="form-group">
                                                    <label for="complemento" class="mb-1">Complemento</label>
                                                    <input type="text" name="complemento" id="complemento" class="form-control">
                                                </div>
            
                                            </fieldset>
                                        </div> 
                                    </div>
                                        
                                    <div class="row justify-content-center mt-3">
            
                                        <div class="col-xl-9"> 
                                            <fieldset>
                                                <legend>Contatos</legend>
                                        
                                                <div class="form-group">
                                                    <label for="email" class="mb-1">Email</label>
                                                    <input type="email" name="email" id="email" class="form-control">
                                                </div>
            
                                                <div class="mt-2">
                                                    <button type="button" class="btn btn-primary btn-sm" id="btnAddContato" data-toggle="tooltip" data-placement="top" title="Adicionar campo de contato">
                                                        <i class="far fa-plus-square"></i>
                                                    </button>
            
                                                    <button type="button" class="btn btn-danger btn-sm" id="btnRmvContato" data-toggle="tooltip" data-placement="top" title="Remover campo de contato">
                                                        <i class="far fa-minus-square"></i>
                                                    </button>
                                                </div>
            
                                                <div id="contact-list" class="mt-2">
            
                                                    <div class="form-row field-contact">
            
                                                        <input type="hidden" name="idContato" value="0">
            
                                                        <div class="col-xl-3">
                                                            <label for="tipoContato" class="mb-1">Tipo do Número</label>
                                                            <select name="tipoContato" class="form-control" id="tipoContato">
                                                                <option value="0" selected="selected">Selecionar</option>
                                                                <option value="1">Telefone</option>
                                                                <option value="2">Celular</option>
                                                            </select>
                                                        </div>
                                        
                                                        <div class="col-xl-3">
                                                            <label for="numero" class="mb-1">Numero</label>
                                                            <input type="text" name="numero" id="numero" class="form-control" disabled="disabled">
                                                        </div>
                                                                
                                                    </div>
            
                                                </div>
                                        
                                                <div class="mt-2 float-right">
                                                                                        
                                                    <button type="submit" class="btn btn-success">
                                                        <i class="far fa-save mr-1"></i>Salvar
                                                    </button>
                            
                                                </div>
            
                                            </fieldset>
                                        </div>
                                                    
                                    </div>
            
                                </form>
            
                            </div>
                            
                        </div>
            
                    </div>

                    <div class="alert alert-success mt-3 collapse" id="alert-sucesso">
                        <strong>Sucesso!</strong> proprietário salvo/atualizado com sucesso!
                        <button type="button" class="close" id="btn-alert-sucesso">&times;</button>
                    </div>

                    <div class="alert alert-danger mt-3 collapse" id="alert-erro">
                        <strong>Erro!</strong> erro ao salvar/atualizar proprietário!
                        <button type="button" class="close" id="btn-alert-erro">&times;</button>
                    </div>

                    <div class="alert alert-warning mt-3 collapse" id="alert-aviso">
                        <strong>Aviso!</strong> Campos vazios, por favor, preencha os campos obrigatórios!
                        <button type="button" class="close" id="btn-alert-aviso">&times;</button>
                    </div>
            
                </div>
            
            </div>
        </div>

        <!--Painel com as informações do Proprietário-->
        <div id="painel-exibir">
            <div class="row justify-content-center mb-3">

                <div class="col-xl-12">

                    <div class="mt-3"> 

                        <a href="#" class="btn btn-danger btn-voltar">
                            <i class="fas fa-undo-alt mr-1 btn-voltar"></i>Voltar
                        </a>
                        
                    </div>
            
                    <div class="mt-3 mb-4">
            
                        <div class="card">
                                                
                            <div class="card-header">
                                <i class="fas fa-fw fa-table mr-1"></i>Dados do Proprietário
                            </div>
                                                
                            <div class="card-body">
            
                                <div class="mt-1 mb-1">
            
                                    <div class="row" id="exibir-dados">
            
                                        <div class="col-xl-8">
            
                                            <div class="card mt-1">
                                                    
                                                <div class="card-header">
                                                    <h5 class="card-title">Dados Pessoais</h5>
                                                </div>
                                                    
                                                <div class="card-body">
                                                    <h6 class="mb-0">Nome</h6>
                                                    <span id="nome">-</span>
            
                                                    <h6 class="mt-2 mb-0">Nacionalidade</h6>
                                                    <span id="nacionalidade">-</span>
            
                                                    <h6 class="mt-2 mb-0">Data de Nascimento</h6>
                                                    <span id="dataNascimento">-</span>
                                                                        
                                                    <h6 class="mt-2 mb-0">Estado Civil</h6>
                                                    <span id="estadoCivil">-</span>
            
                                                    <h6 class="mt-2 mb-0">CPF</h6>
                                                    <span id="cpf">-</span>
            
                                                    <h6 class="mt-2 mb-0">RG</h6>
                                                    <span id="identidade">-</span>
            
                                                    <h6 class="mt-2 mb-0">Orgão Emissor</h6>
                                                    <span id="orgaoEmissor">-</span>
            
                                                    <h6 class="mt-2 mb-0">Data de Expedição</h6>
                                                    <span id="dataExpedicao">-</span>
            
                                                    <h6 class="mt-2 mb-0">Endereço</h6>
                                                    <span id="endereco">-</span>
                                                </div>
            
                                            </div>
                                                            
                                        </div>
            
                                        <div class="col-xl-4">
            
                                            <div class="card mt-1">
                                                    
                                                <div class="card-header">
                                                    <h5 class="card-title">Contatos</h5>
                                                </div>
                                                    
                                                <div class="card-body">
                                                    <h6 class="mb-0">Email</h6>
                                                    <span id="email">-</span>
            
                                                    <h6 class="mt-2 mb-0">Número de Telefone/Celular</h6>
                                                    <div id="contatos">
                                                        <div class="contato">-</div>
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
            
            </div>
        </div>
    
    </div>
    <!--Até aqui!-->
    
    
    <?php
        include_once("scripts.php");
    ?>

    <script src="js/repository/PessoaRepository.js"></script>
    <script src="js/repository/ProprietarioRepository.js"></script>
    <script src="js/controller/PessoaController.js"></script>
    <script src="js/indexProprietario.js"></script>
</body>
</html>