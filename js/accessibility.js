// accessibility.js
document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  let fontSize = parseInt(getComputedStyle(root).fontSize);

  // Restaurar tamanho da fonte se estiver armazenado
  if (localStorage.getItem("fontSize")) {
    fontSize = parseInt(localStorage.getItem("fontSize"));
    root.style.fontSize = fontSize + "px";
  }

  function suavizarRedimensionamento() {
    document.body.style.transform = "translateZ(0)";
    requestAnimationFrame(() => {
      document.body.style.transform = "";
    });
  }

  // Funções de tamanho de fonte
  window.aumentarFonte = function () {
    suavizarRedimensionamento();
    if (fontSize < 24) {
      fontSize += 2;
      root.style.fontSize = fontSize + "px";
      localStorage.setItem("fontSize", fontSize);
    }
  };

  window.diminuirFonte = function () {
    suavizarRedimensionamento();
    if (fontSize > 12) {
      fontSize -= 2;
      root.style.fontSize = fontSize + "px";
      localStorage.setItem("fontSize", fontSize);
    }
  };

  // Função de inversão de cores corrigida
  window.inverterCores = function () {
    // Adicionar/remover classe no elemento HTML
    document.documentElement.classList.toggle("inverso");

    // Salvar preferência no localStorage
    localStorage.setItem(
      "inverso",
      document.documentElement.classList.contains("inverso")
    );
  };

  // Carregar estado de inversão ao iniciar
  if (localStorage.getItem("inverso") === "true") {
    document.documentElement.classList.add("inverso");
  }
});
