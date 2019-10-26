class ProprietarioRepository{

    constructor(){
        this.URL_BASE = "http://localhost:8080/proprietarios";
    }

    getProprietarios(callbackS,callbackE){
        $.ajax({
            method: "GET",
            url: this.URL_BASE,
            success: function(data){
                callbackS(data);
            },
            error: function(err){
                callbackE(err);
            }
        });
    }

    getProprietariosNome(nome,callbackS,callbackE){
        $.ajax({
            method: "GET",
            url: `${this.URL_BASE}/${nome}`,
            success: function(data){
                callbackS(data);
            },
            error: function(err){
                callbackE(err);
            }
        });
    }

    getEnderecoCep(cep,callbackS,callbackE){
        $.ajax({
            method: "GET",
            url: `https://viacep.com.br/ws/${cep}/json/`,
            success: function(data){
                callbackS(data);
            },
            error: function(err){
                callbackE(err);
            }
        });
    }

    getPessoaCpf(cpf,callbackS,callbackE){
        $.ajax({
            method: "GET",
            url: `http://localhost:8080/pessoa/cpf/${cpf}`,
            success: function(data){
                callbackS(data);
            },
            error: function(err){
                callbackE(err);
            }
        });
    }

    atualizarProprietario(proprietario,callbackS,callbackE){
        $.ajax({
            method: "PUT",
            url: `http://localhost:8080/pessoa`,
            data: proprietario,
            dataType: "JSON",
            contentType: "application/json;charset=UTF-8",
            success: function(data){
                callbackS(data);
            },
            error: function(err){
                callbackE(err);
            }
        });
    }

    cadastrarProprietario(proprietario,callbackS,callbackE){
        $.ajax({
            method: "POST",
            url: `http://localhost:8080/pessoa`,
            dataType: "JSON",
            data: proprietario,
            contentType: "application/json;charset=UTF-8",
            success: function(data){
                callbackS(data);
            },
            error: function(err){
                callbackE(err);
            }
        });
    }

    excluirProprietario(proprietario,callbackS,callbackE){
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/pessoa`,
            dataType: "JSON",
            data: proprietario,
            contentType: "application/json;charset=UTF-8",
            success: function(data){
                callbackS(data);
            },
            error: function(err){
                callbackE(err);
            }
        });
    }

}