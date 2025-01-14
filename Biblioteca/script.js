const biblioteca = [];

function livro(titulo,autor,paginas,status){
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.status = status;
}

function adicionar_livro_a_biblioteca(titulo,autor,paginas,status) {
    let novo_livro = new livro(titulo,autor,paginas,status);
    biblioteca.push(novo_livro);
}

adicionar_livro_a_biblioteca('Hobbit',"Tolkien",100,'lido');
adicionar_livro_a_biblioteca('Hobbit 2',"Tolkien",150,'não lido');

const lista = document.querySelector('#livros');//lista esta no article

function criar_card(array_livro){
    lista.innerHTML = '';
    const fragmento_do_document = document.createDocumentFragment();// doc fragment melhora a performance quando escalar
    
    array_livro.forEach((card_livro, index) => {
        const div_card = document.createElement('div');
        div_card.classList.add('card');

        const titulo = document.createElement('h3');
        titulo.textContent = 'Titulo: ' + card_livro.titulo;

        const autor = document.createElement('p')
        autor.textContent = 'Autor: ' + card_livro.autor;

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

        div_card.appendChild(titulo);
        div_card.appendChild(autor);
        div_card.appendChild(btn_del);
        div_card.appendChild(btn_atualizar);

        fragmento_do_document.appendChild(div_card);
    });

    lista.appendChild(fragmento_do_document);// .prepend iria inserir antes do primeiro child
}
criar_card(biblioteca);//inicia os pre-existentes


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
        biblioteca[index_edicao].titulo = titulo_input;
        biblioteca[index_edicao].autor = autor_input;
        biblioteca[index_edicao].paginas = paginas_input;

        modo_edicao = false;
        index_edicao = null;
    } else {
        adicionar_livro_a_biblioteca(titulo_input, autor_input, paginas_input, 'não lido');
    }
    criar_card(biblioteca); // Re-renderiza os cards
    dialog.close();
});

function remover_livro(e) {
    const index = Number(e.target.getAttribute('data-index'));
    biblioteca.splice(index,1);
    criar_card(biblioteca);
}

function atualizar_livro(e) {
    index_edicao = Number(e.target.getAttribute('data-index'));
    const livro = biblioteca[index_edicao];

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

        
        criar_card(biblioteca);
        dialog.close();
    };
}

function adicionar_livro() {
    btn_criar.onclick = function (e) {
        e.preventDefault();

        titulo_input = document.getElementById('titulo').value;
        autor_input = document.getElementById('autor').value;
        paginas_input = document.getElementById('paginas').value;

        adicionar_livro_a_biblioteca(titulo_input,autor_input,paginas_input, 'nao lido ');
        criar_card(biblioteca);
        dialog.close();
    };
}