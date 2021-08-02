var criaController = function (jogo) {

    var $entrada = $('.entrada');
    var $lacunas = $('.lacunas');

    var exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach(function (lacuna) {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });
    };

    var mudaPlaceHolder = function (texto) {

        $entrada.attr('placeholder', texto);
    };

    var guardaPalavraSecreta = function () {

        jogo.setPalavraSecreta($entrada.val().trim());
        $entrada.val('');
        mudaPlaceHolder('chuta');
        exibeLacunas();
    };

    var reinicia = function() {

        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder('palavra secreta');
    };

    var leChute = function () {
        // O método trim() remove os espaços em branco (whitespaces) do início e/ou fim de um texto.
        jogo.processaChute($entrada.val().trim().substr(0, 1));
        $entrada.val('');
        exibeLacunas();

        if(jogo.ganhouOuPerdeu()) {
            // Gerar um "dêlei" para o usuário preencher a última letra e conseguir visualizar a palavra por completo.
            setTimeout(function() {
                if(jogo.ganhou()) {
                    alert('Parabéns, você ganhou');
                } else if (jogo.perdeu()) {
                    alert('Que pena, tente novamente')
                }
                reinicia();                    
            }, 200);
        }
    };

    var inicia = function () {
        // Esse comando faz alusão a ação de clique no "enter" do teclado que corresponde ao valor 13.
        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };

    return { inicia: inicia };
};