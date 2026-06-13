/**
 * AgroDireto Landing Page Engine
 * Sistema estruturado em Array de Objetos para Escalabilidade e Manutenção.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DE ACESSIBILIDADE (FONTE & CONTRASTE)
       ========================================================================== */
    const CONFIG_ACESSIBILIDADE = {
        limiteMinimo: 12,
        limiteMaximo: 24,
        passo: 1
    };

    let tamanhoFonteAtual = 16;

    const btnAumentar = document.getElementById('btn-font-increase');
    const btnDiminuir = document.getElementById('btn-font-decrease');
    const btnContraste = document.getElementById('btn-contrast');

    btnAumentar.addEventListener('click', () => {
        if ((tamanhoFonteAtual + CONFIG_ACESSIBILIDADE.passo) <= CONFIG_ACESSIBILIDADE.limiteMaximo) {
            tamanhoFonteAtual += CONFIG_ACESSIBILIDADE.passo;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if ((tamanhoFonteAtual - CONFIG_ACESSIBILIDADE.passo) >= CONFIG_ACESSIBILIDADE.limiteMinimo) {
            tamanhoFonteAtual -= CONFIG_ACESSIBILIDADE.passo;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });

    btnContraste.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    /* ==========================================================================
       2. COMPONENTE DINÂMICO: CARROSSEL DE COMPARATIVOS
       ========================================================================== */
    const DADOS_COMPARATIVOS = [
        {
            cultura: "Cultura: Soja",
            alvo: "Alvo: Ferrugem Asiática",
            marcaLider: "Fungicida de Referência (Alta Escala)",
            precoLider: "R$ 145,00 / ha",
            marcaAlternativa: "Equivalente Recomendado (Mesmo Ativo)",
            precoAlternativa: "R$ 92,00 / ha",
            economia: "Economia Directa de 36% por hectare instalado."
        },
        {
            cultura: "Cultura: Milho",
            alvo: "Alvo: Lagarta-do-Cartucho",
            marcaLider: "Inseticida Biológico de Ponta",
            precoLider: "R$ 112,00 / ha",
            marcaAlternativa: "Genérico Volumétrico Premium",
            precoAlternativa: "R$ 74,00 / ha",
            economia: "Qualidade garantida com economia de R$ 38,00 por hectare."
        },
        {
            cultura: "Cultura: Hortifrúti (Tomate/Batata)",
            alvo: "Alvo: Requeima e Míldio",
            marcaLider: "Protetor Importado Tradicional",
            precoLider: "R$ 210,00 / ha",
            marcaAlternativa: "Nacional de Alta Performance",
            precoAlternativa: "R$ 135,00 / ha",
            economia: "Ideal para o pequeno produtor que busca blindagem total com custo justo."
        }
    ];

    const containerCarrossel = document.getElementById('carousel-target');

    function renderizarCarrossel() {
        containerCarrossel.innerHTML = DADOS_COMPARATIVOS.map((item, index) => `
            <div class="carousel-item" role="group" aria-roledescription="slide" aria-label="Comparativo ${index + 1} de ${DADOS_COMPARATIVOS.length}">
                <div class="comparison-card">
                    <div class="comparison-header">
                        <h3>${item.cultura}</h3>
                        <span class="badge" style="margin-bottom:0;">${item.alvo}</span>
                    </div>
                    <div class="comparison-grid">
                        <div class="comp-box premium">
                            <h4>${item.marcaLider}</h4>
                            <p class="price-tag">${item.precoLider}</p>
                            <p style="color: var(--text-light); font-size: 0.85rem;">Foco em Grandes Áreas</p>
                        </div>
                        <div class="comp-box economico">
                            <h4>${item.marcaAlternativa}</h4>
                            <p class="price-tag" style="color: var(--primary-dark);">${item.precoAlternativa}</p>
                            <p style="color: var(--primary-dark); font-size: 0.85rem; font-weight: 600;">${item.economia}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderizarCarrossel();

    // Lógica de Movimentação do Carrossel
    let indexAtual = 0;
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');

    function atualizarPosicaoCarrossel() {
        containerCarrossel.style.transform = `translateX(-${indexAtual * 100}%)`;
    }

    btnNext.addEventListener('click', () => {
        if (indexAtual < DADOS_COMPARATIVOS.length - 1) {
            indexAtual++;
        } else {
            indexAtual = 0; // Loop back
        }
        atualizarPosicaoCarrossel();
    });

    btnPrev.addEventListener('click', () => {
        if (indexAtual > 0) {
            indexAtual--;
        } else {
            indexAtual = DADOS_COMPARATIVOS.length - 1; // Loop to end
        }
        atualizarPosicaoCarrossel();
    });

    /* ==========================================================================
       3. COMPONENTE DINÂMICO: ACORDEÃO (FAQ)
       ========================================================================== */
    const DADOS_FAQ = [
        {
            pergunta: "O defensivo equivalente/genérico possui a mesma eficácia?",
            resposta: "Sim. Os defensivos equivalentes possuem o exato mesmo ingrediente ativo, concentração e tipo de formulação que os produtos de referência. Eles passam por testes rigorosos de bioequivalência do Ministério da Agricultura antes de serem liberados para comercialização."
        },
        {
            pergunta: "Como garantir a qualidade da aplicação em grandes áreas com produtos mais em conta?",
            resposta: "O segredo da eficiência não está apenas na marca, mas na tecnologia de aplicação. Ajustes corretos de pH da água, uso de adjuvantes adequados e calibração de bicos reduzem a perda por deriva, mantendo o produto econômico ativo por mais tempo na planta."
        },
        {
            pergunta: "Existe risco de entupimento de bicos com marcas mais baratas?",
            resposta: "Produtos regulamentados de marcas alternativas passam por testes de suspensibilidade e solubilidade. Em nossa plataforma, apenas listamos e instruímos sobre marcas que cumprem o padrão ISO de formulação, eliminando o risco de decantação no tanque."
        },
        {
            pergunta: "Como faço para receber a recomendação exata para a minha lavoura?",
            resposta: "Basta preencher o formulário abaixo informando sua área total e a cultura. Nossa equipe cruzará os dados da sua região geográfica para entregar o mapa de insumos com o melhor custo-benefício disponível nos distribuidores locais."
        }
    ];

    const containerFaq = document.getElementById('faq-target');

    function renderizarFaq() {
        containerFaq.innerHTML = DADOS_FAQ.map((item, index) => `
            <div class="accordion-item">
                <button class="accordion-header" aria-expanded="false" aria-controls="faq-answer-${index}">
                    <span>${item.pergunta}</span>
                    <i class="fa-solid fa-chevron-down accordion-icon"></i>
                </button>
                <div id="faq-answer-${index}" class="accordion-content">
                    <p>${item.resposta}</p>
                </div>
            </div>
        `).join('');
    }

    renderizarFaq();

    // Lógica de Ativação do Acordeão
    const botoesAcordeon = document.querySelectorAll('.accordion-header');

    botoesAcordeon.forEach(botao => {
        botao.addEventListener('click', function() {
            const itemPai = this.parentElement;
            const itemAtivo = itemPai.classList.contains('active');
            
            // Fecha todos os itens abertos
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Se o item clicado não estava ativo, abre ele
            if (!itemAtivo) {
                itemPai.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                const painelConteudo = itemPai.querySelector('.accordion-content');
                painelConteudo.style.maxHeight = painelConteudo.scrollHeight + "px";
            }
        });
    });
});