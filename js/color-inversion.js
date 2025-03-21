/**
 * Módulo para inversão de cores (alto contraste)
 * Este script melhora a experiência do usuário, adicionando:
 * - Controle para inverter as cores da página (modo de alto contraste)
 * - Persistência das preferências do usuário
 */

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Função para alternar o modo de cor invertida (alto contraste)
   * Adiciona ou remove a classe "inverso" que controla cores CSS
   */

  const inverterCoresBtn = document.querySelector(
    'button[onclick="toggleColorInversion()"]'
  );

  // Adicione um event listener específico para este botão
  if (inverterCoresBtn) {
    inverterCoresBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleColorInversion();
      }
    });
  }

  window.toggleColorInversion = function () {
    document.documentElement.classList.toggle("inverso");
    // Salva a preferência de inversão no armazenamento local como string "true" ou "false"
    localStorage.setItem(
      "inverted",
      document.documentElement.classList.contains("inverso").toString()
    );
  };

  // Aplica a inversão de cores se esta configuração estava ativa anteriormente
  // Compara com a string "true" que foi explicitamente armazenada
  if (localStorage.getItem("inverted") === "true") {
    document.documentElement.classList.add("inverso");
  }
});
