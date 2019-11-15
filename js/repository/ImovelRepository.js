class ImovelRepository extends BaseRepository{

    constructor(){
        super();
        this.URL_LOCACAO = `${this.URL_BASE}/imovel`;
    }

    buscarTodos(callbackS,callbackE){
        super.buscarTodos(this.URL_LOCACAO,callbackS,callbackE);
    }

    buscarDisponiveis(callbackS,callbackE){
        super.fazerRequisicao("GET",`${this.URL_LOCACAO}/disponivel`,null,callbackS,callbackE);
    }

    buscarDisponiveisPorPreco(preco,callbackS,callBackE){
        super.fazerRequisicao("GET",`${this.URL_LOCACAO}/disponivel/${preco}`,null,callbackS,callBackE);
    }

    buscarPorNomeProprietario(nome,callbackS,callBackE){
        super.fazerRequisicao("GET",`${this.URL_LOCACAO}/proprietario/nome/${nome}`,null,callbackS,callBackE);
    }

    cadastrar(imovel,callbackS,callBackE){
        super.cadastrar(this.URL_LOCACAO,imovel,callbackS,callBackE);
    }

    alterar(imovel,callbackS,callBackE){
        super.alterar(this.URL_LOCACAO,imovel,callbackS,callBackE);
    }

    excluir(imovel,callbackS,callBackE){
        super.excluir(this.URL_LOCACAO,imovel,callbackS,callBackE);
    }


}