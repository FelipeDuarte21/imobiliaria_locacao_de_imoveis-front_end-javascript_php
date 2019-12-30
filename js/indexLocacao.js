let locacaoController = new LocacaoController(new LocacaoRepository(),
new ProprietarioRepository(),new InquilinoRepository(),new ImovelRepository());
document.querySelector("#locacao").classList.add("active");