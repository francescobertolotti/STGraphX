(() => {
  "use strict";

  const chapters = [
    ["01-introduzione-del-corso", "01-introduzione-del-corso.md", "Introduzione del corso"],
    ["02-modellizzare-qualitativamente", "02-modellizzare-qualitativamente.md", "Modellizzare qualitativamente"],
    ["03-modellizzare-quantitativamente", "03-modellizzare-quantitativamente.md", "Modellizzare quantitativamente"],
    ["04-linee-guida-sistemi-dinamici", "04-linee-guida-sistemi-dinamici.md", "Linee guida per i sistemi dinamici"],
    ["05-sotto-teorie", "05-sotto-teorie.md", "Sotto teorie"],
    ["06-modellizzare-sistemi-sociali", "06-modellizzare-sistemi-sociali.md", "Modellizzare sistemi sociali"],
    ["07-utilizzare-un-modello", "07-utilizzare-un-modello.md", "Utilizzare un modello"],
  ].map(([folder, file, title], index) => ({ id: `capitolo-${index + 1}`, folder, file, title }));

  const content = document.getElementById("book-content");
  const nav = document.getElementById("book-chapters");
  const search = document.getElementById("book-search");
  const sidebar = document.getElementById("book-sidebar");
  const menuButton = document.querySelector(".book-menu-button");
  const notePopover = document.getElementById("book-note-popover");
  const notePopoverContent = document.getElementById("book-note-popover-content");
  const noteCloseButton = notePopover.querySelector(".book-note-close");
  let activeChapter = null;
  let activeFootnotes = new Map();
  let activeFootnoteButton = null;

  const escapeHtml = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const safeId = (value) => String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
  const assetUrl = (url, chapter) => /^(?:[a-z]+:|\/|#)/iu.test(url) ? url : `${chapter.folder}/${url}`;

  function inlineMarkdown(source, chapter, footnotes) {
    let text = escapeHtml(source.replace(/\\'/g, "'"));
    text = text.replace(/!\[([^\]]*)\]\(([^ )]+)(?:\s+&quot;[^&]*&quot;)?\)(?:\{[^}]*\})?/g, (_all, alt, url) => `<img src="${assetUrl(url, chapter)}" alt="${alt}" loading="lazy" />`);
    text = text.replace(/\[\[([^\]]+)\]\{([^}]*)\}\]\(([^ )]+)\)/g, (_all, label, attributes, url) => {
      const className = /(?:^|\s)\.underline(?:\s|$)/u.test(attributes) ? ' class="book-underline"' : "";
      return `<a${className} href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
    });
    text = text.replace(/\[([^\]]+)\]\{([^}]*)\}/g, (_all, label, attributes) => (
      /(?:^|\s)\.underline(?:\s|$)/u.test(attributes) ? `<span class="book-underline">${label}</span>` : label
    ));
    text = text.replace(/\[([^\]]+)\]\(([^ )]+)\)/g, (_all, label, url) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`);
    text = text.replace(/\[\^([^\]]+)\]/g, (_all, key) => {
      if (!footnotes.order.includes(key)) footnotes.order.push(key);
      const number = footnotes.order.indexOf(key) + 1;
      return `<button class="footnote-ref" type="button" data-footnote="${safeId(key)}" aria-label="Apri nota ${number}">${number}</button>`;
    });
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return text.replace(/\\$/g, "<br />");
  }

  function extractFootnotes(markdown) {
    const definitions = new Map();
    const body = markdown.replace(/^\[\^([^\]]+)\]:\s*(.+)$/gmu, (_all, key, value) => {
      definitions.set(key, value.trim());
      return "";
    });
    return { body, definitions, order: [] };
  }

  function renderMarkdown(markdown, chapter) {
    const footnotes = extractFootnotes(markdown);
    const lines = footnotes.body.replace(/\r\n?/g, "\n").split("\n");
    const blocks = [];
    let index = 0;
    const isBlank = (line) => !line.trim();

    while (index < lines.length) {
      const line = lines[index];
      if (isBlank(line)) { index += 1; continue; }
      if (/^\+[-+]+\+\s*$/u.test(line)) {
        const callout = [];
        index += 1;
        while (index < lines.length && !/^\+[-+]+\+\s*$/u.test(lines[index])) {
          if (/^\|/u.test(lines[index])) callout.push(lines[index].replace(/^\|\s?/u, "").replace(/\s?\|\s*$/u, "").trim());
          index += 1;
        }
        if (index < lines.length) index += 1;
        blocks.push(`<aside class="book-callout">${callout.filter(Boolean).map((item) => `<p>${inlineMarkdown(item, chapter, footnotes)}</p>`).join("")}</aside>`);
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.+)$/u);
      if (heading) {
        const level = heading[1].length;
        const title = heading[2].replace(/\s+\{#([^}]+)\}\s*$/u, "");
        const id = (heading[2].match(/\{#([^}]+)\}\s*$/u) || [])[1] || (level === 2 ? `section-${safeId(title)}` : "");
        blocks.push(`<h${level}${id ? ` id="${safeId(id)}"` : ""}>${inlineMarkdown(title, chapter, footnotes)}</h${level}>`);
        index += 1;
        continue;
      }
      if (/^```/u.test(line)) {
        const code = [];
        index += 1;
        while (index < lines.length && !/^```/u.test(lines[index])) code.push(lines[index++]);
        if (index < lines.length) index += 1;
        blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        continue;
      }
      const player = line.match(/^\{\{dsgraph-player\s+([^\s}]+)\s*\}\}$/u);
      if (player) {
        blocks.push(`<stgraphx-player class="book-model-player" src="${assetUrl(player[1], chapter)}" lang="en" zoom="0.82" controls="full"></stgraphx-player>`);
        index += 1;
        continue;
      }
      if (/^>\s?/u.test(line)) {
        const quote = [];
        while (index < lines.length && /^>\s?/u.test(lines[index])) quote.push(lines[index++].replace(/^>\s?/u, ""));
        blocks.push(`<blockquote>${inlineMarkdown(quote.join(" "), chapter, footnotes)}</blockquote>`);
        continue;
      }
      const list = line.match(/^\s*([-*+] |\d+\. )(.+)$/u);
      if (list) {
        const ordered = /^\s*\d+\. /u.test(line);
        const items = [];
        while (index < lines.length && /^\s*(?:[-*+] |\d+\. )/u.test(lines[index])) items.push(lines[index++].replace(/^\s*(?:[-*+] |\d+\. )/u, ""));
        const tag = ordered ? "ol" : "ul";
        blocks.push(`<${tag}>${items.map((item) => `<li>${inlineMarkdown(item, chapter, footnotes)}</li>`).join("")}</${tag}>`);
        continue;
      }
      const image = line.match(/^!\[([^\]]*)\]\(([^ )]+)[^)]*\)(?:\{[^}]*\})?$/u);
      if (image) {
        blocks.push(`<figure><img src="${assetUrl(image[2], chapter)}" alt="${image[1]}" loading="lazy" /></figure>`);
        index += 1;
        continue;
      }
      const paragraph = [];
      while (index < lines.length && !isBlank(lines[index]) && !/^(#{1,6})\s|^```|^\{\{dsgraph-player\s+[^\s}]+\s*\}\}$|^>\s?|^\s*(?:[-*+] |\d+\. )|^\+[-+]+\+\s*$/u.test(lines[index])) paragraph.push(lines[index++].trim());
      const text = paragraph.join(" ");
      if (/^\*[^*]+\*$/u.test(text) && blocks.length && /<figure>/u.test(blocks[blocks.length - 1])) {
        blocks[blocks.length - 1] = blocks[blocks.length - 1].replace("</figure>", `<figcaption>${inlineMarkdown(text.slice(1, -1), chapter, footnotes)}</figcaption></figure>`);
      } else if (text) {
        blocks.push(`<p>${inlineMarkdown(text, chapter, footnotes)}</p>`);
      }
    }
    activeFootnotes = new Map(footnotes.order.filter((key) => footnotes.definitions.has(key)).map((key) => [safeId(key), inlineMarkdown(footnotes.definitions.get(key), chapter, footnotes)]));
    const noteItems = footnotes.order.filter((key) => footnotes.definitions.has(key)).map((key) => `<li id="note-${safeId(key)}">${inlineMarkdown(footnotes.definitions.get(key), chapter, footnotes)}</li>`);
    if (noteItems.length) blocks.push(`<section class="book-footnotes"><h2>Note</h2><ol>${noteItems.join("")}</ol></section>`);
    return blocks.join("\n");
  }

  function renderNavigation(query = "") {
    const needle = query.trim().toLocaleLowerCase("it");
    const activeSections = [...content.querySelectorAll("h2[id]")];
    nav.innerHTML = chapters.filter((chapter) => chapter.title.toLocaleLowerCase("it").includes(needle)).map((chapter) => {
      const subchapters = chapter === activeChapter
        ? `<nav class="book-chapter-sections" aria-label="Paragrafi di ${chapter.title}">${activeSections.map((heading) => `<a class="book-section-link" href="#${heading.id}" data-section="${heading.id}">${heading.textContent}</a>`).join("")}</nav>`
        : "";
      return `<div class="book-chapter-group"><a class="book-chapter-link${chapter === activeChapter ? " active" : ""}" href="#${chapter.id}" data-chapter="${chapter.id}">${chapter.title}</a>${subchapters}</div>`;
    }).join("");
    nav.querySelectorAll("[data-chapter]").forEach((link) => link.addEventListener("click", (event) => {
      event.preventDefault();
      void loadChapter(chapters.find((chapter) => chapter.id === link.dataset.chapter));
    }));
    nav.querySelectorAll("[data-section]").forEach((link) => link.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById(link.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      sidebar.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    }));
  }

  function typesetMath() {
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise([content]).catch((error) => console.warn("MathJax typesetting failed", error));
    }
  }

  function closeNotePopover() {
    notePopover.hidden = true;
    activeFootnoteButton?.setAttribute("aria-expanded", "false");
    activeFootnoteButton = null;
  }

  function openNotePopover(button) {
    const note = activeFootnotes.get(button.dataset.footnote);
    if (!note) return;
    if (activeFootnoteButton === button && !notePopover.hidden) {
      closeNotePopover();
      return;
    }
    activeFootnoteButton?.setAttribute("aria-expanded", "false");
    activeFootnoteButton = button;
    button.setAttribute("aria-expanded", "true");
    notePopoverContent.innerHTML = `<p>${note}</p>`;
    notePopover.hidden = false;
    const bounds = button.getBoundingClientRect();
    const popoverBounds = notePopover.getBoundingClientRect();
    const left = Math.min(Math.max(16, bounds.left), window.innerWidth - popoverBounds.width - 16);
    const below = bounds.bottom + 10;
    notePopover.style.left = `${left}px`;
    notePopover.style.top = `${below + popoverBounds.height <= window.innerHeight - 16 ? below : Math.max(16, bounds.top - popoverBounds.height - 10)}px`;
  }

  async function loadChapter(chapter) {
    if (!chapter) return;
    content.innerHTML = '<p class="book-loading">Caricamento del capitolo…</p>';
    try {
      const response = await fetch(`${chapter.folder}/${chapter.file}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      content.innerHTML = renderMarkdown(await response.text(), chapter);
      activeChapter = chapter;
      renderNavigation(search.value);
      typesetMath();
      history.replaceState(null, "", `#${chapter.id}`);
      content.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "auto" });
      sidebar.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    } catch (error) {
      content.innerHTML = `<p class="book-error">Non è stato possibile caricare il capitolo (${escapeHtml(error.message)}). Apri il libro tramite un server HTTP, per esempio <code>npm run start:web</code>.</p>`;
    }
  }

  search.addEventListener("input", () => renderNavigation(search.value));
  content.addEventListener("click", (event) => {
    const button = event.target.closest(".footnote-ref");
    if (button) openNotePopover(button);
  });
  noteCloseButton.addEventListener("click", closeNotePopover);
  document.addEventListener("pointerdown", (event) => {
    if (!notePopover.hidden && !notePopover.contains(event.target) && !event.target.closest(".footnote-ref")) closeNotePopover();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !notePopover.hidden) closeNotePopover();
  });
  menuButton?.addEventListener("click", () => {
    const open = sidebar.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  window.addEventListener("hashchange", () => void loadChapter(chapters.find((chapter) => chapter.id === location.hash.slice(1)) || chapters[0]));
  window.addEventListener("load", typesetMath);
  renderNavigation();
  void loadChapter(chapters.find((chapter) => chapter.id === location.hash.slice(1)) || chapters[0]);
})();
