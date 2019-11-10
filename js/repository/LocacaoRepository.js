class LocacaoRepository extends BaseRepository{
    
    constructor(){
        super();
        this.URL_LOCACAO = `${this.URL_BASE}/locacao`;
    }

    buscarTodos(callbackS,callbackE){
        super.buscarTodos(this.URL_LOCACAO,callbackS,callbackE);
    }

} 