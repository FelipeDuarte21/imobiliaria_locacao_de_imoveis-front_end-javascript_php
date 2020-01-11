<?php
    include_once("cabecalhoPrincipal.php");
    include_once("cabecalhoAluguel.php");
?>

    <!--Conteúdo da Página-->
    <div class="container-fluid">

        <!--Card com as informações-->
        <div class="row justify-content-center">

            <div class="col-xl-11 mt-5">

                <div class="card-columns mt-3">

                    <div class="card bg-primary text-light mr-1" style="max-width:18rem;">

                        <div class="card-body">
                            <div class="float-right mt-4">
                                <i class="fas fa-fw fa-home" style="font-size:4rem;"></i>
                            </div>
                            <div>
                                <h5 class="card-title ">Imóveis</h5>
                                <h1 class="card-text" id="qtdImovel">0</h1>
                            </div>
                        </div>

                        <div class="card-footer">
                            <a href="imovel.php" class="card-link text-light">Imóveis</a>
                        </div>

                    </div>

                    <div class="card bg-danger text-light mr-1" style="max-width:18rem;">

                        <div class="card-body">
                            <div class="float-right mt-4">
                                <i class="fas fa-hand-holding-usd" style="font-size:4rem;"></i>
                            </div>
                            <div>
                                <h5 class="card-title ">Alugueis Atrasados</h5>
                                <h1 class="card-text" id="qtdAluguel">0</h1>
                            </div>
                        </div>

                        <div class="card-footer">
                            <a href="aluguel.php" class="card-link text-light">Alugueis</a>
                        </div>

                    </div>
                        
                    <div class="card bg-success text-light mr-1" style="max-width:18rem;">

                        <div class="card-body">
                            <div class="float-right mt-4">
                                <i class="fas fa-key" style="font-size:4rem;"></i>
                            </div>
                            <div>
                                <h5 class="card-title ">Locações</h5>
                                <h1 class="card-text" id="qtdLoc">0</h1>
                            </div>
                        </div>

                        <div class="card-footer">
                            <a href="locacao.php" class="card-link text-light">Locações</a>
                        </div>

                    </div>

                </div>

                <div class="card-columns mt-3">

                    <div class="card bg-info text-light mr-1" style="max-width:18rem;">

                        <div class="card-body">
                            <div class="float-right mt-4">
                                <i class="fas fa-fw fa-user" style="font-size:4rem;"></i>
                            </div>
                            <div>
                                <h5 class="card-title">Inquilinos</h5>
                                <h1 class="card-text" id="qtdInq">0</h1>
                            </div>
                        </div>

                        <div class="card-footer">
                            <a href="inquilino.php" class="card-link text-light">Inquilinos</a>
                        </div>

                    </div>

                    <div class="card bg-warning text-dark" style="max-width:18rem;">

                        <div class="card-body">
                            <div class="float-right mt-4">
                                <i class="fas fa-fw fa-user-tie" style="font-size:4rem;"></i>
                            </div>
                            <div>
                                <h5 class="card-title">Proprietários</h5>
                                <h1  class="card-text" id="qtdProp">0</h4>
                            </div>
                                
                        </div>

                        <div class="card-footer">
                            <a href="proprietario.php" class="card-link text-dark">Proprietários</a>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <?php
        include_once("scripts.php");
    ?>

    <script src="js/repository/indexRepository.js"></script>
    <script src="js/controller/indexController.js"></script>
    <script src="js/index.js"></script>

</body>
</html>