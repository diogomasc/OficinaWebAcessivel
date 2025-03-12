/**
 * Arquivo principal de acessibilidade e interatividade da página
 * Este script melhora a experiência do usuário, adicionando:
 * - Controles de tamanho de fonte
 * - Inversão de cores para modo escuro
 * - Navegação por teclado aprimorada
 * - Acessibilidade para leitores de tela
 * - Contador de caracteres em formulários
 */

// Aguarda o carregamento completo do DOM antes de executar o código
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

  /**
   * Função para alternar o modo de cor invertida (alto contraste)
   * Adiciona ou remove a classe "inverso" que controla cores CSS
   */
  window.toggleColorInversion = function () {
    document.documentElement.classList.toggle("inverso");
    // Salva a preferência de inversão no armazenamento local
    localStorage.setItem(
      "inverted",
      document.documentElement.classList.contains("inverso")
    );
  };

  // Aplica a inversão de cores se esta configuração estava ativa anteriormente
  if (localStorage.getItem("inverted") === "true") {
    document.documentElement.classList.add("inverso");
  }

  /**
   * Adiciona estilos CSS específicos para melhorar o foco visual
   * Isso ajuda usuários que navegam com teclado a identificar o elemento selecionado
   */
  const style = document.createElement("style");
  style.textContent = `
    /* Estilo de foco para elementos interativos */
    a:focus, 
    button:focus, 
    input:focus, 
    textarea:focus, 
    [tabindex="0"]:focus {
      outline: 3px solid var(--terciaria) !important;
      outline-offset: 2px;
      box-shadow: 0 0 8px rgba(138, 179, 207, 0.8) !important;
      transition: all 0.2s ease;
    }
    
    /* Estilo de foco para botões */
    button:focus, 
    .btn-enviar:focus, 
    .btn-limpar:focus,
    .carousel-control-prev:focus,
    .carousel-control-next:focus,
    .btn-acessibilidade:focus,
    .botao-seccaoTres:focus,
    .btn-topo:focus {
      background-color: var(--quaternaria) !important;
      color: var(--branco) !important;
      transform: scale(1.05) !important;
      transition: all 0.2s ease;
    }
    
    /* Estilo de foco para links de navegação */
    nav.navegacao a:focus h5 {
      color: var(--branco) !important;
      background-color: var(--quaternaria) !important;
      transform: translateY(-2px);
      transition: all 0.2s ease;
    }
    
    /* Estilo de foco para links em linhas */
    .links-row a:focus {
      color: var(--secundaria) !important;
      background-color: var(--quaternaria) !important;
      border-radius: 4px;
      transform: translateY(-2px);
    }
    
    /* Estilo de foco para ícones de redes sociais */
    .fa-brands:focus {
      color: var(--branco) !important;
      transform: scale(1.2);
    }
  `;
  document.head.appendChild(style);

  // Coleta todos os elementos focáveis para navegação por teclado
  const focusableElements = Array.from(
    document.querySelectorAll('[tabindex="0"]')
  );

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
          // Se a tecla for Enter, simula um clique no elemento
          // exceto para campos de texto onde Enter tem outra função
          if (
            activeElement.tagName === "A" ||
            activeElement.tagName === "BUTTON"
          ) {
            e.preventDefault();
            activeElement.click();
          } else if (
            activeElement.tagName !== "INPUT" &&
            activeElement.tagName !== "TEXTAREA"
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
   * Adiciona contador de caracteres ao campo de mensagem do formulário
   * Ajuda o usuário a saber quanto texto pode adicionar
   */
  const form = document.querySelector(".formulario-contato");
  if (form) {
    const mensagemTextarea = form.querySelector("#mensagem");
    const mensagemContainer = mensagemTextarea.parentElement;

    // Cria e adiciona o contador de caracteres
    const contadorSpan = document.createElement("span");
    contadorSpan.className = "contador-caracteres";
    contadorSpan.innerHTML = "0/512 caracteres";
    mensagemContainer.appendChild(contadorSpan);

    // Define o limite de caracteres e configura o evento para atualizar o contador
    mensagemTextarea.setAttribute("maxlength", "512");
    mensagemTextarea.addEventListener("input", function () {
      const caracteresRestantes = this.value.length;
      contadorSpan.innerHTML = `${caracteresRestantes}/512 caracteres`;

      // Adiciona classes de aviso visual quando se aproxima do limite
      if (caracteresRestantes > 450) {
        // Se o número de caracteres for maior que 450, exibe um aviso
        contadorSpan.classList.add("contador-alerta");
        if (caracteresRestantes >= 512) {
          // Se o número de caracteres atingir o limite, muda o estilo do aviso
          contadorSpan.classList.add("contador-limite");
        } else {
          contadorSpan.classList.remove("contador-limite");
        }
      } else {
        contadorSpan.classList.remove("contador-alerta");
        contadorSpan.classList.remove("contador-limite");
      }
    });

    /**
     * Permite navegação do formulário com a tecla Enter
     * Facilita o preenchimento de formulários usando apenas o teclado
     */
    form.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        // Se a tecla for Enter e não estiver em uma área de texto,
        // move o foco para o próximo campo do formulário
        const inputs = Array.from(
          form.querySelectorAll("input, textarea, button")
        );
        const currentIndex = inputs.indexOf(e.target);
        if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
          e.preventDefault();
          inputs[currentIndex + 1].focus();
        }
      }
    });
  }

  /**
   * Define o foco inicial na página após o carregamento
   * Melhora a acessibilidade posicionando o foco no primeiro item navegável
   */
  if (focusableElements.length > 0) {
    window.addEventListener("load", function () {
      const navLinks = document.querySelectorAll("nav.navegacao a");
      if (navLinks.length > 0) {
        // Se houver links de navegação, foca no primeiro
        navLinks[0].focus();
      } else {
        // Caso contrário, foca no primeiro elemento focável
        focusableElements[0].focus();
      }
    });
  }
});

/**
 * Gerencia o estado de navegação e atributos ARIA para acessibilidade
 * Atualiza o atributo aria-current para indicar a seção atual da página
 */
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav.navegacao a");

  /**
   * Atualiza o atributo aria-current com base na URL atual
   * aria-current="page" informa aos leitores de tela qual é a página atual
   */
  function updateAriaCurrent() {
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
  }

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
