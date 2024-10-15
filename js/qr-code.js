function gerarQRCode(mesa, valorTotal) {
    const qrCodeData = `https://meusite.com/resumo_mesa.html?mesa=${mesa}&valor=${valorTotal}`;
    
    const qrContainer = document.getElementById(`qrcode-mesa-${mesa}`) || document.createElement('div');
    qrContainer.id = `qrcode-mesa-${mesa}`;
    qrContainer.classList.add('qrCodeContainer');

    // Limpa o QR Code anterior
    qrContainer.innerHTML = '';

    new QRCode(qrContainer, {
        text: qrCodeData,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Adiciona o botão de download
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download QR';
    downloadButton.addEventListener('click', () => {
        const qrCodeCanvas = qrContainer.querySelector('canvas');
        if (qrCodeCanvas) {
            const imgData = qrCodeCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `Mesa_${mesa}_QRCode.png`;
            link.click();
        }
    });

    qrContainer.appendChild(downloadButton);

    const mesaDiv = document.getElementById(`mesa-${mesa}`);
    mesaDiv.appendChild(qrContainer);
}
