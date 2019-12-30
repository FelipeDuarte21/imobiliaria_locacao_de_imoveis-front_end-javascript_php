class ImovelRepository extends BaseRepository{

    constructor(){
        super();
        this.URL_IMOVEL = `${this.URL_BASE}/imovel`;
    }

    buscarTodos(callbackS,callbackE){
        super.buscarTodos(this.URL_IMOVEL,callbackS,callbackE);
    }

    buscarPorId(id,callbackS,callBackE){
        super.buscarPorId(`${this.URL_IMOVEL}/${id}`,callbackS,callBackE);
    }

    buscarDisponiveis(callbackS,callbackE){
        super.fazerRequisicao("GET",`${this.URL_IMOVEL}/disponivel`,null,callbackS,callbackE);
    }

    buscarDisponiveisPorPreco(preco,callbackS,callBackE){
        super.fazerRequisicao("GET",`${this.URL_IMOVEL}/disponivel/${preco}`,null,callbackS,callBackE);
    }

    buscarPorNomeProprietario(nome,callbackS,callBackE){
        super.fazerRequisicao("GET",`${this.URL_IMOVEL}/proprietario/nome/${nome}`,null,callbackS,callBackE);
    }

    buscarPorIdProprietario(id,callbackS,callBackE){
        super.fazerRequisicao("GET",`${this.URL_IMOVEL}/proprietario/id/${id}`,null,callbackS,callBackE);
    }

    cadastrar(imovel,callbackS,callBackE){
        super.cadastrar(this.URL_IMOVEL,imovel,callbackS,callBackE);
    }

    alterar(imovel,callbackS,callBackE){
        super.alterar(this.URL_IMOVEL,imovel,callbackS,callBackE);
    }

    excluir(imovel,callbackS,callBackE){
        super.excluir(this.URL_IMOVEL,imovel,callbackS,callBackE);
    }


}