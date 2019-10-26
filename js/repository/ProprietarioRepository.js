class ProprietarioRepository{

    constructor(){
        this.URL_BASE = "http://localhost:8080";
        this.URL_PROPRIETARIO = `${this.URL_BASE}/proprietarios`;
        this.URL_PESSOA = `${this.URL_BASE}/pessoa`;
    }

    requisicao(metodo,url,dados,sucesso,erro){
        $.ajax({
            method: metodo,
            url: url,
            data: dados,
            dataType: "JSON",
            contentType: "application/json;charset=UTF-8",
            success: function(data){
                sucesso(data);
            },
            error: function(err){
                erro(err);
            }
        });
    }

    getProprietarios(callbackS,callbackE){
        this.requisicao("GET",this.URL_PROPRIETARIO,null,callbackS,callbackE);
    }

    getProprietariosNome(nome,callbackS,callbackE){
        this.requisicao("GET",`${this.URL_PROPRIETARIO}/${nome}`,null,callbackS,callbackE);
    }

    getEnderecoCep(cep,callbackS,callbackE){
        this.requisicao("GET",`https://viacep.com.br/ws/${cep}/json/`,null,callbackS,callbackE);
    }

    getPessoaCpf(cpf,callbackS,callbackE){
        this.requisicao("GET",`${this.URL_PESSOA}/cpf/${cpf}`,null,callbackS,callbackE);
    }

    atualizarProprietario(proprietario,callbackS,callbackE){
        this.requisicao("PUT",this.URL_PESSOA,proprietario,callbackS,callbackE);
    }

    cadastrarProprietario(proprietario,callbackS,callbackE){
        this.requisicao("POST",this.URL_PESSOA,proprietario,callbackS,callbackE);
    }

    excluirProprietario(proprietario,callbackS,callbackE){
        this.requisicao("DELETE",this.URL_PESSOA,proprietario,callbackS,callbackE);
    }

}