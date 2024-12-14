let numeroA = '';
let numeroB = '';
let operador = '';
let resultado = '';
const container = document.getElementById('container');
const tela = document.getElementById('tela');
const span = document.querySelector('#span');
const numeros = ['1','2','3','4','5','6','7','8','9','0'];
const sinais = ['+','-','*','/'];


container.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        const btn_valor = event.target.value;
        if(operador === '/' && numeroB === '0'){
            span.style.visibility = 'visible';
            clear();
        }else if(numeroA == '' && numeros.includes(btn_valor)){           
            tela.value += btn_valor; 
            numeroA = tela.value;       
        } else if(numeroA == '' && operador == '' &&  sinais.includes(btn_valor)){
            console.log('nao pode começar com sinal')

        } else if (numeroA !='' && operador == '' && numeros.includes(btn_valor)){
            tela.value += btn_valor; 
            numeroA += btn_valor;  
        } else if(numeroA !='' && operador == '' && sinais.includes(btn_valor)){
            operador = btn_valor;
            tela.value += operador;
        } else if(numeroA != '' && operador != '' && numeros.includes(btn_valor)){
            numeroB += btn_valor;
            tela.value += btn_valor
        } else if(btn_valor == 'clear'){
            clear();
        } else if(btn_valor == '='){
           if(numeroA != '' && numeroB != '' && operador != ''){
            operacao(numeroA,operador,numeroB);
            tela.value = resultado;
            numeroA = resultado;
            numeroB = '';
            operador = '';
            resultado = '';
           }else{
             return
           } 
        }else if(resultado != ''){
            numeroA = resultado;
            numeroB = '';
            operador = '';
            resultado = '';        
        }else if(numeroB != '' && sinais.includes(btn_valor)){           
            operacao(numeroA,operador,numeroB);
            tela.value = resultado; 
            numeroA = resultado;
            numeroB = '';
            operador = '';
            resultado = '';
        }    
    }
});
function clear(){
    numeroA = '';
    numeroB = '';
    operador = '';
    resultado = '';
    tela.value = '';
}
function soma(a,b){   
    resultado = parseFloat(a) + parseFloat(b);
    return resultado
}

function subtracao(a,b){
    resultado = parseFloat(a) - parseFloat(b)
    return resultado
}

function multiplicacao(a,b){
    resultado = parseFloat(a) * parseFloat(b)
    return resultado
}

function divisao(a,b){
    resultado = parseFloat(a) / parseFloat(b)
    return resultado
}

function operacao(numeroA,operador,numeroB){
    switch(operador){
        case '+':
            soma(numeroA,numeroB);
            break;
        case '-':
            subtracao(numeroA,numeroB);
            break;
        case '*':
            multiplicacao(numeroA,numeroB);
            break;
        case '/':
            divisao(numeroA,numeroB);
            break;
    };
}