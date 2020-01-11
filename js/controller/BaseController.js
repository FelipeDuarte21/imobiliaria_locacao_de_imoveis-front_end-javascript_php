class BaseController{

    constructor(){
        this.utilitarios = new Utilitarios();
    }

    formatoEndereco(endereco){
       
        let logradouro = endereco.logradouroCep.logradouro;
        let numero = endereco.numero.numero;
        let complemento = endereco.logradouroCep.complemento;
        if(complemento){
            complemento = complemento.complemento;
        }
        let bairro = endereco.logradouroCep.bairro.nome;
        let cidade = endereco.logradouroCep.bairro.cidade.nome;
        let estado = endereco.logradouroCep.bairro.cidade.estado.nome;
        let cep = this.utilitarios.mascaraCep(endereco.logradouroCep.cep);

        let enderecoCompleto = `${logradouro} ${numero} ${(complemento) != null ? complemento: " "} ${bairro} - ${cidade} / ${estado} - CEP: ${cep}`;

        return enderecoCompleto;
    }

    formatoEstadocivil(estadoCivil){
        switch(parseInt(estadoCivil)){
            case 1:
                return "Solteiro(a)";
            case 2:
                return "Casado(a)";
            case 3:
                return "Separado(a)";
            case 4:
                return "Divorciado(a)";
            case 5:
                return "Viúvo(a)";
            default:
                return " ";
        }
    }

    gerenciarPaginacao(dados,removerLinhas,addLinha,cbQtdRegistros,ulPaginacao){

        if(dados){

            cbQtdRegistros.addEventListener("change",event=> { 
                
                let qtdRegistros = parseInt(event.target.value);
                let qtdDados = dados.length;
                let qtdPaginas = parseInt(qtdDados/qtdRegistros);
                let sobra = parseInt(qtdDados % qtdRegistros);
                if(sobra > 0){
                    qtdPaginas++;
                }

                let lis = ulPaginacao.querySelectorAll("li");
                lis.forEach(li => {
                    ulPaginacao.removeChild(li);
                });

                for(let i=0; i < qtdPaginas; i++){

                    let li = document.createElement("li");
                    li.classList.add("page-item");

                    let de = i*qtdRegistros;
                    let ate = (de + qtdRegistros) - 1;
                    if(ate > qtdDados){
                        ate = qtdDados - 1;
                    }

                    let link = `<a href="#" class="page-link btn-pagina" data-de="${de}" data-ate="${ate}">${i+1}</a>`;

                    li.innerHTML = link;

                    ulPaginacao.appendChild(li);

                }

                let linksPaginas = ulPaginacao.querySelectorAll(".btn-pagina");
                linksPaginas.forEach(linkPagina => {

                    linkPagina.addEventListener("click",event => {
                        event.preventDefault();

                        let lis = ulPaginacao.querySelectorAll("li");
                        lis.forEach(li => {
                            li.classList.remove("active");
                        });
                        event.target.parentElement.classList.add("active");

                        let indexInicio = parseInt(linkPagina.dataset.de);
                        let indexFinal = parseInt(linkPagina.dataset.ate);

                        removerLinhas();
                        for(let i = indexInicio; i <= indexFinal; i++){
                            addLinha(dados[i]);
                        }

                    });

                });

                linksPaginas[0].dispatchEvent(new Event("click"));

            });

            cbQtdRegistros.dispatchEvent(new Event("change"));
        }else{
            removerLinhas();
        }
    }

}