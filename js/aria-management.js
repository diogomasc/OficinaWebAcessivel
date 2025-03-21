/**
 * Módulo para gerenciamento de atributos ARIA
 * Este script melhora a acessibilidade do site, tratando:
 * - Atualização de atributos aria-current para navegação
 * - Gerenciamento de estados para elementos interativos
 */

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");

  /**
   * Atualiza o atributo aria-current com base na URL atual
   * aria-current="page" informa aos leitores de tela qual é a página atual
   */
  window.updateAriaCurrent = function () {
    // Obtém o hash atual da URL ou usa "#seccaoUm" como padrão
    const currentHash = window.location.hash || "#seccaoUm";

    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === currentHash) {
        // Se o link corresponder ao hash atual, marca como página atual
        link.setAttribute("aria-current", "page");
      } else {
        // Remove o atributo dos outros links
        link.removeAttribute("aria-current");
      }
    });
  };

  // Atualiza o aria-current quando o hash da URL muda
  window.addEventListener("hashchange", updateAriaCurrent);
  // Executa a atualização inicial
  updateAriaCurrent();

  /**
   * Atualiza o aria-current quando um link é clicado manualmente
   * Garante que a navegação visual esteja sincronizada com a navegação por teclado
   */
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Remove o atributo de todos os links
      navLinks.forEach(function (l) {
        l.removeAttribute("aria-current");
      });
      // Adiciona o atributo ao link clicado
      this.setAttribute("aria-current", "page");
    });
  });
});
