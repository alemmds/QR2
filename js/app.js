const pedidosMesas = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
};

const adicionarPedidoForm = document.getElementById('adicionarPedidoForm');
const mesasContainer = document.getElementById('mesasContainer');

adicionarPedidoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const mesa = document.getElementById('mesa').value;
    const nomeLanche = document.getElementById('nomeLanche').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);

    const pedido = { nomeLanche, preco, quantidade };
    pedidosMesas[mesa].push(pedido);
    atualizarMesas();
});

function atualizarMesas() {
    mesasContainer.innerHTML = '';

    Object.keys(pedidosMesas).forEach(mesa => {
        if (pedidosMesas[mesa].length > 0) {
            const divMesa = document.createElement('div');
            divMesa.classList.add('mesa');

            const tituloMesa = document.createElement('h3');
            tituloMesa.textContent = `Mesa ${mesa}`;
            divMesa.appendChild(tituloMesa);

            const listaPedidos = document.createElement('ul');
            let valorTotal = 0;

            pedidosMesas[mesa].forEach(pedido => {
                const li = document.createElement('li');
                li.textContent = `${pedido.quantidade}x ${pedido.nomeLanche} - R$${(pedido.preco * pedido.quantidade).toFixed(2)}`;
                listaPedidos.appendChild(li);
                valorTotal += pedido.preco * pedido.quantidade;
            });

            const total = document.createElement('p');
            total.innerHTML = `<strong>Valor Total: R$${valorTotal.toFixed(2)}</strong>`;
            divMesa.appendChild(listaPedidos);
            divMesa.appendChild(total);

            const qrButton = document.createElement('button');
            qrButton.textContent = 'Download QR';
            qrButton.addEventListener('click', () => gerarQRCode(mesa, valorTotal));
            divMesa.appendChild(qrButton);

            mesasContainer.appendChild(divMesa);
        }
    });
}

function gerarQRCode(mesa, valorTotal) {
    const qrCodeData = `https://meusite.com/resumo_mesa.html?mesa=${mesa}&valor=${valorTotal}`;
    const qrCodeDiv = document.createElement('div');
    new QRCode(qrCodeDiv, qrCodeData);
    mesasContainer.appendChild(qrCodeDiv);
}
