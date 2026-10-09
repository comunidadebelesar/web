(function () {
  const buttons = document.querySelectorAll("[data-share]");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const title = button.dataset.shareTitle || document.title;
      const text = button.dataset.shareText || "Información da comunidade educativa do CEIP Plurilíngüe de Belesar";
      const url = button.dataset.shareUrl || window.location.href;
      const feedback = button.parentElement.querySelector(".share-feedback");

      try {
        if (navigator.share) {
          await navigator.share({ title, text, url });
          if (feedback) feedback.textContent = "Listo para compartir.";
        } else {
          await navigator.clipboard.writeText(url);
          if (feedback) feedback.textContent = "Ligazón copiada.";
        }
      } catch (error) {
        if (error && error.name !== "AbortError" && feedback) {
          feedback.textContent = "Non se puido compartir. Mantén premida a ligazón para copiala.";
        }
      }
    });
  });
})();
