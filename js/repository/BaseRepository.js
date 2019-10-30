class BaseRepository{

    constructor(){
        this.URL_BASE = "http://localhost:8080";
    }

    fazerRequisicao(metodo,url,dados,sucesso,erro){
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

    buscarEnderecoPorCEP(cep,callbackS,callBackE){
        this.fazerRequisicao("GET",`https://viacep.com.br/ws/${cep}/json/`,null,callbackS,callBackE);
    }

    cadastrar(url,dados,callbackS,callBackE){
        this.fazerRequisicao("POST",url,dados,callbackS,callBackE);
    }

    alterar(url,dados,callbackS,callBackE){
        this.fazerRequisicao("PUT",url,dados,callbackS,callBackE);
    }

    excluir(url,dados,callbackS,callBackE){
        this.fazerRequisicao("DELETE",url,dados,callbackS,callBackE);
    }

    buscarTodos(url,callbackS,callBackE){
        this.fazerRequisicao("GET",url,null,callbackS,callBackE)
    }

}