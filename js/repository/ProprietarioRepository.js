class ProprietarioRepository extends PessoaRepository{

    constructor(){
        super();
        this.URL_PROPRIETARIO = `${this.URL_BASE}/proprietarios`;
    }

    buscarTodos(callbackS,callbackE){
        super.buscarTodos(this.URL_PROPRIETARIO,callbackS,callbackE);
    }

    buscarPorNome(nome,callbackS,callbackE){
        super.buscarPorNome(`${this.URL_PROPRIETARIO}/${nome}`,callbackS,callbackE);
    }

}