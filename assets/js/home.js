(() => {
  const homepage = document.getElementById("zeli-home");

  // The rendered HTML already contains the English copy, so the page remains
  // readable if JavaScript is unavailable or this script cannot run.
  if (!homepage) return;

  const storageKey = "zeli-home-language";
  const supportedLanguages = new Set(["en", "zh"]);
  const languageButtons = homepage.querySelectorAll("[data-lang]");
  const localizedText = homepage.querySelectorAll("[data-en][data-zh]");
  const localizedLabels = homepage.querySelectorAll("[data-aria-en][data-aria-zh]");

  const readSavedLanguage = () => {
    try {
      const savedLanguage = window.localStorage.getItem(storageKey);
      return supportedLanguages.has(savedLanguage) ? savedLanguage : "en";
    } catch {
      return "en";
    }
  };

  const saveLanguage = (language) => {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // Storage may be unavailable in private browsing or restricted contexts.
    }
  };

  const applyLanguage = (language, persist = false) => {
    const nextLanguage = supportedLanguages.has(language) ? language : "en";

    localizedText.forEach((element) => {
      element.textContent = element.dataset[nextLanguage];
    });

    localizedLabels.forEach((element) => {
      element.setAttribute("aria-label", element.getAttribute(`data-aria-${nextLanguage}`));
    });

    languageButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === nextLanguage));
    });

    document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";

    if (persist) saveLanguage(nextLanguage);
  };

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang, true));
  });

  applyLanguage(readSavedLanguage());
})();
