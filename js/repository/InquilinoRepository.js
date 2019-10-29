class InquilinoRepository{

    constructor(){
        this.URL_BASE = "http://localhost:8080";
        this.URL_INQUILINO = `${this.URL_BASE}/inquilinos`;
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

    getInquilinos(callbackS,callbackE){
        this.requisicao("GET",this.URL_INQUILINO,null,callbackS,callbackE);
    }

}