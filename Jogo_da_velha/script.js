function tabuleiro_do_jogo(){
    const fileiras = 3;
    const colunas = 3;
    const tabuleiro = [];

    for(let i=0;i < fileiras;i++){
        tabuleiro[i] = [];
        for(let j=0;j < colunas;j++){
            //adicionar x e o ao array
            tabuleiro[i].push(celula());
        }
    }

    const pegar_tabuleiro = () => tabuleiro ;// usado pra recuperar o array do tabuleiro usando closure

    const colocar_token_celula = (fileira,coluna,jogador) =>{   
                tabuleiro[fileira][coluna].pegar_token(jogador);
    };

    const imprimir_tabuleiro = () => { //percorre os arrays e recupera os valores das celulas
        const tabuleiro_com_valores = tabuleiro.map((fileira) => fileira.map((celula) => celula.pegar_valor()));
        console.log(tabuleiro_com_valores);
    };

    return { pegar_tabuleiro, colocar_token_celula, imprimir_tabuleiro };
}

function celula(){
    let valor = 0;

    const pegar_token = (jogador) => { //adiciona o valor do token
        valor = jogador;
    };

    const pegar_valor = () => valor;

    return {
        pegar_token,
        pegar_valor
    };
}

function game_controller(
    jogador1_nome = "Jogador 1", //prompt("Digite o nome do jogador 1"),
    jogador2_nome = "Jogador 2"
) {
    const tabuleiro = tabuleiro_do_jogo();

    const jogadores = [
        {
            nome: jogador1_nome,
            token:1
        },
        {
            nome: jogador2_nome,
            token:2
        }
    ];

    let jogador_ativo = jogadores[0];

    const troca_turno_jogador = () => {
        jogador_ativo = jogador_ativo === jogadores[0] ? jogadores[1] : jogadores[0];
    };

    const pegar_jogador_ativo = () => jogador_ativo;

    const imprimir_nova_rodada = () => {
        tabuleiro.imprimir_tabuleiro();
        console.log(`turno do ${pegar_jogador_ativo().nome}`);
    };

    const checar_vencedor = (tabuleiro) => {
        const fileiras = tabuleiro.map((fileira) => fileira.map((celula) => celula.pegar_valor()));

        const colunas = Array.from({length: 3}, (_, i) => fileiras.map((fileira) => fileira[i]));

        const diagonais = [
            [tabuleiro[0][0].pegar_valor(), tabuleiro[1][1].pegar_valor(), tabuleiro[2][2].pegar_valor()],
            [tabuleiro[0][2].pegar_valor(), tabuleiro[1][1].pegar_valor(), tabuleiro[2][0].pegar_valor()],
        ];
        
        const combinacoes_possiveis = [...fileiras, ...colunas, ...diagonais];

        for(const combinacao of combinacoes_possiveis){
            if (combinacao[0] !== 0 && combinacao.every((valor) => valor === combinacao[0])) {
                return combinacao[0];  
            }
        }
        return null
    }

    const checar_empate = (tabuleiro) => {
        return tabuleiro.every((fileira) => fileira.every((celula) => celula.pegar_valor() !== 0));
    };

    const jogar_rodada = (fileira,coluna) => {
        console.log(`colocando a ficha do ${pegar_jogador_ativo().nome} na celula ${fileira +", "+ coluna}...`);

        const tabuleiro_real = tabuleiro.pegar_tabuleiro();
        const celulaxy = tabuleiro_real[fileira][coluna]; //pega coord da celula
        
        if(celulaxy.pegar_valor() !== 0) {//se nao tiver vazia volta jogada pro msm player
            console.log('celula ocupada!');
            return imprimir_nova_rodada();
        }

        tabuleiro.colocar_token_celula(fileira,coluna,pegar_jogador_ativo().token);
        
        const vencedor = checar_vencedor(tabuleiro_real);

        if(vencedor) {
            console.log(`Parabéns! ${jogadores.find((jogador) => jogador.token === vencedor).nome} venceu!`);
            tabuleiro.imprimir_tabuleiro();
            return;
        }

        if(checar_empate(tabuleiro_real)) {
            console.log("Empate! O tabuleiro está cheio.");
            tabuleiro.imprimir_tabuleiro();
            return;
        }

        troca_turno_jogador();
        imprimir_nova_rodada();
    };

    imprimir_nova_rodada();

    return {
        jogar_rodada,
        pegar_jogador_ativo,
        pegar_tabuleiro: tabuleiro.pegar_tabuleiro   
    };
};

function screen_controller() {
    const jogo = game_controller();
    const turno_jogador_div = document.querySelector('.turno');
    const tabuleiro_div = document.querySelector('.tabuleiro');

    const atualizar_tela = () => {

        tabuleiro_div.textContent = "";

        const tabuleiro = jogo.pegar_tabuleiro();
        const jogador_ativo = jogo.pegar_jogador_ativo();

        turno_jogador_div.textContent = `Turno do ${jogador_ativo.nome}...` ;

        tabuleiro.forEach(fileira => { 
            fileira.forEach((celula,index) => {
                const celula_btn = document.createElement("button");
                celula_btn.classList.add("celula");
                //atribuindo atributo data xy
                celula_btn.dataset.row = tabuleiro.indexOf(fileira);
                celula_btn.dataset.column = index ; 
                celula_btn.textContent = celula.pegar_valor();
                tabuleiro_div.appendChild(celula_btn);  
                })
            })
        }

    function tabuleiro_clicavel(e) {
        const fileira_selecionada = e.target.dataset.row;
        const coluna_selecionada = e.target.dataset.column;
        
        if( fileira_selecionada === undefined || coluna_selecionada === undefined) return;//evitar click entre as celulas

        jogo.jogar_rodada(parseInt(fileira_selecionada), parseInt(coluna_selecionada));
        atualizar_tela();
    }

    tabuleiro_div.addEventListener("click", tabuleiro_clicavel);

    atualizar_tela();

}

screen_controller();