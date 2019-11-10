class LocacaoController extends BaseController{

    constructor(repository){
        super();
        this.locacaoRepository = repository;
        this.painelLista = "#painel-listar";
        this.painelCadastro = "#painel-cadastrar";
        this.painelInformacoes = "#painel-exibir";
        this.painelPropInq = "#painel-prop-inq";
        this.formNome = "#formulario-de-cadastro";
        this.localDados = "#exibir-dados";
        this.tableEl = document.querySelector("#lista-de-locacoes");
        this.formEl = document.querySelector(this.formNome);
        this.nomeSession = "locações";
        this.configuracaoNavegacao();
        this.listarLocacoes();
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
        this.formEl.reset();
    }

    listarLocacoes(){

        let locacoes = super.gerenciarSessionStore(2,this.nomeSession);

        let paginacao = locacoes => {
            super.gerenciarPaginacao(locacoes,this.removerLinhas,this.addLinha);
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

}