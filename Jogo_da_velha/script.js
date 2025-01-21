function tabuleiro_do_jogo(){
    const fileiras = 3;
    const colunas = 3;
    const tabuleiro = [];

    for(let i=0;i < fileiras;i++){
        tabuleiro[i] = [];
        for(let j=0;j < colunas;j++){
            //adicionar x o ao array
            tabuleiro[i].push(celula());
        }
    }

    const pegar_tabuleiro = () => tabuleiro ;// usado pra recuperar o array do tabuleiro usando closure

    const colocar_token_celula = (fileira,coluna,jogador) =>{ //adiciona o token numa celula
        //celula_disponivel = () => {
            if(tabuleiro[fileira][coluna].pegar_valor() === 0) {
                tabuleiro[fileira][coluna].pegar_token(jogador);
            } else {
                console.log('celula ocupada!');// precisa manter o token do mesmo jogador ao inves de trocar turno
            }
        //};
    };

    const imprimir_tabuleiro = () => { //percorre os arrays e recupera os valores das celulas
        const tabuleiro_com_valores = tabuleiro.map((fileira) => fileira.map((celula) => celula.pegar_valor()));
        console.log(tabuleiro_com_valores);
    };

    return { pegar_tabuleiro, colocar_token_celula, imprimir_tabuleiro};
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
    jogador1_nome = "jogador 1",
    jogador2_nome = "jogador 2"
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

    const jogar_rodada = (fileira,coluna) => {
        console.log(`colocando a ficha do ${pegar_jogador_ativo().nome} na celula ${fileira +", "+ coluna}...`);
    
    tabuleiro.colocar_token_celula(fileira,coluna, pegar_jogador_ativo().token);

    troca_turno_jogador();
    imprimir_nova_rodada();
    };

    imprimir_nova_rodada();

    return {
        jogar_rodada,
        pegar_jogador_ativo
    
    };
};

const jogo = game_controller();