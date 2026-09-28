// Regras de situação (ajuste conforme o regimento da escola)
const MEDIA_APROVACAO = 7;
const MEDIA_RECUPERACAO = 5;

const formulario = document.getElementById("formulario");
const campos = [
  document.getElementById("nota1"),
  document.getElementById("nota2"),
  document.getElementById("nota3"),
];
const caixa = document.getElementById("resultado");
const valor = document.getElementById("valor");
const situacao = document.getElementById("situacao");
const botaoLimpar = document.getElementById("limpar");

function mostrar(texto, mensagem, classe) {
  valor.textContent = texto;
  situacao.textContent = mensagem;
  caixa.className = "resultado " + (classe || "");
  // reinicia a animação
  void caixa.offsetWidth;
  caixa.classList.add("pulso");
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const notas = campos.map((c) => parseFloat(c.value.replace(",", ".")));
  let valido = true;

  campos.forEach((campo, i) => {
    const nota = notas[i];
    const erro = isNaN(nota) || nota < 0 || nota > 10;
    campo.classList.toggle("invalido", erro);
    if (erro) valido = false;
  });

  if (!valido) {
    mostrar("–", "Digite notas de 0 a 10", "");
    return;
  }

  const media = notas.reduce((soma, n) => soma + n, 0) / notas.length;
  const texto = media.toFixed(1).replace(".", ",");

  if (media >= MEDIA_APROVACAO) {
    mostrar(texto, "Aprovado! 🎉", "aprovado");
  } else if (media >= MEDIA_RECUPERACAO) {
    mostrar(texto, "Recuperação", "recuperacao");
  } else {
    mostrar(texto, "Reprovado", "reprovado");
  }
});

botaoLimpar.addEventListener("click", () => {
  formulario.reset();
  campos.forEach((c) => c.classList.remove("invalido"));
  valor.textContent = "–";
  situacao.textContent = "Sua média aparece aqui";
  caixa.className = "resultado";
  campos[0].focus();
});