function tabuleiro_do_jogo(){
    const fileiras = 3;
    const colunas = 3;
    const tabuleiro = [];

    for(let i=0;i < fileiras;i++){
        tabuleiro[i] = [];
        for(let j=0;j < colunas;j++){
            tabuleiro[i].push(celula());
        }
    }

    const pegar_tabuleiro = () => tabuleiro;

    const colocar_token_celula = (fileira,coluna,jogador) =>{   
                tabuleiro[fileira][coluna].pegar_token(jogador);
    };
    return { pegar_tabuleiro, colocar_token_celula };
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
    jogador1_nome = 'Jogador 1',
    jogador2_nome = 'Jogador 2'
) {
    const tabuleiro = tabuleiro_do_jogo();  
    const jogadores = [
        {
            nome: jogador1_nome,
            token:'X'
        },
        {
            nome: jogador2_nome,
            token:'O'
        },
    ];

    let jogador_ativo = jogadores[0];
    let resultado = { vencedor: null};

    const pegar_resultado = () => resultado; //pegar o vencedor

    const troca_turno_jogador = () => {
        jogador_ativo = jogador_ativo === jogadores[0] ? jogadores[1] : jogadores[0];
    };

    const pegar_jogador_ativo = () => jogador_ativo;

    const checar_vencedor = (tabuleiro_real) => {
        const fileiras = tabuleiro_real.map((fileira) => 
            fileira.map((celula) => celula.pegar_valor()));

        const colunas = Array.from({length: 3}, (_, i) => 
            fileiras.map((fileira) => fileira[i]));

        const diagonais = [
            [fileiras[0][0], fileiras[1][1], fileiras[2][2]],
            [fileiras[0][2], fileiras[1][1], fileiras[2][0]],
        ];
        
        const combinacoes_possiveis = [...fileiras, ...colunas, ...diagonais];

        for(const combinacao of combinacoes_possiveis){
            if (combinacao[0] !== 0 && combinacao.every((valor) => valor === combinacao[0])) {
                return combinacao[0];  
            }
        }
        return null;
    }

    const checar_empate = () => {
        const tabuleiro_real = tabuleiro.pegar_tabuleiro();
        return tabuleiro_real.every((fileira) => 
            fileira.every((celula) => celula.pegar_valor() !== 0));
    };

    const jogar_rodada = (fileira,coluna) => {

        if(resultado.vencedor){
            return;
        }

        const tabuleiro_real = tabuleiro.pegar_tabuleiro();
        const celulaxy = tabuleiro_real[fileira][coluna];
        
        if(celulaxy.pegar_valor() !== 0) {
            return;
        }

        tabuleiro.colocar_token_celula(fileira,coluna, jogador_ativo.token);
        
        const vencedor = checar_vencedor(tabuleiro_real);

        if(vencedor) {
            resultado.vencedor = vencedor;           
            return;
        }

        if(checar_empate()) {
            resultado.vencedor = "empate"
            return;
        }
        troca_turno_jogador();
    };
    return {
        pegar_resultado,
        jogar_rodada,
        pegar_jogador_ativo,
        pegar_tabuleiro: tabuleiro.pegar_tabuleiro, 
    };
};

function screen_controller() {
    const jogo = game_controller();
    const turno_jogador_div = document.querySelector('.turno');
    const tabuleiro_div = document.querySelector('.tabuleiro');

    const atualizar_tela = () => {
        const tabuleiro = jogo.pegar_tabuleiro();
        const resultado_jogo = jogo.pegar_resultado();
        const jogador_ativo = jogo.pegar_jogador_ativo();

        tabuleiro.forEach((fileira, index_fileira) => { 
            fileira.forEach((celula, index_coluna) => {
                let celula_btn = document.querySelector(
                    `.celula[data-row="${index_fileira}"][data-column="${index_coluna}"]`
                );
                if(!celula_btn){
                    celula_btn = document.createElement("button");
                    celula_btn.classList.add("celula");
                    celula_btn.dataset.row = index_fileira;
                    celula_btn.dataset.column = index_coluna;
                    tabuleiro_div.appendChild(celula_btn);  
                }
                celula_btn.textContent = celula.pegar_valor() || "";
                });
            });   

            if(resultado_jogo.vencedor) {
                if(resultado_jogo.vencedor === "empate") {
                    turno_jogador_div.textContent = "EmpaAaAateeeeeeeeeee!"
                } else {
                    turno_jogador_div.textContent = `Parabens! ${jogador_ativo.nome} venceu!`
                }
                return;
            }   

            turno_jogador_div.textContent = `Turno do ${jogador_ativo.nome}...` ;
        }
        
    tabuleiro_div.addEventListener("click", (e) => {
        const resultado_jogo = jogo.pegar_resultado();
        if(resultado_jogo.vencedor) return;//nao permite mais click

        const fileira_selecionada = parseInt(e.target.dataset.row,10);
        const coluna_selecionada = parseInt(e.target.dataset.column, 10);
        
        if (isNaN(fileira_selecionada) || isNaN(coluna_selecionada)) return;

        jogo.jogar_rodada(fileira_selecionada, coluna_selecionada);
        atualizar_tela();
    });

    atualizar_tela();
}
screen_controller();