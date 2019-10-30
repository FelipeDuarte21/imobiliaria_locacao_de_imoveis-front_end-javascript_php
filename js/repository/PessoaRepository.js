class PessoaRepository extends BaseRepository{

    constructor(){
        super();
        this.URL_PESSOA = `${this.URL_BASE}/pessoa`;
    }

    buscarPorNome(url,callbackS,callBackE){
        super.fazerRequisicao("GET",url,null,callbackS,callBackE);
    }

    buscarPorCPF(cpf,callbackS,callBackE){
        super.fazerRequisicao("GET",`${this.URL_PESSOA}/cpf/${cpf}`,null,callbackS,callBackE);
    }

    alterar(pessoa,callbackS,callbackE){
        super.alterar(this.URL_PESSOA,pessoa,callbackS,callbackE);
    }

    cadastrar(pessoa,callbackS,callbackE){
        super.cadastrar(this.URL_PESSOA,pessoa,callbackS,callbackE);
    }

    excluir(pessoa,callbackS,callbackE){
        super.excluir(this.URL_PESSOA,pessoa,callbackS,callbackE);
    }

}