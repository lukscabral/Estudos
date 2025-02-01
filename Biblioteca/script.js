class Livro {
    constructor(titulo,autor,paginas,status){
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
        this.status = status;
    }
}
class Biblioteca {
    constructor(){
        this.livros = [];
    }
    adicionar_livro_a_biblioteca(titulo,autor,paginas,status) {
        let novo_livro = new Livro(titulo,autor,paginas,status);
        this.livros.push(novo_livro);
        console.log(`adicionado: ${titulo} ${autor} ${paginas} ${status}`)
    }
}
const estante = new Biblioteca();
estante.adicionar_livro_a_biblioteca('Hobbit',"Tolkien",100,'Status de leitura: não lido');
estante.adicionar_livro_a_biblioteca('Hobbit 2',"Tolkien",150,'Status de leitura: não lido');

const lista = document.querySelector('#livros');//lista esta no article

function criar_card(array_livro){
    lista.innerHTML = '';
    const fragmento_do_document = document.createDocumentFragment();// doc fragment melhora a performance quando escalar
    
    array_livro.forEach((card_livro, index) => {
        const div_card = document.createElement('div');
        div_card.classList.add('card');
        const div_btn = document.createElement('div');//div dentro de .card pro btn
        const div_content = document.createElement('div');
        div_content.classList.add('info');

        const titulo = document.createElement('h3');
        titulo.textContent = 'Titulo: ' + card_livro.titulo;

        const autor = document.createElement('p')
        autor.textContent = 'Autor: ' + card_livro.autor;

        const paginas = document.createElement('p');
        paginas.textContent = 'Numero de paginas: ' + card_livro.paginas;

        const status = document.createElement('p');
        status.textContent = card_livro.status;

        const btn_del = document.createElement('button');
        btn_del.classList.add('deletar');
        btn_del.textContent = 'Deletar livro';
        btn_del.setAttribute('data-index', index); // Adiciona o índice como data attribute
        btn_del.addEventListener('click', remover_livro);

         // Botão de atualizar com data-index
        const btn_atualizar = document.createElement('button');
        btn_atualizar.textContent = 'Atualizar';
        btn_atualizar.setAttribute('data-index', index); // Adiciona o índice como data attribute
        btn_atualizar.addEventListener('click', atualizar_livro);

        const btn_status = document.createElement("button");
        btn_status.textContent = "Lido / Não lido";
        btn_status.setAttribute('data-index', index);
        btn_status.addEventListener('click' , toggle_status);
        div_card.appendChild(div_content);
        div_content.appendChild(titulo);
        div_content.appendChild(autor);
        div_content.appendChild(paginas);
        div_content.appendChild(status);
        div_card.appendChild(div_btn);
        div_btn.appendChild(btn_status);
        div_btn.appendChild(btn_del);
        div_btn.appendChild(btn_atualizar);

        fragmento_do_document.appendChild(div_card);
    });

    lista.appendChild(fragmento_do_document);// .prepend iria inserir antes do primeiro child
}
criar_card(estante.livros);//inicia os cards exemplos pre-existentes


const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const jsCloseBtn = dialog.querySelector("#js-close");
const btn_criar = dialog.querySelector('#criar');
let titulo_input;
let autor_input;
let paginas_input;

let modo_edicao = false;
let index_edicao = null;

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

jsCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  dialog.close();
});
btn_criar.addEventListener('click', (e) => {
    e.preventDefault();

    titulo_input = document.getElementById('titulo').value;
    autor_input = document.getElementById('autor').value;
    paginas_input = document.getElementById('paginas').value;

    if(modo_edicao) {
        estante.livros[index_edicao].titulo = titulo_input;
        estante.livros[index_edicao].autor = autor_input;
        estante.livros[index_edicao].paginas = paginas_input;

        modo_edicao = false;
        index_edicao = null;
    } else {
        estante.adicionar_livro_a_biblioteca(titulo_input, autor_input, paginas_input, 'Status de leitura: não lido');
    }
    criar_card(estante.livros); // Re-renderiza os cards
    dialog.close();
});

function remover_livro(e) {
    const index = Number(e.target.getAttribute('data-index'));
    estante.livros.splice(index,1);
    criar_card(estante.livros);
}

function atualizar_livro(e) {
    index_edicao = Number(e.target.getAttribute('data-index'));
    const livro = estante.livros[index_edicao];

    document.getElementById('titulo').value = livro.titulo;
    document.getElementById('autor').value = livro.autor;
    document.getElementById('paginas').value = livro.paginas;

    modo_edicao = true;
    dialog.showModal();

    btn_criar.onclick = function (e) {
        e.preventDefault();

        livro.titulo = document.getElementById('titulo').value;
        livro.autor = document.getElementById('autor').value;
        livro.paginas = document.getElementById('paginas').value;

        
        criar_card(estante.livros);
        dialog.close();
    };
}

function adicionar_livro() {
    btn_criar.onclick = function (e) {
        e.preventDefault();

        titulo_input = document.getElementById('titulo').value;
        autor_input = document.getElementById('autor').value;
        paginas_input = document.getElementById('paginas').value;

        estante.adicionar_livro_a_biblioteca(titulo_input,autor_input,paginas_input, 'Status de leitura: não lido');
        criar_card(estante.livros);
        dialog.close();
    };
} 

function toggle_status(e){
    index_edicao = Number(e.target.getAttribute('data-index'));
    const livro = estante.livros[index_edicao];

    livro.status = livro.status === 'Status de leitura: lido' ? 'Status de leitura: não lido' : 'Status de leitura: lido' ;
    criar_card(estante.livros);
}