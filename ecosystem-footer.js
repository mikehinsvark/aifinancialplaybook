(() => {
  async function mountEcosystemFooter() {
    if (document.getElementById("dreams-ecosystem-footer")) return;

    try {
      const response = await fetch("/ecosystem-footer.html", { cache: "force-cache" });
      if (!response.ok) throw new Error(`Footer request failed: ${response.status}`);

      const markup = await response.text();
      const parsed = new DOMParser().parseFromString(markup, "text/html");
      const footer = parsed.body.firstElementChild;
      if (!footer || footer.id !== "dreams-ecosystem-footer") {
        throw new Error("Footer markup is missing its expected root element.");
      }

      document.body.appendChild(document.importNode(footer, true));
      document.documentElement.classList.add("ecosystem-footer-ready");
    } catch (error) {
      console.error("Unable to mount the ecosystem footer; keeping the existing footer visible.", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountEcosystemFooter, { once: true });
  } else {
    mountEcosystemFooter();
  }
})();
