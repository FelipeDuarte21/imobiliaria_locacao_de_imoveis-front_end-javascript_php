class ImovelController extends BaseController{

    constructor(repositoryImovel,repositoryProprietario){
        super();
        this.imovelRepository = repositoryImovel;
        this.proprietarioRepository = repositoryProprietario;
        this.painelLista = "#painel-listar";
        this.painelCadastro = "#painel-cadastrar";
        this.painelInformacoes = "#painel-exibir";
        this.painelDisponiveis = "#painel-disponiveis";
        this.nomeSession = "imoveis";
        this.formNome = "#formulario-de-cadastro";
        this.localDados = "#exibir-dados"
        this.tableEl = document.querySelector("#lista-de-imoveis");
        this.containerDisponivel = document.querySelector("#container-imoveis-disponiveis");
        this.selectPaginas = document.querySelector("#qtdRegistros");
        this.ulPaginas = document.querySelector(".paging-system");
        this.formEl = document.querySelector(this.formNome);
        this.configuracaoNavegacao();
        this.listarImoveis();
        this.buscarPorNomeProprietario();
        this.preencherProprietario();
        this.preencherEndereco();
        this.salvarImovel();
        this.listarImoveisDisponiveis();
    }

    configuracaoNavegacao(){

        this.alternarPaineis(4);
        this.alternarPaineis(6);
        this.alternarPaineis(8);

        //Configuração do botão novo
        let btns = document.querySelectorAll(".btn-novo");
        btns.forEach(btn => {
            btn.addEventListener("click",event => {
                event.preventDefault();
                this.alternarPaineis(2);
                this.alternarPaineis(3);
            });
        });

        //Configuraçao do botão voltar
        btns = document.querySelectorAll(".btn-voltar");
        btns.forEach(btn => {
            btn.addEventListener("click",event => {
                event.preventDefault();
                this.resetarFormulario();
                this.listarImoveis();
                this.alternarPaineis(4);
                this.alternarPaineis(6);
                this.alternarPaineis(8);
                this.alternarPaineis(1);
            });
        });

        //Configuração do botão imoveis disponiveis
        btns = document.querySelectorAll(".btn-disponiveis");
        btns.forEach(btn => {
            btn.addEventListener("click",event => {
                event.preventDefault();
                this.alternarPaineis(2);
                this.alternarPaineis(7);
            });
        });

    }

    alternarPaineis(opcao){

        switch(opcao){
            case 1:
                $(this.painelLista).show('fade'); 
                break;
            case 2:
                $(this.painelLista).hide('fade');
                break;
            case 3:
                $(this.painelCadastro).show('fade');
                break;
            case 4:
                $(this.painelCadastro).hide('fade');
                break;
            case 5:
                $(this.painelInformacoes).show('fade');
                break;
            case 6:
                $(this.painelInformacoes).hide('fade');
                break;
            case 7:
                $(this.painelDisponiveis).show('fade');
                break;
            case 8:
                $(this.painelDisponiveis).hide('fade');
                break;
        }

    }

    resetarFormulario(){
        this.formEl.querySelector("input[name=idImovel]").value = 0;
        this.formEl.querySelector("input[name=disponivel]").value = true;
        this.formEl.reset();
    }

    listarImoveis(){        

        this.imovelRepository.buscarTodos(
            imoveis => {
                super.gerenciarPaginacao(imoveis,this.removerLinhas,this.addLinha,this.selectPaginas,this.ulPaginas);
            },
            error => {
                console.log(error);
            }
        );

    }

    removerLinhas = () => {
        let trs = this.tableEl.querySelectorAll("tr");
        trs.forEach(tr => {
            this.tableEl.removeChild(tr);
        });
    };

    addLinha = (imovel) => {
        
        if(!imovel) return null;
        
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${imovel.idImovel}</td>
            <td>${imovel.proprietario.nome}</td>
            <td>${super.formatoEndereco(imovel.endereco)}</td>
            <td>
                ${(imovel.disponivel) ? 
                "<span class='alert alert-success p-1'>Disponível</span>" : 
                "<span class='alert alert-danger p-1'>Alugado</span>" }
            </td>
            <td>
                <a href="#" class="btn btn-primary btn-sm mr-1 btn-editar" data-toggle="tooltip" data-placement="top" title="Alterar dados">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="btn btn-primary btn-sm mr-1 btn-informacoes" data-toggle="tooltip" title="Visualizar dados">
                    <i class="fas fa-eye"></i>
                </a>
                <button type="button" class="btn btn-danger btn-sm btn-excluir" data-toggle="tooltip" title="Excluir">
                    <i class="fa fa-trash-alt"></i>
                </button>
            </td>
        `;

        tr.dataset.imovel = JSON.stringify(imovel);

        this.tableEl.appendChild(tr);

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        this.addEventsBtns(tr);

    }

    addEventsBtns(tr){

        let imovel = JSON.parse(tr.dataset.imovel);

        //btn-informações
        let btnInformacoes = tr.querySelector(".btn-informacoes");
        this.eventBtnInformacoes(btnInformacoes,imovel);

        //btn-editar
        let btnEditar = tr.querySelector(".btn-editar");
        this.eventBtnEditar(btnEditar,imovel);
        

        //btn-excluir
        let btnExcluir = tr.querySelector(".btn-excluir");
        this.eventBtnExcluir(btnExcluir,imovel);

    }

    eventBtnInformacoes(btn,imovel){
        btn.addEventListener("click",event => {
            event.preventDefault();

            this.alternarPaineis(2);
            this.alternarPaineis(5);

            for(let attr in imovel){
                let elemento = document.querySelector(`${this.localDados} #${attr}`);
                if(elemento){
                    if(attr == "disponivel"){

                        if(imovel[attr]){
                            elemento.classList.add("alert-success");
                            imovel[attr] = "Disponível";
                        }else{
                            elemento.classList.add("alert-danger");
                            imovel[attr] = "Alugado";
                        }

                    }else if(attr == "preco"){
                        imovel[attr] =  this.utilitarios.formatoMoeda(imovel[attr]);
                    }else if(attr == "proprietario"){
                        imovel[attr] = imovel[attr].nome;
                    }else if(attr == "endereco"){
                        imovel[attr] = super.formatoEndereco(imovel[attr]);
                    }

                    elemento.innerHTML = imovel[attr];
                }
            }
            
        });
    }

    eventBtnEditar(btn,imovel){
        btn.addEventListener("click",event => {
            event.preventDefault();

            this.setValoresFormulario(imovel);

            this.alternarPaineis(2);
            this.alternarPaineis(3);
        });
    }

    setValoresFormulario(imovel){
        let campos = this.formEl.querySelectorAll("[name]");
        
        campos.forEach(campo => {
            let valor =  imovel[campo.name];
            if(valor){
                campo.value = valor;
                if(campo.name == "proprietario"){
                    campo.value = imovel[campo.name].idPessoa;
                }
            }else if(campo.name == "disponivel"){
                campo.value = valor;
            }
            if(campo.name == "cep"){
                campo.value = this.utilitarios.mascaraCep(imovel.endereco.logradouroCep.cep);
            }
        });

        //endereço
        let complemento = imovel.endereco.logradouroCep.complemento;
        if(!complemento){
            complemento = "";
        }else{
            complemento = complemento.complemento;
        }
        let endereco = {
            logradouro: imovel.endereco.logradouroCep.logradouro,
            numeroEnd: imovel.endereco.numero.numero,
            complemento: complemento,
            bairro: imovel.endereco.logradouroCep.bairro.nome,
            localidade: imovel.endereco.logradouroCep.bairro.cidade.nome,
            uf: imovel.endereco.logradouroCep.bairro.cidade.estado.nome
        }
        this.setValoresFormularioEndereco(endereco);

    }

    setValoresFormularioEndereco(endereco){

        for(let attr in endereco){
            let campo = this.formEl.querySelector(`#${attr}`);

            if(campo){

                if(attr != "cep"){
                    campo.value = endereco[attr];
                }

            }else{

                if(attr == "uf"){
                    this.formEl.querySelector("#estado").value = endereco[attr];
                }

                if(attr == "localidade"){
                    this.formEl.querySelector("#cidade").value = endereco[attr];
                }

            }

        }

    }

    eventBtnExcluir(btn,imovel){

        btn.addEventListener("click",event => {
            event.preventDefault();

            this.controleModal(1);
            
            this.controleModal(3,event => {
                event.preventDefault();

                this.imovelRepository.excluir(JSON.stringify(imovel),
                    data => {
                        this.controleModal(2);
                        this.exibirMsgSucesso(2);
                        this.listarImoveis();
                    },
                    error => {
                        this.controleModal(2);
                        this.exibirMsgErro(2);
                        console.log(error);
                    }
                );

            });

        });

    }

    controleModal(opcao,funcao = null){
        switch(opcao){
            case 1: //Mostrar
                $("#modalExcluir").modal('show');
            break;
            case 2:
                $("#modalExcluir").modal('hide');
            break;
            case 3:
                document.querySelector(".sim-excluir").addEventListener("click",event => {
                    funcao(event);
                });
            break;
        }
    }

    buscarPorNomeProprietario(){

        let nome = document.querySelector("#field-search-name");

        let reacaoEvento = (nome) => {

            if(nome){

                this.imovelRepository.buscarPorNomeProprietario(nome,
                    imoveis => {
                        super.gerenciarPaginacao(imoveis,this.removerLinhas,this.addLinha,this.selectPaginas,this.ulPaginas);
                    },
                    error => {
                        super.gerenciarPaginacao(null,this.removerLinhas,this.addLinha,this.selectPaginas,this.ulPaginas);
                        console.log(error);
                    }
                );

            }else{
                this.listarImoveis();
            }

        }

        document.querySelector("#formulario-de-busca").addEventListener("submit",event => {
            event.preventDefault();
            reacaoEvento(nome.value);
        });

        nome.addEventListener("keyup",event => {
            reacaoEvento(event.target.value);
        });
    }

    preencherProprietario(){

        let options = this.formEl.querySelector("#proprietarios").querySelectorAll("option");
        options.forEach((opts,index) => {
            if(index != 0){
                this.formEl.querySelector("#proprietarios").removeChild(opts);
            }
        });

        this.proprietarioRepository.buscarTodos(
            proprietarios => {
                let select = this.formEl.querySelector("#proprietarios");
                proprietarios.forEach(proprietario => {
                    let option = document.createElement("option");
                    option.value = proprietario.idPessoa;
                    option.innerHTML = `${proprietario.nome} - ${this.utilitarios.mascaraCPF(proprietario.cpf)}`;
                    option.dataset.proprietario = JSON.stringify(proprietario);
                    select.appendChild(option);
                });
            },
            error => {
                console.log(error);
            }
        );

    }

    preencherEndereco(){

        $(`${this.formNome} #cep`).mask("00.000-000");
        
        this.formEl.querySelector("#cep").addEventListener("blur",event => {

            let cep = this.utilitarios.desmascaraCep(event.target.value);

            this.imovelRepository.buscarEnderecoPorCEP(cep,
                endereco => {
                    this.setValoresFormularioEndereco(endereco);
                },
                erro => {
                    console.log(erro);
                }
            );

        });

    }

    salvarImovel(){

        this.formEl.addEventListener("submit",event => {
            event.preventDefault();

            let imovel = this.getValoresFormulario();

            if(!imovel) return null;

            let stringImovel = JSON.stringify(imovel);

            let sucesso  = (data) => {
                this.exibirMsgSucesso(1);
                this.resetarFormulario();
            }

            let erro = (error) => {
                console.log(error);
                this.exibirMsgErro(1);
            }

            if(imovel.idImovel){//Atualizar

                this.imovelRepository.alterar(stringImovel,
                    data => {
                        sucesso(data);
                    },
                    error => {
                        erro(error);
                    }
                );

            }else{//Cadastrar
                
                this.imovelRepository.cadastrar(stringImovel,
                    data => {
                        sucesso(data);
                    },
                    error => {
                        erro(error);
                    }
                );

            }
            
            
        });

    }

    getValoresFormulario(){

        let campos = this.formEl.querySelectorAll("[name]");

        let camposVazios = this.verificarCamposVazios(campos);

        if(!camposVazios){

            let imovel = {};
            let dadosGerais = {};
            let dadosEndereco = {};

            campos.forEach(campo => {

                let cNome = campo.name;

                if(cNome == "cep" || cNome == "estado" || cNome == "cidade" || cNome == "bairro" 
                    || cNome == "logradouro" || cNome == "numeroEnd" || cNome == "complemento"){

                    dadosEndereco[cNome] = campo.value;

                    if(cNome == "cep"){
                        dadosEndereco[cNome] = this.utilitarios.desmascaraCep(campo.value); 
                    }

                }else{

                    dadosGerais[cNome] = campo.value;

                }

            });

            for(let attr in dadosGerais){
                if(attr == "proprietario"){
                    
                    let select = this.formEl.querySelector("#proprietarios");
                    let options = select.querySelectorAll("option");
                    options.forEach(option => {
                        if(option.value == select.value){
                            imovel[attr] = JSON.parse(option.dataset.proprietario);
                        }
                    });

                }else if(attr == "idImovel") {
                    
                    if(dadosGerais[attr] != "0"){
                        imovel[attr] = dadosGerais[attr];
                    }

                }else{
                    imovel[attr] = dadosGerais[attr];
                }
            }
            imovel.endereco = {
                logradouroCep: {
                    logradouro: dadosEndereco.logradouro,
                    cep: dadosEndereco.cep,
                    bairro: {
                        nome: dadosEndereco.bairro,
                        cidade: {
                            nome: dadosEndereco.cidade,
                            estado: {
                                nome: dadosEndereco.estado
                            }
                        }
                    }
                },
                numero:{
                    numero: dadosEndereco.numeroEnd
                }
            }

            return imovel;
        }else{
            return null;
        }

    }

    verificarCamposVazios(campos){

        let erro = false;

        campos.forEach(campo => {

            if(!campo.value && campo.name != "complemento"){
                erro = true;
                campo.placeholder = "campo obrigatório!";
            }

        });

        if(erro){
            $("#alert-aviso").show('fade');
            $("#btn-alert-aviso").click(function(){
                $("#alert-aviso").hide('fade');
            });

            return true;
        }else{
            return false;
        }

    }

    exibirMsgSucesso(opcao){

        switch(opcao){
            case 1:
                $("#alert-sucesso").show('fade');
                $("#btn-alert-sucesso").click(function(){
                    $("#alert-sucesso").hide('fade');
                });
            break;
            case 2:
                $("#alert-sucesso-excluir").show('fade');
                $("#btn-alert-sucesso-excluir").click(function(){
                    $("#alert-sucesso-excluir").hide('fade');
                });
            break;
        }

    }

    exibirMsgErro(opcao){

        switch(opcao){
            case 1:
                $("#alert-erro").show('fade');
                $("#btn-alert-erro").click(function(){
                    $("#alert-erro").hide('fade');
                });
            break;
            case 2:
                $("#alert-erro-excluir").show('fade');
                $("#btn-alert-erro-excluir").click(function(){
                    $("#alert-erro-excluir").hide('fade');
                });
            break;
        }

    }

    listarImoveisDisponiveis(){

        let rmvCard = () => {
            let cartoes = this.containerDisponivel.querySelectorAll(".cartao");
            cartoes.forEach(cartao => {
                this.containerDisponivel.removeChild(cartao);
            });
        }

        let acaoComun = (imoveis) => {
            if(imoveis.length > 0){

                document.querySelector("#numero-de-imoveis-disponiveis").innerHTML = imoveis.length;
                
                $("#alerta-sem-imoveis-disponiveis").hide();
                $("#alerta-imoveis-disponiveis").show();
                
                let selectPaginas2 = document.querySelector("#qtdRegistros2");
                this.ulPaginas2 = document.querySelector(".paging-system2");

                let addCard = (imovel) => {
                    let containerCard = document.createElement("div");
                    containerCard.classList.add("col-xl-4");
                    containerCard.classList.add("cartao");

                    let card = `
                        <div class="card mt-2">
                            <div class="card-header bg-info text-light">
                                <h6 class="card-title mb-0"><i class="fas fa-money-bill-wave mr-1"></i>Valor</h6>
                                <span>${this.utilitarios.formatoMoeda(imovel.preco)}</span>
                            </div>
                            <div class="card-body">
                                <h6 class="card-title mb-0"><i class="fas fa-house-damage mr-1"></i>Endereço</h6>
                                <p class="card-text">${super.formatoEndereco(imovel.endereco)}</p>
                                <h6 class="card-title mb-0"><i class="fas fa-edit mr-1"></i>Descrição</h6>
                                <p class="card-text">${imovel.descricao}</p>
                            </div>
                            <div class="card-footer">
                                <span class="card-title mb-0 font-weight-bold"><i class="fas fa-user mr-1"></i>Proprietário:</span> 
                                <span>${imovel.proprietario.nome}</span>
                                
                            </div>
                        </div>
                    `;

                    containerCard.innerHTML = card;

                    this.containerDisponivel.appendChild(containerCard);
                };
                
                
                super.gerenciarPaginacao(imoveis,rmvCard,addCard,selectPaginas2,this.ulPaginas2);

            }
        };

        let acaoErro = () => {
            $("#alerta-imoveis-disponiveis").hide();
            rmvCard();
            $("#alerta-sem-imoveis-disponiveis").show();
        }

        this.imovelRepository.buscarDisponiveis(
            imoveis => {
               acaoComun(imoveis);
            },
            error => {
                acaoErro();
            }
        );

        let formBusca = document.querySelector("#buscar-por-preco")
        formBusca.addEventListener("submit",event => {
            event.preventDefault();

            let preco = formBusca.querySelector("#field-value").value;
            
            this.imovelRepository.buscarDisponiveisPorPreco(preco,
                imoveis => {
                    acaoComun(imoveis);
                },
                error => {
                    acaoErro();
                    rmvCard();
                }
            );

        });

    }

}