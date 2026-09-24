// Troca o destaque somente quando o visitante clica nos botões.
let slideAtual = 0;
const slides = document.querySelectorAll('.slide');

function trocarSlide(direcao) {
    slides[slideAtual].hidden = true;
    slideAtual = slideAtual + direcao;

    if (slideAtual >= slides.length) slideAtual = 0;
    if (slideAtual < 0) slideAtual = slides.length - 1;

    slides[slideAtual].hidden = false;

    document.getElementById('numero-slide').textContent =
        (slideAtual + 1) + ' de ' + slides.length;
}

// Remove acentos para que "Acao" e "Ação" sejam comparados da mesma forma.
function prepararTexto(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buscarFilmes() {
    const busca = prepararTexto(document.getElementById('pesquisa').value.trim());
    let encontrados = [];

    document.querySelectorAll('.filmes').forEach(function(secao) {
        let visiveis = 0;

        secao.querySelectorAll('.filme').forEach(function(filme) {
            const titulo = filme.querySelector('h3').textContent;
            const mostrar = prepararTexto(titulo).includes(busca);

            filme.style.display = mostrar ? '' : 'none';

            if (mostrar) {
                visiveis++;

                if (!encontrados.includes(titulo)) {
                    encontrados.push(titulo);
                }
            }
        });

        secao.hidden = visiveis === 0;
    });

    document.getElementById('resultado-busca').textContent = busca === '' ? '' :
        encontrados.length === 0 ? 'Nenhum filme encontrado. Tente outro nome.' :
        'Filmes encontrados: ' + encontrados.length;
}

document.getElementById('form-busca').addEventListener('submit', function(evento) {
    evento.preventDefault();
    buscarFilmes();

    document.getElementById('resultado-busca').scrollIntoView({
        block: 'center'
    });
});

document.getElementById('pesquisa').addEventListener('input', buscarFilmes);