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

biblioteca.forEach(element => {
    console.log(element)//ta mostrando cada elemento de livro no console
});

//mostrar na tela cada livro atraves de algo(ul li? table? card?)