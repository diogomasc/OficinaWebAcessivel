/**
 * Módulo para controle de tamanho da fonte
 * Este script melhora a experiência do usuário, adicionando:
 * - Controles para aumentar e diminuir o tamanho da fonte
 * - Persistência das preferências do usuário
 */

document.addEventListener("DOMContentLoaded", function () {
  // Inicializa variáveis para controlar o tamanho da fonte
  const root = document.documentElement;
  let fontSize = parseInt(getComputedStyle(root).fontSize);

  // Verifica se existe um tamanho de fonte salvo no armazenamento local
  // e o aplica se existir
  if (localStorage.getItem("fontSize")) {
    fontSize = parseInt(localStorage.getItem("fontSize"));
    root.style.fontSize = fontSize + "px";
  }

  /**
   * Função para suavizar o redimensionamento
   * Usa transformação CSS para forçar a renderização suave
   */
  function smoothResize() {
    document.body.style.transform = "translateZ(0)";
    requestAnimationFrame(() => {
      document.body.style.transform = "";
    });
  }

  /**
   * Função para aumentar o tamanho da fonte
   * Limita o tamanho máximo a 24px para evitar problemas de layout
   */
  window.increaseFontSize = function () {
    smoothResize();
    // Se o tamanho atual for menor que 24px, aumenta em 2px
    if (fontSize < 24) {
      fontSize += 2;
      root.style.fontSize = fontSize + "px";
      // Salva a preferência do usuário no armazenamento local do navegador
      localStorage.setItem("fontSize", fontSize);
    }
  };

  /**
   * Função para diminuir o tamanho da fonte
   * Impede que a fonte fique menor que 12px para manter a legibilidade
   */
  window.decreaseFontSize = function () {
    smoothResize();
    // Se o tamanho atual for maior que 12px, diminui em 2px
    if (fontSize > 12) {
      fontSize -= 2;
      root.style.fontSize = fontSize + "px";
      // Salva a preferência do usuário no armazenamento local do navegador
      localStorage.setItem("fontSize", fontSize);
    }
  };
});
