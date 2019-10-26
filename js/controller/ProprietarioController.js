class ProprietarioController{

    constructor(){
        this.utilitarios = new Utilitarios();
        this.proprietarioRepository = new ProprietarioRepository();
        this.tableEl = document.querySelector("#list-of-owners");
        this.formEl = document.querySelector("#owner-form");
        this.contatos = this.formEl.querySelector("#contact-list");
        this.configuracaoNavegacao();
        this.listarProprietarios();
        this.buscarProprietariosNome();  
        this.salvarProprietario();
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
                this.listarProprietarios();
                this.alternarPaineis(4);
                this.alternarPaineis(6);
                this.alternarPaineis(1);
            });
        });
        
    }

    alternarPaineis(opcao){

        switch(opcao){
            case 1:
                $("#painel-lista-proprietarios").show('fade'); 
                break;
            case 2:
                $("#painel-lista-proprietarios").hide('fade');
                break;
            case 3:
                $("#painel-cadastro-proprietario").show('fade');
                break;
            case 4:
                $("#painel-cadastro-proprietario").hide('fade');
                break;
            case 5:
                $("#painel-informacoes-proprietarios").show('fade');
                break;
            case 6:
                $("#painel-informacoes-proprietarios").hide('fade');
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

    listarProprietarios(){

        let props = this.gerenciarLocalStore(2);

        let chamarPaginacao = proprietarios => {
            this.gerenciarPaginacao(proprietarios);
        };

        if(!props){

            this.proprietarioRepository.getProprietarios(
                proprietarios => {
                    this.gerenciarLocalStore(1,proprietarios);
                    chamarPaginacao(proprietarios);
                },
                erro => {
                    console.log(erro);
                }
            );

        }else{
            chamarPaginacao(props);
        }

    }

    gerenciarLocalStore(opcao,proprietario = null){

        let retorno;

        let proprietarios;

        switch(opcao){
            case 1://Colocar
                localStorage.setItem("proprietarios",JSON.stringify(proprietario));
            break;
            case 2: //Pegar
                retorno = localStorage.getItem("proprietarios");
                if(retorno){
                    retorno = JSON.parse(retorno);
                }
            break;
            case 3: //Atualizar
                proprietarios = this.gerenciarLocalStore(2);

                let achou = false;
                proprietarios.forEach((prop,index) => {
                    if(prop.idPessoa == proprietario.idPessoa){
                        proprietarios[index] = proprietario;
                        achou = true;
                    }
                });

                if(!achou){
                    proprietarios.push(proprietario);
                }

                this.gerenciarLocalStore(1,proprietarios);
            break;
            case 4: //Excluir
                proprietarios = this.gerenciarLocalStore(2);

                let propsNovo = [];
        
                proprietarios.forEach(prop => {
                    if(prop.idPessoa != proprietario.idPessoa){
                        propsNovo.push(prop);
                    }
                });
        
                this.gerenciarLocalStore(1,propsNovo);
            break;
        }

        return retorno;
    }

    gerenciarPaginacao(proprietarios){

        if(proprietarios){

            let selectPaginacao = document.querySelector("#qtdRegistros");

            selectPaginacao.addEventListener("change",event=> { 
                
                let qtdRegistros = parseInt(event.target.value);
                let qtdProprietarios = proprietarios.length;
                let qtdExibida = parseInt(qtdProprietarios/qtdRegistros);
                let sobraDivisao = parseInt(qtdProprietarios % qtdRegistros);
                if(sobraDivisao > 0){
                    qtdExibida++;
                }

                let divPaginacao = document.querySelector(".paging-system");

                let lis = divPaginacao.querySelectorAll("li");
                lis.forEach(li => {
                    divPaginacao.removeChild(li);
                });

                for(let i=0; i < qtdExibida; i++){

                    let li = document.createElement("li");
                    li.classList.add("page-item");

                    let de = i*qtdRegistros;
                    let ate = (de + qtdRegistros) - 1;
                    if(ate > qtdProprietarios){
                        ate = qtdProprietarios - 1;
                    }

                    let link = `<a href="#" class="page-link btn-pagina" data-de="${de}" data-ate="${ate}">${i+1}</a>`;

                    li.innerHTML = link;

                    divPaginacao.appendChild(li);

                }

                let linksPagina = document.querySelectorAll(".btn-pagina");
                
                linksPagina.forEach(linkPagina => {

                    linkPagina.addEventListener("click",event => {
                        event.preventDefault();

                        let lis = divPaginacao.querySelectorAll("li");
                        lis.forEach(li => {
                            li.classList.remove("active");
                        });
                        event.target.parentElement.classList.add("active");

                        let comeco = parseInt(linkPagina.dataset.de);
                        let fim = parseInt(linkPagina.dataset.ate);

                        this.removerLinhas();
                        for(let i = comeco; i <= fim; i++){
                            this.addLinha(proprietarios[i]);
                        }

                    });

                });

                $(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });

                linksPagina[0].dispatchEvent(new Event("click"));

            });

            selectPaginacao.dispatchEvent(new Event("change"));
        }else{
            this.removerLinhas();
        }
    }

    removerLinhas(){
        let trs = this.tableEl.querySelectorAll("tr");
        trs.forEach(tr => {
            this.tableEl.removeChild(tr);
        });
    }

    addLinha(proprietario){

        if(!proprietario) return null;
        
        let tr = document.createElement("tr");

        let celular;
        let telefone = null;
        proprietario.contatos.forEach(contato => {
            if(contato.tipoContato == 2){
                celular = contato.numero;
            }else if(contato.tipoContato == 1){
                telefone = contato.numero;
            }
        });

        tr.innerHTML = `
            <td>${proprietario.idPessoa}</td>
            <td>${this.utilitarios.mascaraCPF(proprietario.cpf)}</td>
            <td>${proprietario.nome}</td>
            <td>${this.utilitarios.mascaraCelular(celular)}</td>
            <td>${(telefone) == null ? "-" : this.utilitarios.mascaraTelefone(telefone)}</td>
            <td>${proprietario.email}</td>
            <td>
                <a href="#" class="btn btn-primary btn-sm mr-1 btn-editar" data-toggle="tooltip" data-placement="top" title="Alterar dados do Proprietário">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="btn btn-primary btn-sm mr-1 btn-informacoes" data-toggle="tooltip" title="Visualizar dados do Proprietário">
                    <i class="fas fa-eye"></i>
                </a>
                <button type="button" class="btn btn-danger btn-sm btn-excluir" data-toggle="tooltip" title="Excluir Proprietário">
                    <i class="fa fa-trash-alt"></i>
                </button>
            </td>
        `;

        tr.dataset.proprietario = JSON.stringify(proprietario);

        this.tableEl.appendChild(tr);

        this.addEventsBtns(tr);

    }

    addEventsBtns(tr){

        let proprietario = tr.dataset.proprietario;

        //btn-informações
        let btnInformacoes = tr.querySelector(".btn-informacoes");
        this.eventBtnInformacoes(btnInformacoes,proprietario);

        //btn-editar
        let btnEditar = tr.querySelector(".btn-editar");
        this.eventBtnEditar(btnEditar,proprietario);
        

        //btn-excluir
        let btnExcluir = tr.querySelector(".btn-excluir");
        this.eventBtnExcluir(btnExcluir,proprietario);
        
    }

    eventBtnInformacoes(btn,informacoes){
        btn.addEventListener("click",event => {
            event.preventDefault();

            this.alternarPaineis(2);
            this.alternarPaineis(5);

            let proprietario = JSON.parse(informacoes);

            for(let attr in proprietario){
                let elemento = document.querySelector(`#datas-owner #${attr}`);
                if(elemento){
                    if(attr == "dataNascimento" || attr == "dataExpedicao"){
                        proprietario[attr] = this.utilitarios.formatarData(proprietario[attr]);
                    }else if(attr == "cpf"){
                        proprietario[attr] = this.utilitarios.mascaraCPF(proprietario[attr]);
                    }else if(attr == "endereco"){
                        proprietario[attr] = this.utilitarios.formatoEndereco(proprietario[attr]);
                    }else if(attr == "estadoCivil"){
                        proprietario[attr] = this.utilitarios.formatoEstadocivil(proprietario[attr]);
                    }

                    if(attr != "contatos"){
                        elemento.innerHTML = proprietario[attr];
                    }else{

                        let divs = elemento.querySelectorAll(".contato");
                        divs.forEach(d => {
                            elemento.removeChild(d);
                        });

                        proprietario[attr].forEach(contato => {
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

    eventBtnEditar(btn,proprietario){
        btn.addEventListener("click",event => {
            event.preventDefault();

            this.setValoresFormulario(JSON.parse(proprietario));
 
            this.alternarPaineis(2);
            this.alternarPaineis(3);
            
        });
    }

    setValoresFormulario(proprietario){
        let campos = this.formEl.querySelectorAll("[name]");
        
        campos.forEach(campo => {
            let valor =  proprietario[campo.name];
            if(valor){
                if(campo.name == "cpf"){
                    campo.value = this.utilitarios.mascaraCPF(valor);
                }else{
                    campo.value = valor;
                }
            }
            if(campo.name == "cep"){
                campo.value = this.utilitarios.mascaraCep(proprietario.endereco.logradouroCep.cep);
            }
        });

        //endereço
        let complemento = proprietario.endereco.logradouroCep.complemento;
        if(!complemento){
            complemento = "";
        }else{
            complemento = complemento.complemento;
        }
        let endereco = {
            logradouro: proprietario.endereco.logradouroCep.logradouro,
            numeroEnd: proprietario.endereco.numero.numero,
            complemento: complemento,
            bairro: proprietario.endereco.logradouroCep.bairro.nome,
            localidade: proprietario.endereco.logradouroCep.bairro.cidade.nome,
            uf: proprietario.endereco.logradouroCep.bairro.cidade.estado.nome
        }
        this.setValoresFormularioEndereco(endereco);

        //Contato
        let conts = this.contatos.querySelectorAll(".field-contact");
        for(let i=1; i < conts.length; i++){
            this.contatos.removeChild(conts[i]);
        }
        for(let i=1; i < proprietario.contatos.length; i++){
            this.addCampoNumero();
        }

        conts = this.contatos.querySelectorAll(".field-contact");
        for(let i=0; i < conts.length; i++){
            let divContato = conts[i];

            divContato.querySelector("[name=idContato]").value = proprietario.contatos[i].idContato;
           
            
            let numero = proprietario.contatos[i].numero;
            let tipoContato = proprietario.contatos[i].tipoContato;
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

    eventBtnExcluir(btn,proprietario){
        btn.addEventListener("click", event => {
            event.preventDefault();

            this.controleModal(1);

            this.controleModal(3,event => {
                event.preventDefault();

                this.proprietarioRepository.excluirProprietario(proprietario,
                    data => {
                        this.controleModal(2);
                        this.exibirMsgSucesso(2);
                        this.gerenciarLocalStore(4,JSON.parse(proprietario));
                        this.listarProprietarios();
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

    buscarProprietariosNome(){

        let formBuscar = document.querySelector("#search-owner");
        formBuscar.addEventListener("submit",event => {
            event.preventDefault();
            
            let nome = event.target.querySelector("#field-search-name").value;

            this.proprietarioRepository.getProprietariosNome(nome,
                proprietarios => {
                    this.gerenciarPaginacao(proprietarios);
                },
                error => {
                    this.gerenciarPaginacao(null);
                    console.log(error);
                }
            );

        });

        let campoTexto = document.querySelector("#field-search-name");
        campoTexto.addEventListener("keyup",event => { 
            this.proprietarioRepository.getProprietariosNome(event.target.value,
                proprietarios => { 
                    this.gerenciarPaginacao(proprietarios); 
                },
                error => {
                    this.gerenciarPaginacao(null);
                    console.log(error);
                }
            );
        });

    }

    salvarProprietario(){

        this.formEl.addEventListener("submit",event => {
            event.preventDefault();
            
            let proprietario = this.getValoresFormulario();

            if(!proprietario) return null;

            let stringProprietario = JSON.stringify(proprietario);

            let sucesso  = (data) => {
                this.exibirMsgSucesso(1);
                this.resetarFormulario();
                this.gerenciarLocalStore(3,data);
            }

            let erro = (error) => {
                console.log(error);
                this.exibirMsgErro(1);
            }

            if(proprietario.idPessoa){//Atualizar

                this.proprietarioRepository.atualizarProprietario(stringProprietario,
                    data => {
                        sucesso(data);
                    },
                    error => {
                        erro(error);
                    }
                );

            }else{//Cadastrar
                
                this.proprietarioRepository.cadastrarProprietario(stringProprietario,
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

            let proprietario = {};
            proprietario.tipoPessoa = 2;
            for(let attr in dadosPessoais){
                proprietario[attr] = dadosPessoais[attr];
            }
            proprietario.salario = null;
            proprietario.ativo = true;
            proprietario.contatos = dadosContatos;
            proprietario.endereco = {
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
                proprietario.endereco.logradouroCep.complemento = {
                    complemento: dadosEndereco.complemento
                }
            }else{
                proprietario.endereco.logradouroCep.complemento = null;
            }
            
            return proprietario;
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
        $("#owner-form #cpf").mask("000.000.000-00");

        this.formEl.querySelector("#cpf").addEventListener("blur",event => {

            let cpf = this.utilitarios.desmascaraCpf(event.target.value);

            this.proprietarioRepository.getPessoaCpf(cpf,
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

        $("#owner-form #cep").mask("00.000-000");
        
        this.formEl.querySelector("#cep").addEventListener("blur",event => {

            let cep = this.utilitarios.desmascaraCep(event.target.value);

            this.proprietarioRepository.getEnderecoCep(cep,
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