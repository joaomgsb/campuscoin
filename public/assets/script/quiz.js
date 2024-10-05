document.addEventListener('DOMContentLoaded', () => {
    const perguntas = [
        {
            pergunta: "Qual é o seu principal objetivo ao investir?",
            respostas: [
                { texto: "Preservar capital", perfil: "Conservador" },
                { texto: "Gerar renda", perfil: "Moderado" },
                { texto: "Aumentar patrimônio", perfil: "Agressivo" }
            ]
        },
        {
            pergunta: "Qual é o seu horizonte de investimento?",
            respostas: [
                { texto: "Curto prazo (menos de 1 ano)", perfil: "Conservador" },
                { texto: "Médio prazo (1-5 anos)", perfil: "Moderado" },
                { texto: "Longo prazo (mais de 5 anos)", perfil: "Agressivo" }
            ]
        },
        {
            pergunta: "Como você reage a uma queda de 20% no valor dos seus investimentos?",
            respostas: [
                { texto: "Vendo tudo imediatamente", perfil: "Conservador" },
                { texto: "Espero para ver se o mercado se recupera", perfil: "Moderado" },
                { texto: "Aproveito para comprar mais", perfil: "Agressivo" }
            ]
        },
        {
            pergunta: "Qual é o seu nível de conhecimento sobre investimentos?",
            respostas: [
                { texto: "Iniciante", perfil: "Conservador" },
                { texto: "Intermediário", perfil: "Moderado" },
                { texto: "Avançado", perfil: "Agressivo" }
            ]
        },
        {
            pergunta: "Quanto do seu capital você está disposto a arriscar?",
            respostas: [
                { texto: "Menos de 10%", perfil: "Conservador" },
                { texto: "10-25%", perfil: "Moderado" },
                { texto: "Mais de 25%", perfil: "Agressivo" }
            ]
        },
        {
            pergunta: "Com que frequência você revisa seu portfólio de investimentos?",
            respostas: [
                { texto: "Mensalmente", perfil: "Agressivo" },
                { texto: "Trimestralmente", perfil: "Moderado" },
                { texto: "Anualmente", perfil: "Conservador" }
            ]
        },
        {
            pergunta: "Qual é a sua maior preocupação ao investir?",
            respostas: [
                { texto: "Perder dinheiro", perfil: "Conservador" },
                { texto: "Não alcançar os objetivos financeiros", perfil: "Moderado" },
                { texto: "Não acompanhar o mercado", perfil: "Agressivo" }
            ]
        },
        {
            pergunta: "Você prefere investimentos com:",
            respostas: [
                { texto: "Baixa volatilidade e menor retorno", perfil: "Conservador" },
                { texto: "Média volatilidade e retorno moderado", perfil: "Moderado" },
                { texto: "Alta volatilidade e maior retorno", perfil: "Agressivo" }
            ]
        },
        {
            pergunta: "Qual é a sua experiência com investimentos internacionais?",
            respostas: [
                { texto: "Nenhuma", perfil: "Conservador" },
                { texto: "Alguma", perfil: "Moderado" },
                { texto: "Muita", perfil: "Agressivo" }
            ]
        },
        {
            pergunta: "Você possui reservas de emergência?",
            respostas: [
                { texto: "Sim, equivalente a 6 meses de despesas", perfil: "Conservador" },
                { texto: "Sim, mas menos de 6 meses de despesas", perfil: "Moderado" },
                { texto: "Não", perfil: "Agressivo" }
            ]
        }
    ];

    const quiz = document.querySelector("#quiz");
    const template = document.querySelector("#quiz-template");
    const resultado = document.querySelector("#resultado span");
    const calcularButton = document.querySelector("#calcular");

    // Loop para adicionar perguntas ao quiz
    perguntas.forEach((item, index) => {
        const quizItem = template.content.cloneNode(true);
        const numeroPergunta = index + 1;
        quizItem.querySelector("h3").textContent = `${numeroPergunta}. ${item.pergunta}`;

        item.respostas.forEach((resposta, i) => {
            const dt = document.createElement('dt');
            const input = document.createElement('input');
            const span = document.createElement('span');
            input.setAttribute("type", "radio");
            input.setAttribute("name", "pergunta-" + index);
            input.value = resposta.perfil;

            span.textContent = resposta.texto;
            dt.appendChild(input);
            dt.appendChild(span);
            quizItem.querySelector("dl").appendChild(dt);
        });

        // Coloca a pergunta na tela
        quiz.appendChild(quizItem);
    });

    calcularButton.addEventListener('click', () => {
        const respostasSelecionadas = document.querySelectorAll('input[type="radio"]:checked');
        const contagemPerfis = {
            Conservador: 0,
            Moderado: 0,
            Agressivo: 0
        };

        respostasSelecionadas.forEach((resposta) => {
            contagemPerfis[resposta.value]++;
        });

        let perfilFinal = "Conservador";
        if (contagemPerfis.Moderado > contagemPerfis.Conservador && contagemPerfis.Moderado > contagemPerfis.Agressivo) {
            perfilFinal = "Moderado";
        } else if (contagemPerfis.Agressivo > contagemPerfis.Conservador && contagemPerfis.Agressivo > contagemPerfis.Moderado) {
            perfilFinal = "Agressivo";
        }

        resultado.textContent = perfilFinal;
    });
});