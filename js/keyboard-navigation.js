/**
 * Módulo para navegação por teclado aprimorada
 * Este script melhora a experiência do usuário, adicionando:
 * - Navegação entre elementos usando as teclas de seta
 * - Suporte aprimorado para skip links
 * - Controles de teclado para carrosséis
 */

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Melhora a funcionalidade do skip link (pular para conteúdo principal)
   * Garante que o link funcione corretamente em todos os navegadores
   */
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.setAttribute("tabindex", "-1");
        targetElement.focus();

        // Remove o tabindex depois que o elemento perder o foco
        targetElement.addEventListener(
          "blur",
          function () {
            this.removeAttribute("tabindex");
          },
          { once: true }
        );
      }
    });
  }

  // Coleta todos os elementos focáveis para navegação por teclado
  const focusableElements = Array.from(
    document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex="0"]'
    )
  ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0); // Filtra elementos visíveis

  /**
   * Adiciona suporte para navegação por teclado personalizada
   * Permite que usuários naveguem entre elementos usando as teclas de seta
   */
  document.addEventListener("keydown", function (e) {
    const activeElement = document.activeElement;
    const currentIndex = focusableElements.indexOf(activeElement);

    // Verifica se algum elemento focável está ativo
    if (currentIndex !== -1) {
      let nextIndex;

      // Determina qual ação tomar com base na tecla pressionada
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          // Se a tecla for seta para direita ou para baixo,
          // move o foco para o próximo elemento
          nextIndex = (currentIndex + 1) % focusableElements.length;
          e.preventDefault();
          focusableElements[nextIndex].focus();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          // Se a tecla for seta para esquerda ou para cima,
          // move o foco para o elemento anterior
          nextIndex =
            (currentIndex - 1 + focusableElements.length) %
            focusableElements.length;
          e.preventDefault();
          focusableElements[nextIndex].focus();
          break;
        case "Enter":
        case " ": // Espaço
          // Se a tecla for Enter ou Espaço, simula um clique no elemento
          // exceto para campos de texto onde Enter tem outra função

          // Tratamento especial para botões com onclick (como o botão de inversão de cores)
          // Não execute este bloco se o elemento já tiver seu próprio event listener para keydown
          if (
            activeElement.tagName === "BUTTON" &&
            activeElement.hasAttribute("onclick")
          ) {
            // Deixe o event listener específico do botão lidar com isso
            // (como adicionado em color-inversion.js)
            return;
          }

          if (
            (activeElement.tagName === "A" ||
              activeElement.tagName === "BUTTON" ||
              activeElement.getAttribute("role") === "button") &&
            e.key === "Enter"
          ) {
            e.preventDefault();
            activeElement.click();
          } else if (
            e.key === " " &&
            activeElement.tagName !== "INPUT" &&
            activeElement.tagName !== "TEXTAREA" &&
            !activeElement.classList.contains("no-space-action")
          ) {
            e.preventDefault();
            activeElement.click();
          }
          break;
      }
    }
  });

  /**
   * Adiciona controles de teclado específicos para carrosséis
   * Permite navegar entre slides com as teclas de seta
   */
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach(function (carousel) {
    const prevButton = carousel.querySelector(".carousel-control-prev");
    const nextButton = carousel.querySelector(".carousel-control-next");

    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        // Se a tecla for seta para esquerda, vai para o slide anterior
        e.preventDefault();
        prevButton.click();
      } else if (e.key === "ArrowRight") {
        // Se a tecla for seta para direita, vai para o próximo slide
        e.preventDefault();
        nextButton.click();
      }
    });
  });

  /**
   * Define o foco inicial na página após o carregamento
   * Melhora a acessibilidade posicionando o foco no primeiro item navegável
   */
  if (focusableElements.length > 0) {
    window.addEventListener("load", function () {
      const navLinks = document.querySelectorAll("nav a");
      if (navLinks.length > 0) {
        // Se houver links de navegação, foca no primeiro
        navLinks[0].focus();
      } else {
        // Caso contrário, foca no primeiro elemento focável
        focusableElements[0].focus();
      }
    });
  }

  /**
   * Adiciona suporte para navegação por ancoragem suave
   * Melhora a experiência de navegação pelas seções da página
   */
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Rolagem suave para o elemento
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });

        // Atualiza a URL com o hash sem recarregar a página
        history.pushState(null, null, this.getAttribute("href"));

        // Tenta chamar updateAriaCurrent se estiver disponível
        try {
          if (window.updateAriaCurrent) {
            window.updateAriaCurrent();
          }
        } catch (err) {
          console.log("Função updateAriaCurrent não disponível");
        }
      }
    });
  });
});
