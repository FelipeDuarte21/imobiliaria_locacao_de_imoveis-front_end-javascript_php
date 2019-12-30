class LocacaoRepository extends BaseRepository{
    
    constructor(){
        super();
        this.URL_LOCACAO = `${this.URL_BASE}/locacao`;
    }

    buscarTodos(callbackS,callbackE){
        super.buscarTodos(this.URL_LOCACAO,callbackS,callbackE);
    }

    cadastrar(locacao,callbackS,callbackE){
        super.cadastrar(this.URL_LOCACAO,locacao,callbackS,callbackE);
    }

    alterar(locacao,callbackS,callbackE){
        super.alterar(this.URL_LOCACAO,locacao,callbackS,callbackE);
    }

    excluir(locacao,callbackS,callBackE){
        super.excluir(this.URL_LOCACAO,locacao,callbackS,callBackE);
    }


}