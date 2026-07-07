// Cross-platform country flag renderer for Windows, macOS, Android and iOS.
(() => {
  "use strict";

  const regionalIndicatorPair = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;
  const ignoredParents = "script, style, textarea, noscript, template";

  function flagEmojiToCode(flagEmoji) {
    const codePoints = Array.from(
      flagEmoji,
      character => character.codePointAt(0)
    );

    if (
      codePoints.length !== 2 ||
      codePoints.some(value => value < 0x1F1E6 || value > 0x1F1FF)
    ) {
      return null;
    }

    return codePoints
      .map(value => String.fromCharCode(97 + value - 0x1F1E6))
      .join("");
  }

  function containsFlag(value) {
    regionalIndicatorPair.lastIndex = 0;
    return regionalIndicatorPair.test(value);
  }

  function replaceFlagTextNode(textNode) {
    const value = textNode.nodeValue || "";
    const parent = textNode.parentElement;

    if (!containsFlag(value) || !parent || parent.closest(ignoredParents)) {
      return;
    }

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    regionalIndicatorPair.lastIndex = 0;

    while ((match = regionalIndicatorPair.exec(value)) !== null) {
      if (match.index > lastIndex) {
        fragment.append(
          document.createTextNode(value.slice(lastIndex, match.index))
        );
      }

      const originalEmoji = match[0];
      const countryCode = flagEmojiToCode(originalEmoji);

      if (!countryCode) {
        fragment.append(document.createTextNode(originalEmoji));
      } else {
        const image = document.createElement("img");
        image.className = "cross-platform-flag";
        image.src =
          `https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/4x3/${countryCode}.svg`;
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        image.decoding = "async";
        image.referrerPolicy = "no-referrer";

        image.addEventListener(
          "error",
          () => image.replaceWith(document.createTextNode(originalEmoji)),
          { once: true }
        );

        fragment.append(image);
      }

      lastIndex = regionalIndicatorPair.lastIndex;
    }

    if (lastIndex < value.length) {
      fragment.append(document.createTextNode(value.slice(lastIndex)));
    }

    textNode.replaceWith(fragment);
  }

  function replaceFlagsWithin(root) {
    if (!root) return;

    if (root.nodeType === Node.TEXT_NODE) {
      replaceFlagTextNode(root);
      return;
    }

    if (
      root.nodeType !== Node.ELEMENT_NODE &&
      root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
    ) {
      return;
    }

    if (
      root.nodeType === Node.ELEMENT_NODE &&
      root.matches(ignoredParents)
    ) {
      return;
    }

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT
    );

    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
      if (
        !node.parentElement?.closest(ignoredParents) &&
        containsFlag(node.nodeValue || "")
      ) {
        textNodes.push(node);
      }
    }

    textNodes.forEach(replaceFlagTextNode);
  }

  function addStyles() {
    if (document.getElementById("cross-platform-flag-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "cross-platform-flag-styles";
    style.textContent = `
      img.cross-platform-flag {
        display: inline-block;
        width: 24px;
        height: 16px;
        object-fit: cover;
        border-radius: 3px;
        box-shadow: 0 0 0 1px rgba(25, 35, 31, 0.14);
        vertical-align: -2px;
        flex: 0 0 auto;
      }

      .flag img.cross-platform-flag {
        width: 30px;
        height: 20px;
        vertical-align: middle;
      }

      .guide-flag img.cross-platform-flag {
        width: 40px;
        height: 27px;
        vertical-align: middle;
      }

      .country-switch-flag img.cross-platform-flag {
        width: 22px;
        height: 15px;
        vertical-align: middle;
      }

      .compare-country-head img.cross-platform-flag {
        width: 28px;
        height: 19px;
        vertical-align: middle;
      }
    `;

    document.head.append(style);
  }

  function start() {
    addStyles();
    replaceFlagsWithin(document.body);

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          replaceFlagsWithin(addedNode);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
