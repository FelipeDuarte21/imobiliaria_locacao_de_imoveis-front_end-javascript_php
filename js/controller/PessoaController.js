class PessoaController extends BaseController{

    static PESSOA_INQUILINO(){
        return 1;
    }

    static PESSOA_PROPRIETARIO(){
        return 2;
    }

    constructor(tipoPessoa,repository){
        super();
        this.pessoaRepository = repository;
        this.painelLista = "#painel-listar";
        this.painelCadastro = "#painel-cadastrar";
        this.painelInformacoes = "#painel-exibir";
        this.formNome = "#formulario-de-cadastro";
        this.localDados = "#exibir-dados";
        this.tableEl = document.querySelector("#lista-de-pessoas");
        this.formEl = document.querySelector(this.formNome);
        this.formBuscaEl = document.querySelector("#formulario-de-busca");
        this.contatos = this.formEl.querySelector("#contact-list");
        this.tipoPessoa = tipoPessoa;
        this.nomeTipoPessoa = (this.tipoPessoa == PessoaController.PESSOA_PROPRIETARIO()) ? "proprietarios" : "inquilinos" ;
        this.configuracaoNavegacao();
        this.listarPessoas();
        this.buscarPessoaNome();  
        this.salvarPessoa();
        this.buscarPessoaCpf();
        this.preencherEndereco();
        this.gerenciarContatos();
    }

    configuracaoNavegacao(){

        this.alternarPaineis(4);
        this.alternarPaineis(6);

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
                this.listarPessoas();
                this.alternarPaineis(4);
                this.alternarPaineis(6);
                this.alternarPaineis(1);
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
        }

    }

    resetarFormulario(){
        this.formEl.querySelector("input[name=idPessoa]").value = 0;
        let idContatos = this.formEl.querySelectorAll("input[name=idContato]");
        idContatos.forEach(campoIdContato => {
            campoIdContato.value = 0;
        });
        this.formEl.reset();
    }

    listarPessoas(){

        let pessoas = super.gerenciarSessionStore(2,this.nomeTipoPessoa);

        let paginacao = pessoas => {
            super.gerenciarPaginacao(pessoas,this.removerLinhas,this.addLinha);
        };

        if(!pessoas){

            this.pessoaRepository.buscarTodos(
                pessoas => {
                    super.gerenciarSessionStore(1,this.nomeTipoPessoa,pessoas);
                    paginacao(pessoas);
                },
                error => {
                    console.log(error);
                }
            );

        }else{
            paginacao(pessoas);
        }

    }

    removerLinhas = () => {
        let trs = this.tableEl.querySelectorAll("tr");
        trs.forEach(tr => {
            this.tableEl.removeChild(tr);
        });
    }

    addLinha = (pessoa) => {

        if(!pessoa) return null;
        
        let tr = document.createElement("tr");

        let celular;
        let telefone = null;
        pessoa.contatos.forEach(contato => {
            if(contato.tipoContato == 2){
                celular = contato.numero;
            }else if(contato.tipoContato == 1){
                telefone = contato.numero;
            }
        });

        tr.innerHTML = `
            <td>${pessoa.idPessoa}</td>
            <td>${this.utilitarios.mascaraCPF(pessoa.cpf)}</td>
            <td>${pessoa.nome}</td>
            <td>${this.utilitarios.mascaraCelular(celular)}</td>
            <td>${(telefone) == null ? "-" : this.utilitarios.mascaraTelefone(telefone)}</td>
            <td>${pessoa.email}</td>
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

        tr.dataset.pessoa = JSON.stringify(pessoa);

        this.tableEl.appendChild(tr);

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        this.addEventsBtns(tr);

    }

    addEventsBtns(tr){

        let pessoa = JSON.parse(tr.dataset.pessoa);

        //btn-informações
        let btnInformacoes = tr.querySelector(".btn-informacoes");
        this.eventBtnInformacoes(btnInformacoes,pessoa);

        //btn-editar
        let btnEditar = tr.querySelector(".btn-editar");
        this.eventBtnEditar(btnEditar,pessoa);
        

        //btn-excluir
        let btnExcluir = tr.querySelector(".btn-excluir");
        this.eventBtnExcluir(btnExcluir,pessoa);
        
    }

    eventBtnInformacoes(btn,pessoa){
        btn.addEventListener("click",event => {
            event.preventDefault();

            this.alternarPaineis(2);
            this.alternarPaineis(5);

            for(let attr in pessoa){
                let elemento = document.querySelector(`${this.localDados} #${attr}`);
                if(elemento){
                    if(attr == "dataNascimento" || attr == "dataExpedicao"){
                        pessoa[attr] = this.utilitarios.formatarData(pessoa[attr]);
                    }else if(attr == "cpf"){
                        pessoa[attr] = this.utilitarios.mascaraCPF(pessoa[attr]);
                    }else if(attr == "endereco"){
                        pessoa[attr] = super.formatoEndereco(pessoa[attr]);
                    }else if(attr == "estadoCivil"){
                        pessoa[attr] = super.formatoEstadocivil(pessoa[attr]);
                    }else if(attr == "salario"){
                        pessoa[attr] = this.utilitarios.formatoMoeda(pessoa[attr]);
                    }

                    if(attr != "contatos"){
                        elemento.innerHTML = pessoa[attr];
                    }else{

                        let divs = elemento.querySelectorAll(".contato");
                        divs.forEach(d => {
                            elemento.removeChild(d);
                        });

                        pessoa[attr].forEach(contato => {
                            let div = document.createElement("div");
                            div.className = "contato";
                            
                            let numero = "";
                            if(contato.tipoContato == 1){
                                numero = this.utilitarios.mascaraTelefone(contato.numero);
                            }else if(contato.tipoContato == 2){
                                numero = this.utilitarios.mascaraCelular(contato.numero);
                            }

                            div.innerHTML = numero;
                            elemento.appendChild(div);
                        });

                    }

                }
            }
            
        });
        
    }

    eventBtnEditar(btn,pessoa){
        btn.addEventListener("click",event => {
            event.preventDefault();

            this.setValoresFormulario(pessoa);
 
            this.alternarPaineis(2);
            this.alternarPaineis(3);
            
        });
    }

    setValoresFormulario(pessoa){
        let campos = this.formEl.querySelectorAll("[name]");
        
        campos.forEach(campo => {
            let valor =  pessoa[campo.name];
            if(valor){
                if(campo.name == "cpf"){
                    campo.value = this.utilitarios.mascaraCPF(valor);
                }else{
                    campo.value = valor;
                }
            }
            if(campo.name == "cep"){
                campo.value = this.utilitarios.mascaraCep(pessoa.endereco.logradouroCep.cep);
            }
        });

        //endereço
        let complemento = pessoa.endereco.logradouroCep.complemento;
        if(!complemento){
            complemento = "";
        }else{
            complemento = complemento.complemento;
        }
        let endereco = {
            logradouro: pessoa.endereco.logradouroCep.logradouro,
            numeroEnd: pessoa.endereco.numero.numero,
            complemento: complemento,
            bairro: pessoa.endereco.logradouroCep.bairro.nome,
            localidade: pessoa.endereco.logradouroCep.bairro.cidade.nome,
            uf: pessoa.endereco.logradouroCep.bairro.cidade.estado.nome
        }
        this.setValoresFormularioEndereco(endereco);

        //Contato
        let conts = this.contatos.querySelectorAll(".field-contact");
        for(let i=1; i < conts.length; i++){
            this.contatos.removeChild(conts[i]);
        }
        for(let i=1; i < pessoa.contatos.length; i++){
            this.addCampoNumero();
        }

        conts = this.contatos.querySelectorAll(".field-contact");
        for(let i=0; i < conts.length; i++){
            let divContato = conts[i];

            divContato.querySelector("[name=idContato]").value = pessoa.contatos[i].idContato;
           
            
            let numero = pessoa.contatos[i].numero;
            let tipoContato = pessoa.contatos[i].tipoContato;
            if(tipoContato == 1){
                numero = this.utilitarios.mascaraTelefone(numero);
            }else if(tipoContato == 2){
                numero = this.utilitarios.mascaraCelular(numero);
            }
            
            divContato.querySelector("#tipoContato").value = tipoContato;
            
            let campoNumero = divContato.querySelector("#numero");
            campoNumero.disabled = "";
            campoNumero.value = numero;

        }

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

    addCampoNumero(){
        let contato = document.createElement("div");
        contato.classList.add("form-row");
        contato.classList.add("field-contact");
        contato.classList.add("mt-1");
            
        contato.innerHTML = `
                
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
        `
        this.contatos.appendChild(contato);

        this.gerenciarMascaraContato(contato);
    }

    eventBtnExcluir(btn,pessoa){
        btn.addEventListener("click", event => {
            event.preventDefault();

            this.controleModal(1);

            this.controleModal(3,event => {
                event.preventDefault();

                this.pessoaRepository.excluir(JSON.stringify(pessoa),
                    data => {
                        this.controleModal(2);
                        this.exibirMsgSucesso(2);
                        super.gerenciarSessionStore(4,this.nomeTipoPessoa,pessoa,"idPessoa");
                        this.listarPessoas();
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

    buscarPessoaNome(){

        let campoTexto = document.querySelector("#field-search-name");

        let reacaoEvento = (nome) => {

            this.pessoaRepository.buscarPorNome(nome,
                pessoas => {
                    super.gerenciarPaginacao(pessoas,this.removerLinhas,this.addLinha);
                },
                error => {
                    super.gerenciarPaginacao(null,this.removerLinhas,this.addLinha);
                    console.log(error);
                }
            );

        }

        this.formBuscaEl.addEventListener("submit",event => {
            event.preventDefault();
            reacaoEvento(campoTexto.value); 
        });
        
        campoTexto.addEventListener("keyup",event => { 
            reacaoEvento(event.target.value);
        });

    }

    salvarPessoa(){

        this.formEl.addEventListener("submit",event => {
            event.preventDefault();
            
            let pessoa = this.getValoresFormulario();

            if(!pessoa) return null;

            let stringPessoa = JSON.stringify(pessoa);

            let sucesso  = (data) => {
                this.exibirMsgSucesso(1);
                this.resetarFormulario();
                super.gerenciarSessionStore(3,this.nomeTipoPessoa,data,"idPessoa");
            }

            let erro = (error) => {
                console.log(error);
                this.exibirMsgErro(1);
            }

            if(pessoa.idPessoa){//Atualizar

                this.pessoaRepository.alterar(stringPessoa,
                    data => {
                        sucesso(data);
                    },
                    error => {
                        erro(error);
                    }
                );

            }else{//Cadastrar
                
                this.pessoaRepository.cadastrar(stringPessoa,
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

            let dadosPessoais = {};
            let dadosEndereco = {};
            let dadosContatos = [];
            let contato = {};

            campos.forEach(campo => {

                let cNome = campo.name;
                
                if(cNome == "idContato" || cNome == "tipoContato" || cNome == "numero"){
                    
                    if(cNome == "idContato"){
                        contato = {};
                        if(campo.value != "0"){
                            contato[cNome] = campo.value;
                        }
                    }else{
                        contato[cNome] = campo.value;
                    }
                    
                    if(cNome == "numero"){

                        if(contato.tipoContato == 1){
                            contato[cNome] = this.utilitarios.desmascaraTelefone(campo.value);
                        }else if(contato.tipoContato == 2){
                            contato[cNome] = this.utilitarios.desmascaraCelular(campo.value);
                        }

                        dadosContatos.push(contato);
                        contato = null;
                    }

                }else if(cNome == "cep" || cNome == "estado" || cNome == "cidade" || cNome == "bairro" 
                    || cNome == "logradouro" || cNome == "numeroEnd" || cNome == "complemento"){

                    dadosEndereco[cNome] = campo.value;

                    if(cNome == "cep"){
                        dadosEndereco[cNome] = this.utilitarios.desmascaraCep(campo.value); 
                    }

                }else{

                    if(cNome == "idPessoa"){

                        if(campo.value != "0"){
                            dadosPessoais[cNome] = campo.value;
                        }

                    }else{

                        dadosPessoais[cNome] = campo.value;

                        if(cNome == "cpf"){
                            dadosPessoais[cNome] = this.utilitarios.desmascaraCpf(campo.value);
                        }

                        
                    }

                }

            });

            let pessoa = {};
            pessoa.tipoPessoa = this.tipoPessoa;
            for(let attr in dadosPessoais){
                pessoa[attr] = dadosPessoais[attr];
            }
            if(!pessoa.salario){
                pessoa.salario = null;
            }
            pessoa.ativo = true;
            pessoa.contatos = dadosContatos;
            pessoa.endereco = {
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
            if(dadosEndereco.complemento){
                pessoa.endereco.logradouroCep.complemento = {
                    complemento: dadosEndereco.complemento
                }
            }else{
                pessoa.endereco.logradouroCep.complemento = null;
            }
            
            return pessoa;
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

    buscarPessoaCpf(){
        $(`${this.formNome} #cpf`).mask("000.000.000-00");

        this.formEl.querySelector("#cpf").addEventListener("blur",event => {

            let cpf = this.utilitarios.desmascaraCpf(event.target.value);

            this.pessoaRepository.buscarPorCPF(cpf,
                pessoa => {
                    this.setValoresFormulario(pessoa);
                },
                error => {
                    console.log(error);
                }
            );

        });
        
    }

    preencherEndereco(){

        $(`${this.formNome} #cep`).mask("00.000-000");
        
        this.formEl.querySelector("#cep").addEventListener("blur",event => {

            let cep = this.utilitarios.desmascaraCep(event.target.value);

            this.pessoaRepository.buscarEnderecoPorCEP(cep,
                endereco => {
                    this.setValoresFormularioEndereco(endereco);
                },
                erro => {
                    console.log(erro);
                }
            );

        });
        
    }

    gerenciarContatos(){

        //primeiro campo de numero
        let contato1 = this.contatos.querySelector(".field-contact");
        this.gerenciarMascaraContato(contato1);

        //Adicionar campo de telefone/celular
        this.formEl.querySelector("#btnAddContato").addEventListener("click",event => {
            event.preventDefault();
            this.addCampoNumero();
        });

        //Excluir campos de telefone/celular
        this.formEl.querySelector("#btnRmvContato").addEventListener("click",event => {
            event.preventDefault();
            let conts = this.contatos.querySelectorAll(".field-contact");
            if(conts.length > 1){
                this.contatos.removeChild(conts[conts.length-1]);
            }
        });

    }

    gerenciarMascaraContato(contato){
        
        let select = contato.querySelector("#tipoContato");
        
        select.addEventListener("change",event => {
            
            let campoNumero = contato.querySelector("#numero");

            let opcao = parseInt(event.target.value);

            switch(opcao){
                case 0:
                    campoNumero.value = "";
                    campoNumero.disabled = "disabled";
                    break;
                case 1:
                    campoNumero.value = ""
                    campoNumero.disabled = "";
                    $(campoNumero).mask("(00) 0000-0000");
                    break;
                case 2:
                    campoNumero.value = ""
                    campoNumero.disabled = "";
                    $(campoNumero).mask("(00) 00000-0000");
                    break;
            }

        });

    }

}