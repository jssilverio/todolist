const getBanco = () => JSON.parse(localStorage.getItem('lista')) ?? [];
const setBanco = (banco) => localStorage.setItem('lista', JSON.stringify(banco));

const novoItemLista = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('item');
    item.innerHTML = ` 
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="x"  data-indice=${indice}>`
    document.getElementById('lista').appendChild(item);
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({
            'tarefa': texto,
            'status': ''
        });
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const limparTela = () => {
    const lista = document.getElementById('lista');
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}

const atualizarTela = () => {
    limparTela();
    const banco = getBanco();
    banco.forEach((item, indice) => novoItemLista(item.tarefa, item.status, indice));
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

atualizarTela();

document.getElementById('novo_item').addEventListener('keypress', inserirItem);
document.getElementById('lista').addEventListener('click', clickItem);

