import sha256 from 'js-sha256';

const manchetes = document.querySelectorAll('.manchete');
const video = document.getElementById('video');


manchetes.forEach(manchete => {
    manchete.addEventListener('click', () => {

        video.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
});


// API CONVERSOES META

import sha256 from 'js-sha256';

const hashData = (data) => {
    return sha256(data);
};

import sha256 from 'js-sha256';

const enviarEventoConversao = async (nomeEvento, dadosUsuario, dadosCustomizados = {}) => {
    const tokenAcesso = 'EAAVRlQlHYagBOyWcBcSZBkpU58Cx9YskJwSWjZAgBffWJaiaI2IKrOmNZBheEFWdRCoMQZAXD5bQl1y7sJUxC4bt08jZChH28mZAClhZAUZARjEnq4ZB8l1qOtg4ImINHmzDrcPOfQ3xhfBmcJoOAZBZBDBzO9ibg4kMb0sZClUf8EGiqGlNYFIQX4bwyCqLEUHGZCjmmWAZDZD';
    const pixelId = '1532074744332934';
    const urlApi = `https://graph.facebook.com/v12.0/${pixelId}/events`;

    // Hash dos campos de dados do usuário, se necessário
    const dadosUsuarioHash = {
        em: dadosUsuario.email ? sha256(dadosUsuario.email) : undefined,
        ph: dadosUsuario.telefone ? sha256(dadosUsuario.telefone) : undefined,
    };

    const cargaEvento = {
        data: [
            {
                event_name: nomeEvento,
                event_time: Math.floor(Date.now() / 1000),
                action_source: 'website',
                user_data: dadosUsuarioHash,
                custom_data: {
                    currency: dadosCustomizados.moeda,  
                    value: dadosCustomizados.valor.toString()  
                }
            }
        ]
    };

    try {
        const response = await fetch(`${urlApi}?access_token=${tokenAcesso}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cargaEvento)
        });

        const resultado = await response.json();
        if (response.ok) {
            console.log('Evento enviado com sucesso:', resultado);
        } else {
            console.error('Erro ao enviar evento:', resultado);
        }
    } catch (erro) {
        console.error('Erro:', erro);
    }
};


enviarEventoConversao('Purchase', { email: 'usuario@exemplo.com', telefone: '1234567890' }, { valor: 100, moeda: 'BRL' });


