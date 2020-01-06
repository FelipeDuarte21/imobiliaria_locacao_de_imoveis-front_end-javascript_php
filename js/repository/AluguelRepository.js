class AluguelRepository extends BaseRepository{

    constructor(){
        super();
        this.URL_ALUGUEL = `${this.URL_BASE}/aluguel`;
    }

    buscarAlugueisPorPeriodo(inicio,termino,callbackS,callbackE){
        let url = `${this.URL_ALUGUEL}/periodo/?inicio=${inicio}&fim=${termino}`;
        super.fazerRequisicao('GET',url,null,callbackS,callbackE);
    }

    buscarAlugueisPorLocacao(idLocacao,callbackS,callbackE){
        let url = `${this.URL_ALUGUEL}/locacao/${idLocacao}`;
        super.fazerRequisicao('GET',url,null,callbackS,callbackE);
    }

    buscarPorId(id,callbackS,callbackE){
        let url = `${this.URL_ALUGUEL}/${id}`;
        this.fazerRequisicao("GET",url,null,callbackS,callbackE);
    }

    registrarPagamento(aluguel,callbackS,callbackE){
        super.alterar(this.URL_ALUGUEL,aluguel,callbackS,callbackE);
    }

}