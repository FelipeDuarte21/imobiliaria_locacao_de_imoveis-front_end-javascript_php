class AluguelController extends BaseController{

    constructor(repositoryAluguel){
        super();
        this.aluguelRepository = repositoryAluguel;
        this.painelLista = "#painel-listar";
        this.painelPagamento = "#painel-pagarAluguel";
        this.painelAlugueis = "#painel-alugueisInquilino";
        this.formNome = "#formulario-de-pagamento";
        this.tableEl = document.querySelector("#lista-de-alugueis");
        this.selectPaginas = document.querySelector("#qtdRegistros");
        this.ulPaginas = document.querySelector(".paging-system");
        this.formEl = document.querySelector(this.formNome);
        this.configuracaoNavegacao();
        this.listarAlugueis();
        this.pesquisarAlugueisData();
        this.registrarPagamento();
    }

    configuracaoNavegacao(){

        this.alternarPaineis(4);
        this.alternarPaineis(6);

        //Configuraçao do botão voltar
        let btns = document.querySelectorAll(".btn-voltar");
        btns.forEach(btn => {
            btn.addEventListener("click",event => {
                event.preventDefault();
                this.resetarFormulario();
                this.listarAlugueis();
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
                $(this.painelPagamento).show('fade');
                break;
            case 4:
                $(this.painelPagamento).hide('fade');
                break;
            case 5:
                $(this.painelAlugueis).show('fade');
                break;
            case 6:
                $(this.painelAlugueis).hide('fade');
                break;
        }

    }

    resetarFormulario(){
        this.formEl.querySelector("input[name=idAluguel]").value = 0;
        this.formEl.reset();
    }

    listarAlugueis(){

        let data = new Date();
        let ultimoDiaMes = new Date(data.getFullYear(),data.getMonth()+1,0).getDate();

        let inicio = `01/${data.getMonth()+1}/${data.getFullYear()}`;
        let termino = `${ultimoDiaMes}/${data.getMonth()+1}/${data.getFullYear()}`;

        this.aluguelRepository.buscarAlugueisPorPeriodo(inicio,termino,
            alugueis => {
                super.gerenciarPaginacao(alugueis,this.removerLinhas,this.addLinha,this.selectPaginas,this.ulPaginas);
            },
            error => {
                console.log("Erro");
                console.log(error);
            }
        );
        
    }

    pesquisarAlugueisData(){
        let formPesquisa = document.querySelector("#form-search-date");

        formPesquisa.addEventListener("submit",event => {
            event.preventDefault();

            let inicio = this.utilitarios.formatarData(document.querySelector("#inicio").value);
            let termino = this.utilitarios.formatarData(document.querySelector("#fim").value);

            this.aluguelRepository.buscarAlugueisPorPeriodo(inicio,termino,
                alugueis => {
                    super.gerenciarPaginacao(alugueis,this.removerLinhas,this.addLinha,this.selectPaginas,this.ulPaginas);
                },
                error => {
                    console.log(error);
                }
            );

        });
    }

    removerLinhas = () => {
        let trs = this.tableEl.querySelectorAll("tr");
        trs.forEach(tr => {
            this.tableEl.removeChild(tr);
        });
    }

    addLinha = (aluguel) => {
        
        if(!aluguel) return null;
        
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${this.utilitarios.formatarData(aluguel.dataVencimento)}</td>
            <td>${aluguel.locacao.inquilino.nome}</td>
            <td>${this.utilitarios.formatoMoeda(aluguel.locacao.valor)}</td>
            <td>
                ${(aluguel.quite) ? 
                    "<span class='alert alert-success p-1'>Pago</span>" : 
                    "<span class='alert alert-danger p-1'>Não Pago</span>" 
                }
            </td>
            <td>
                ${(aluguel.quite) ? 
                    "<a href='#' class='btn btn-success btn-sm mr-1 btn-pagar disabled' data-toggle='tooltip' data-placement='top' title='Registrar Pagamento'><i class='fas fa-dollar-sign'></i></a>" : 
                    "<a href='#' class='btn btn-success btn-sm mr-1 btn-pagar' data-toggle='tooltip' data-placement='top' title='Registrar Pagamento'><i class='fas fa-dollar-sign'></i></a>"
                }
                <a href="#" class="btn btn-primary btn-sm mr-1 btn-alugueis" data-toggle="tooltip" title="Visualizar outros alugueis">
                    <i class="fas fa-eye"></i>
                </a>
            </td>
        `;

        tr.dataset.aluguel = JSON.stringify(aluguel);

        this.tableEl.appendChild(tr);

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        this.addEventsBtns(tr);

    }

    addEventsBtns(tr){

        let aluguel = JSON.parse(tr.dataset.aluguel);

        let btnAlugueis = tr.querySelector(".btn-alugueis");
        this.eventBtnAlugueis(btnAlugueis,aluguel);

        let btnPagar = tr.querySelector(".btn-pagar");
        this.eventBtnPagar(btnPagar,aluguel);

    }

    eventBtnAlugueis(btn,aluguel){

        let tableAlugueisEl = document.querySelector("#tabelaAlugueis");
                    
        let addLinhas = (aluguel) => {
                        
            let tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${this.utilitarios.formatarData(aluguel.dataVencimento)}</td>
                <td>
                    ${(aluguel.quite) ? 
                    "<span class='alert alert-success p-1'>Pago</span>" : 
                    "<span class='alert alert-danger p-1'>Não Pago</span>" }
                </td>
                <td>${(aluguel.dataPagamento) ? this.utilitarios.formatarData(aluguel.dataPagamento) : ""}</td>
            `;

            tableAlugueisEl.appendChild(tr);

        };

        let removerLinhas = () => {
            let trs = tableAlugueisEl.querySelectorAll("tr");
            trs.forEach(tr => {
                tableAlugueisEl.removeChild(tr);
            });
        };

        let selectPaginas2 = document.querySelector("#qtdRegistros2");
        let ulPaginas2 = document.querySelector(".paging-system2");

        btn.addEventListener("click",event => {
            event.preventDefault();

            this.alternarPaineis(2);
            this.alternarPaineis(5);

            let idLocacao = aluguel.locacao.idLocacao;

            this.aluguelRepository.buscarAlugueisPorLocacao(idLocacao,
                alugueis => {

                    document.querySelector("#infoInquilino").innerHTML = alugueis[0].locacao.inquilino.nome;
                    document.querySelector("#infoEndereco").innerHTML = super.formatoEndereco(alugueis[0].locacao.imovel.endereco);
                    document.querySelector("#infoValor").innerHTML = this.utilitarios.formatoMoeda(alugueis[0].locacao.valor);

                    super.gerenciarPaginacao(alugueis,removerLinhas,addLinhas,selectPaginas2,ulPaginas2);

                },
                error => {
                    console.log(error);
                }
            );
        });
    }

    eventBtnPagar(btn, aluguel){

        btn.addEventListener("click",event => {
            event.preventDefault();

            this.alternarPaineis(2);
            this.alternarPaineis(3);

            this.setValoresFormulario(aluguel);

        });

    }

    setValoresFormulario(aluguel){
        let campos = this.formEl.querySelectorAll("[name]");

        campos.forEach(campo => {
            
            if(campo.name == "idAluguel"){
                campo.value = aluguel[campo.name];
            }else if(campo.name == "dataVencimento"){
                campo.value = aluguel[campo.name];
            }else{
                
                if(campo.name == "inquilino"){
                    campo.value = aluguel.locacao.inquilino.nome;
                }else if(campo.name == "imovel"){
                    campo.value = super.formatoEndereco(aluguel.locacao.imovel.endereco);
                }else{
                    campo.value = aluguel.locacao.valor;
                }

            }

        });

    }

    registrarPagamento(){

        this.formEl.addEventListener("submit",event => {
            event.preventDefault();

            let idAluguel = this.formEl.querySelector("[name=idAluguel]").value;
            
            this.aluguelRepository.buscarPorId(idAluguel,
                aluguel => {
                    
                    let data = new Date();
                    let dataHoje = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`;
                    
                    aluguel.dataPagamento = dataHoje;
                    aluguel.quite = true;

                    let stringAluguel = JSON.stringify(aluguel);

                    this.aluguelRepository.registrarPagamento(stringAluguel,
                        sucesso => {
                            this.exibirMsgSucesso(1);
                            this.resetarFormulario();
                        },
                        error => {
                            console.log(error);
                            this.exibirMsgErro(1);
                        }
                    );

                },
                error => {
                    console.log(error);
                }
            );
            
        });

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