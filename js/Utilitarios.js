class Utilitarios{

    constructor(){

    }

    mascaraCPF(cpf){
        let cpfMascarado = "";
        for(let i=0; i < cpf.length; i++){
            if(i == 2 || i == 5){
                cpfMascarado += cpf[i] + ".";
            }else if(i == 8){
                cpfMascarado += cpf[i] + "-";
            }else{
                cpfMascarado += cpf[i];
            }
        }
        return cpfMascarado;
    }

    mascaraCelular(celular){
        let celularMascarado = "(";
        for(let i=0; i < celular.length; i++){
            if(i == 1){
                celularMascarado += celular[i] + ") ";
            }else if(i == 6){
                celularMascarado += celular[i] + "-";
            }else{
                celularMascarado += celular[i];
            }
        }
        return celularMascarado;
    }
    
    mascaraTelefone(telefone){
        let telefoneMascarado = "(";
        for(let i=0; i < telefone.length; i++){
            if(i == 1){
                telefoneMascarado += telefone[i] + ") ";
            }else if(i == 5){
                telefoneMascarado += telefone[i] + "-";
            }else{
                telefoneMascarado += telefone[i];
            }
        }
        return telefoneMascarado;
    }

    mascaraCep(cep){
        let cepMascarado = "";
        for(let i=0; i < cep.length; i++){
            if(i == 1){
                cepMascarado += cep[i] + ".";
            }else if(i == 4){
                cepMascarado += cep[i] + "-";
            }else{
                cepMascarado += cep[i];
            }
        }
        return cepMascarado;
    }

    formatarData(data){
        let partes = data.split("-");
        let dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        return dataFormatada;
    }

    desmascaraCep(cep){
        let partes = cep.split(".");
        partes = `${partes[0]}${partes[1]}`;
        partes = partes.split("-");
        return `${partes[0]}${partes[1]}`;
    }

    desmascaraCpf(cpf){
        let partes = cpf.split(".");
        partes = `${partes[0]}${partes[1]}${partes[2]}`;
        partes = partes.split("-");
        return `${partes[0]}${partes[1]}`;
    }

    desmascaraCelular(celular){
        celular = celular.split(" ");
        celular = `${celular[0]}${celular[1]}`;
        celular = celular.split("(");
        celular = `${celular[1]}`;
        celular = celular.split(")");
        celular = `${celular[0]}${celular[1]}`;
        celular = celular.split("-");
        return `${celular[0]}${celular[1]}`;
    }

    desmascaraTelefone(telefone){
        telefone = telefone.split(" ");
        telefone = `${telefone[0]}${telefone[1]}`;
        telefone = telefone.split("(");
        telefone = `${telefone[1]}`;
        telefone = telefone.split(")");
        telefone = `${telefone[0]}${telefone[1]}`;
        telefone = telefone.split("-");
        return `${telefone[0]}${telefone[1]}`;
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
        let cep = endereco.logradouroCep.cep;

        let enderecoCompleto = `${logradouro} ${numero} ${(complemento) != null ? complemento: " "}
        ${bairro} - ${cidade} / ${estado} - CEP: ${cep}`;

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

}