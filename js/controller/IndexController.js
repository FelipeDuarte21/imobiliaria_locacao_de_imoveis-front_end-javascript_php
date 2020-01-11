class IndexController extends BaseController{

    constructor(indexRepository){
        super();
        this.indexRepository = indexRepository;
        this.cardImovel = document.querySelector("#qtdImovel");
        this.cardAluguel = document.querySelector("#qtdAluguel");
        this.cardLocacao = document.querySelector("#qtdLoc");
        this.cardInquilino = document.querySelector("#qtdInq");
        this.cardProprietario = document.querySelector("#qtdProp");
        this.atualizaNumeros();
    }

    atualizaNumeros(){

        //Atualiza Imóveis
        this.indexRepository.buscarTodosImoveis(
            imoveis => {
                this.cardImovel.innerHTML = imoveis.length;
            },
            error => {
                console.log(error);
            }
        );

        //Atualiza Alugueis atrasados
        this.indexRepository.buscarAlugueisAtrasados(
            alugueis => {
                this.cardAluguel.innerHTML = alugueis.length;
            },
            error => {
                console.log(error);
            }
        );

        //Atualiza locações
        this.indexRepository.buscarTodasLocacoes(
            locacoes => {
                this.cardLocacao.innerHTML = locacoes.length;
            },
            error => {
                console.log(error);
            }
        );

        //Atualiza inquilinos
        this.indexRepository.buscarTodosInquilinos(
            inquilinos => {
                this.cardInquilino.innerHTML = inquilinos.length;
            },
            error => {
                console.log(error);
            }
        );

        //Atualiza proprietarios
        this.indexRepository.buscarTodosProprietarios(
            proprietarios => {
                this.cardProprietario.innerHTML = proprietarios.length;
            },
            error => {
                console.log(error);
            }
        );

    }

}