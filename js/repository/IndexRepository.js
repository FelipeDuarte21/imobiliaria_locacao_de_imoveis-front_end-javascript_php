class IndexRepository extends BaseRepository{

    constructor(){
        super();
    }

    buscarTodosImoveis(callbackS,callbackE){
        let url = `${this.URL_BASE}/imovel`;
        super.buscarTodos(url,callbackS,callbackE);
    }

    buscarAlugueisAtrasados(callbackS,callbackE){
        let url = `${this.URL_BASE}/aluguel/atrasados`;
        super.buscarTodos(url,callbackS,callbackE);
    }

    buscarTodasLocacoes(callbackS,callbackE){
        let url = `${this.URL_BASE}/locacao`;
        super.buscarTodos(url,callbackS,callbackE);
    }

    buscarTodosInquilinos(callbackS,callbackE){
        let url = `${this.URL_BASE}/inquilinos`;
        super.buscarTodos(url,callbackS,callbackE);
    }

    buscarTodosProprietarios(callbackS,callbackE){
        let url = `${this.URL_BASE}/proprietarios`;
        super.buscarTodos(url,callbackS,callbackE);
    }

}