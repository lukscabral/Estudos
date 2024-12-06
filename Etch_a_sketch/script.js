const container = document.querySelector("#container");
const content = document.createElement("div");
let root = document.documentElement;
let grid = 0;
let x = 1;
let mouse_pressionado = false;

function opacidade(){
    x = parseFloat(prompt('Escolha o incremento de opacidade(entre 0.1 e 1)'));
    if(x < 0.1 || x > 1){
    opacidade();
    }
}

function RGBcolor() {
    gridfunc()   
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);
    let randomcolor = "rgb(" + R + "," + G + "," + B + 0 +")";
    root.style.setProperty('--gridbg', randomcolor);   
}

function black(){
    gridfunc();
    root.style.setProperty('--gridbg', 'black'); 
}

function gridfunc(){
    container.innerText= '';//reset do grid
    grid = prompt('qual o tamanho do grid?ex:10 = 10x10')
    if(grid <=100 && grid > 0){
        root.style.setProperty('--gridjs', grid);
        for(let i= 1;i <= grid;i++){
            for(let j= 1;j <= grid;j++){
                const cell = content.cloneNode(true);
                cell.dataset.opacity = 0; // Inicializar opacidade individual
                container.appendChild(cell);
            }
        };
    } else {
        gridfunc();
    }
}

content.classList.add("content");
content.setAttribute('id','minhaid');

//eventos para o click/arrasta
container.addEventListener('mousedown', (event) =>{
    mouse_pressionado = true;
    desenho(event);
});
container.addEventListener('mouseup', ()=>{
    mouse_pressionado = false;
})
container.addEventListener('mousemove', (event)=> {
    if(mouse_pressionado === true){
        desenho(event);
    }
});

function desenho(event){
    if (event.target.id === 'minhaid') {        
        opacidade_atual = parseFloat(event.target.dataset.opacity); // Obter opacidade atual
        if (opacidade_atual < 1) {
        opacidade_atual = Math.min(opacidade_atual + x, 1); // Incrementar até o máximo de 1
        event.target.dataset.opacity = opacidade_atual; // Atualizar o dataset
        event.target.style.opacity = opacidade_atual.toString();
   
        };
    };
};