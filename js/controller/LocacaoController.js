class LocacaoController extends BaseController{

    constructor(repository,proprietarioRepository,inquilinoRepository,imovelRepository){
        super();
        this.locacaoRepository = repository;
        this.proprietarioRepository = proprietarioRepository;
        this.inquilinoRepository = inquilinoRepository;
        this.imovelRepository = imovelRepository;
        this.painelLista = "#painel-listar";
        this.painelCadastro = "#painel-cadastrar";
        this.painelInformacoes = "#painel-exibir";
        this.painelPropInq = "#painel-prop-inq";
        this.formNome = "#formulario-de-cadastro";
        this.localDados = "#exibir-dados";
        this.tableEl = document.querySelector("#lista-de-locacoes");
        this.formEl = document.querySelector(this.formNome);
        this.selectPaginas = document.querySelector("#qtdRegistros");
        this.ulPaginas = document.querySelector(".paging-system");
        this.nomeSession = "locações";
        this.configuracaoNavegacao();
        this.listarLocacoes();
        this.preencherInquilino();
        this.preencherProprietario();
        this.preencherDataEInicioLocacao();
        this.calcularTerminoContrato();
        this.salvarLocacao();
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
                this.listarLocacoes();
                this.alternarPaineis(4);
                this.alternarPaineis(6);
                this.alternarPaineis(8);
                this.alternarPaineis(1);
            });
        });

        btns = document.querySelectorAll(".btn-prop-inq");
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
                $(this.painelPropInq).show('fade');
                break;
            case 8:
                $(this.painelPropInq).hide('fade');
        }

    }

    resetarFormulario(){
        this.formEl.querySelector("input[name=idLocacao]").value = 0;
        this.formEl.querySelector("#inquilinos").disabled = "";
        this.formEl.querySelector("#proprietarios").disabled = "";
        let options = this.formEl.querySelector("#imoveis").querySelectorAll("option");
        options.forEach((opts,index) => {
            this.formEl.querySelector("#imoveis").removeChild(opts);
        });
        this.formEl.reset();
        this.preencherDataEInicioLocacao();
    }

    listarLocacoes(){

        let locacoes = super.gerenciarSessionStore(2,this.nomeSession);

        let paginacao = locacoes => {
            super.gerenciarPaginacao(locacoes,this.removerLinhas,this.addLinha,this.selectPaginas,this.ulPaginas);
        };

        if(!locacoes){

            this.locacaoRepository.buscarTodos(
                locacoes => {
                    super.gerenciarSessionStore(1,this.nomeSession,locacoes)
                    paginacao(locacoes);
                },
                error => {
                    console.log(error);
                }
            );

        }else{
            paginacao(locacoes);
        }

    }

    removerLinhas = () => {
        let trs = this.tableEl.querySelectorAll("tr");
        trs.forEach(tr => {
            this.tableEl.removeChild(tr);
        });
    }

    addLinha = (locacao) => {

        if(!locacao) return null;
        
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${locacao.idLocacao}</td>
            <td>${locacao.inquilino.nome}</td>
            <td>${super.formatoEndereco(locacao.imovel.endereco)}</td>
            <td>${locacao.imovel.proprietario.nome}</td>
            <td>${this.utilitarios.formatarData(locacao.data)}</td>
            <td>${this.utilitarios.formatoMoeda(locacao.valor)}</td>
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

        tr.dataset.locacao = JSON.stringify(locacao);

        this.tableEl.appendChild(tr);

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        this.addEventsBtns(tr);
    }

    addEventsBtns(tr){

        let locacao = JSON.parse(tr.dataset.locacao);

        let btnInformacoes = tr.querySelector(".btn-informacoes");
        this.eventBtnInformacoes(btnInformacoes,locacao);

        let btnEditar = tr.querySelector(".btn-editar");
        this.eventBtnEditar(btnEditar,locacao);

        let btnExcluir = tr.querySelector(".btn-excluir");
        this.eventBtnExcluir(btnExcluir,locacao);
        
    }

    eventBtnInformacoes(btn, locacao){
        btn.addEventListener("click", event => {
            event.preventDefault();

            this.alternarPaineis(2);
            this.alternarPaineis(5);

            for(let attr in locacao){
                let elemento = document.querySelector(`${this.localDados} #${attr}`);

                if(elemento){

                    if(attr == "inquilino"){
                        locacao[attr] = locacao.inquilino.nome;
                    }else if(attr == "valor"){
                        locacao[attr] = this.utilitarios.formatoMoeda(locacao[attr]);
                    }else if(attr == "data" || attr == "dataInicio" || attr == "dataTermino"){
                        locacao[attr] = this.utilitarios.formatarData(locacao[attr]);
                    }else if(attr == "tempo"){
                        locacao[attr] = `${locacao[attr]} meses`;
                    }

                    elemento.innerHTML = locacao[attr];

                }

                if(attr == "imovel"){
                    document.querySelector(`${this.localDados} #proprietario`).innerHTML = locacao.imovel.proprietario.nome;
                    document.querySelector(`${this.localDados} #endereco`).innerHTML = super.formatoEndereco(locacao.imovel.endereco);
                }

            }

        });

    }

    eventBtnEditar(btn, locacao){
        btn.addEventListener("click",event => {
            event.preventDefault();

            this.setValoresFormulario(locacao);

            this.alternarPaineis(2);
            this.alternarPaineis(3);
        });
    }

    setValoresFormulario(locacao){
        let campos = this.formEl.querySelectorAll("[name]");

        campos.forEach(campo => {
            let valor = locacao[campo.name];

            if(valor){
                campo.value = valor;
                if(campo.name == "inquilino"){
                    campo.value = locacao[campo.name].idPessoa;
                    campo.disabled = "disabled";
                }

                if(campo.name == "imovel"){
                    let option = document.createElement("option");
                    option.value = locacao[campo.name].idImovel;
                    option.dataset.imovel = JSON.stringify(locacao[campo.name]);
                    option.innerHTML = this.formatoEndereco(locacao[campo.name].endereco);
                    campo.appendChild(option);
                    campo.disabled = "disabled";
                }

            }else if(campo.name == "proprietario"){
                campo.value = locacao["imovel"].proprietario.idPessoa;
                campo.disabled = "disabled";
            }

        });
       
    }

    eventBtnExcluir(btn,locacao){

        btn.addEventListener("click",event => {
            event.preventDefault();

            this.controleModal(1);

            this.controleModal(3,event => {
                event.preventDefault();

                this.locacaoRepository.excluir(JSON.stringify(locacao),
                    data => {
                        this.controleModal(2);
                        this.exibirMsgSucesso(2);
                        super.gerenciarSessionStore(4,this.nomeSession,locacao,"idLocacao");
                        this.listarLocacoes();
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

    preencherInquilino(){

        let options = this.formEl.querySelector("#inquilinos").querySelectorAll("option");
        options.forEach((opts,index) => {
            if(index != 0){
                this.formEl.querySelector("#inquilinos").removeChild(opts);
            }
        });

        this.inquilinoRepository.buscarTodos(
            inquilinos => {
                let select = this.formEl.querySelector("#inquilinos");
                inquilinos.forEach(inquilino => {
                    let option = document.createElement("option");
                    option.value = inquilino.idPessoa;
                    option.innerHTML = `${inquilino.nome} - ${this.utilitarios.mascaraCPF(inquilino.cpf)}`;
                    option.dataset.inquilino = JSON.stringify(inquilino);
                    select.appendChild(option);
                });
            },
            error => {
                console.log(error);
            }
        );

    }

    preencherProprietario(){

        let elemento = this.formEl.querySelector("#proprietarios"); 
        let options = elemento.querySelectorAll("option");
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

        elemento.addEventListener("change",event=>{
            this.preencherImovel(event.target.value);
        });

    }

    preencherImovel(proprietario){

        let elemento = this.formEl.querySelector("#imoveis");

        let removerElementos = () => {

            let options = elemento.querySelectorAll("option");
            options.forEach((opts,index) => {
                this.formEl.querySelector("#imoveis").removeChild(opts);
            });

            elemento.disabled = "disabled";

        }

        this.imovelRepository.buscarPorIdProprietario(proprietario,
            imoveis => {

                let select = this.formEl.querySelector("#imoveis");

                let possui = false;

                imoveis.forEach(imovel => {
                    if(imovel.disponivel){
                        possui = true;
                    }
                });

                if(possui){
                    removerElementos();

                    let option = document.createElement("option");
                    option.value = "0";
                    option.innerHTML = "selecione um imóvel";
                    select.appendChild(option);

                    imoveis.forEach(imovel => {

                        if(imovel.disponivel){
                            option = document.createElement("option");
                            option.value = imovel.idImovel;
                            option.innerHTML = `${super.formatoEndereco(imovel.endereco)}`;
                            option.dataset.imovel = JSON.stringify(imovel);
                            select.appendChild(option);
                        }
    
                    });

                    select.disabled = "";

                }else{
                    removerElementos();
                    select.disabled = "disabled";
                }

            },
            error => {
                console.log(error);
                removerElementos();
            }
        );

        elemento.addEventListener("change",event => {
            this.preencherValorImovel(event.target.value);
        });

    }

    preencherValorImovel(idImovel){

        let elemento = this.formEl.querySelector("#valorAluguel");
        
        this.imovelRepository.buscarPorId(idImovel,
            imovel => {
                
                elemento.value = imovel.preco;

            },
            error => {
                console.log(error);
                elemento.value = 0;
            }
        );

    }

    preencherDataEInicioLocacao(){
        let dataLocacao = this.formEl.querySelector("#dataLocacao");
        let dataInicio = this.formEl.querySelector("#inicioContrato");

        let date = new Date();

        let dia = date.getDate();
        if(dia < 10){
            dia = `0${dia}`;
        }

        let mes = date.getMonth()+1;
        if(mes < 10){
            mes = `0${mes}`;
        }

        let hoje = `${date.getFullYear()}-${mes}-${dia}`;

        dataLocacao.value = hoje;
        dataInicio.value = hoje;

    }

    calcularTerminoContrato(){

        let elemento = this.formEl.querySelector("#tempoContrato");

        let eventos = ["change","click"];
        
        eventos.forEach(evt => {

            elemento.addEventListener(evt,event => {
            
                let tempo = parseInt(event.target.value);
    
                let dataInicio = this.formEl.querySelector("#inicioContrato").value;
                dataInicio = new Date(`${dataInicio} 00:00:00`);
    
                let dataTermino = new Date();
                dataTermino.setDate(dataInicio.getDate());
                dataTermino.setMonth(dataInicio.getMonth()+tempo);
                dataTermino.setFullYear(dataTermino.getFullYear());
    
                let mes = dataTermino.getMonth()+1;
                if(mes < 10){
                    mes = `0${mes}`;
                }
    
                let dia = dataTermino.getDate();
                if(dia < 10){
                    dia = `0${dia}`;
                }
    
                dataTermino = `${dataTermino.getFullYear()}-${mes}-${dia}`;
    
                let fieldDataTermino = this.formEl.querySelector("#terminoContrato");
                fieldDataTermino.value = dataTermino;
    
            });

        });

    }

    salvarLocacao(){
        this.formEl.addEventListener("submit",event => {
            event.preventDefault();

            let locacao = this.getValoresFormulario();

            if(!locacao) return null;

            let stringLocacao = JSON.stringify(locacao);

            let sucesso  = (data) => {
                this.exibirMsgSucesso(1);
                this.resetarFormulario();
                super.gerenciarSessionStore(3,this.nomeSession,data,"idLocacao");
            }

            let erro = (error) => {
                console.log(error);
                this.exibirMsgErro(1);
            }

            if(locacao.idLocacao){//Atualizar

                this.locacaoRepository.alterar(stringLocacao,
                    data => {
                        sucesso(data);
                    },
                    error => {
                        erro(error);
                    }
                );

            }else{//Cadastrar

                this.locacaoRepository.cadastrar(stringLocacao,
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

            let locacao = {};

            campos.forEach(campo => {

                if((campo.name == "idLocacao") || (campo.name == "proprietario")){

                    if(campo.name != "proprietario"){

                        if(campo.value != "0"){
                            locacao[campo.name] = campo.value;
                        }

                    }

                }else{

                    let value;

                    let valorSelect = elemento => {

                        let select = this.formEl.querySelector(`[name = ${elemento}]`);
                        let options = select.querySelectorAll("option");
                        options.forEach(option => {
                            if(option.value == select.value){
                                value = JSON.parse(eval(`option.dataset.${elemento}`));
                            }
                        });

                    };
                    
                    if(campo.name == "inquilino" || campo.name == "imovel"){
                        valorSelect(campo.name);
                    }else{
                        value = campo.value;
                    }

                    locacao[campo.name] = value;

                }
                
            });

            return locacao;
        }else{
            return null;
        }

    }

    verificarCamposVazios(campos){

        let erro = false;

        campos.forEach(campo => {

            if(!campo.value || campo.value == "0"){
                if(campo.name != "idLocacao"){
                    console.log(`${campo.name} - ${campo.value}`);
                    erro = true;
                }
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

}