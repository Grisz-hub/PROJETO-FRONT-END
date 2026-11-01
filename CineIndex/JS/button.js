(() => {
    const themeStorageKey = "cineindex-dark-theme";
    const darkThemeEnabled = localStorage.getItem(themeStorageKey) !== "false";

    const applyTheme = (isDark) => {
        document.documentElement.dataset.theme = isDark ? "dark" : "light";
    };

    applyTheme(darkThemeEnabled);

    document.addEventListener("DOMContentLoaded", () => {
        const themeToggle = document.querySelector("#theme-toggle");

        if (!themeToggle) {
            return;
        }

        themeToggle.checked = darkThemeEnabled;
        themeToggle.addEventListener("change", () => {
            localStorage.setItem(themeStorageKey, String(themeToggle.checked));
            applyTheme(themeToggle.checked);
        });
    });
})();