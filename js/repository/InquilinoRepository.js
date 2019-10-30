class InquilinoRepository extends PessoaRepository{

    constructor(){
        super();
        this.URL_INQUILINO = `${this.URL_BASE}/inquilinos`;
    }

    buscarTodos(callbackS,callbackE){
        super.buscarTodos(this.URL_INQUILINO,callbackS,callbackE);
    }

    buscarPorNome(nome,callbackS,callbackE){
        super.buscarPorNome(`${this.URL_INQUILINO}/${nome}`,callbackS,callbackE);
    }

}