/**
 * Módulo para controles de formulário
 * Este script melhora a experiência do usuário, adicionando:
 * - Contador de caracteres para áreas de texto
 * - Navegação aprimorada em formulários
 */

document.addEventListener("DOMContentLoaded", function () {
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
});
