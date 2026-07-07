// Daily local-currency-to-BDT widget
(() => {
  "use strict";

  const COUNTRY_CURRENCY = {
    austria: { code: "EUR", name: "Euro", symbol: "€" },
    belgium: { code: "EUR", name: "Euro", symbol: "€" },
    bulgaria: { code: "EUR", name: "Euro", symbol: "€" },
    croatia: { code: "EUR", name: "Euro", symbol: "€" },
    cyprus: { code: "EUR", name: "Euro", symbol: "€" },
    czechia: { code: "CZK", name: "Czech koruna", symbol: "Kč" },
    denmark: { code: "DKK", name: "Danish krone", symbol: "kr" },
    estonia: { code: "EUR", name: "Euro", symbol: "€" },
    finland: { code: "EUR", name: "Euro", symbol: "€" },
    france: { code: "EUR", name: "Euro", symbol: "€" },
    germany: { code: "EUR", name: "Euro", symbol: "€" },
    greece: { code: "EUR", name: "Euro", symbol: "€" },
    hungary: { code: "HUF", name: "Hungarian forint", symbol: "Ft" },
    ireland: { code: "EUR", name: "Euro", symbol: "€" },
    italy: { code: "EUR", name: "Euro", symbol: "€" },
    latvia: { code: "EUR", name: "Euro", symbol: "€" },
    lithuania: { code: "EUR", name: "Euro", symbol: "€" },
    luxembourg: { code: "EUR", name: "Euro", symbol: "€" },
    malta: { code: "EUR", name: "Euro", symbol: "€" },
    moldova: { code: "MDL", name: "Moldovan leu", symbol: "L" },
    netherlands: { code: "EUR", name: "Euro", symbol: "€" },
    norway: { code: "NOK", name: "Norwegian krone", symbol: "kr" },
    poland: { code: "PLN", name: "Polish złoty", symbol: "zł" },
    portugal: { code: "EUR", name: "Euro", symbol: "€" },
    romania: { code: "RON", name: "Romanian leu", symbol: "lei" },
    russia: { code: "RUB", name: "Russian ruble", symbol: "₽" },
    slovakia: { code: "EUR", name: "Euro", symbol: "€" },
    slovenia: { code: "EUR", name: "Euro", symbol: "€" },
    spain: { code: "EUR", name: "Euro", symbol: "€" },
    sweden: { code: "SEK", name: "Swedish krona", symbol: "kr" },
    switzerland: { code: "CHF", name: "Swiss franc", symbol: "CHF" },
    turkey: { code: "TRY", name: "Turkish lira", symbol: "₺" },
    "united kingdom": {
      code: "GBP",
      name: "Pound sterling",
      symbol: "£"
    }
  };

  const API_URL =
    "https://open.er-api.com/v6/latest/BDT";

  const CACHE_KEY =
    "europe-portal-bdt-rates-v1";

  const CACHE_DURATION =
    24 * 60 * 60 * 1000;

  let ratesPromise = null;
  let renderScheduled = false;

  function addStyles() {
    if (document.getElementById("bdt-rate-widget-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "bdt-rate-widget-styles";

    style.textContent = `
      .bdt-rate-widget {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-top: 16px;
        padding: 13px 15px;
        border: 1px solid rgba(95, 143, 130, 0.28);
        border-radius: 14px;
        background: rgba(238, 244, 240, 0.78);
        color: var(--ink, #17231f);
      }

      .bdt-rate-heading {
        display: flex;
        align-items: center;
        gap: 9px;
        min-width: 0;
      }

      .bdt-rate-icon {
        display: grid;
        place-items: center;
        width: 35px;
        height: 35px;
        flex: 0 0 35px;
        border-radius: 10px;
        background: rgba(95, 143, 130, 0.15);
        font-size: 17px;
      }

      .bdt-rate-title {
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .bdt-rate-currency {
        margin-top: 2px;
        color: var(--muted, #65736d);
        font-size: 12px;
      }

      .bdt-rate-value-area {
        text-align: right;
      }

      .bdt-rate-value {
        font-size: 16px;
        font-weight: 850;
        white-space: nowrap;
      }

      .bdt-rate-meta {
        margin-top: 3px;
        color: var(--muted, #65736d);
        font-size: 10px;
      }

      .bdt-rate-meta a {
        color: inherit;
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      [data-theme="dark"] .bdt-rate-widget {
        background: rgba(35, 50, 45, 0.78);
        border-color: rgba(160, 200, 188, 0.22);
      }

      @media (max-width: 600px) {
        .bdt-rate-widget {
          align-items: flex-start;
          flex-direction: column;
          gap: 10px;
        }

        .bdt-rate-value-area {
          text-align: left;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function readCachedRates(allowExpired = false) {
    try {
      const cached = JSON.parse(
        localStorage.getItem(CACHE_KEY)
      );

      if (
        !cached ||
        !cached.data ||
        cached.data.result !== "success"
      ) {
        return null;
      }

      const cacheAge =
        Date.now() - Number(cached.savedAt || 0);

      if (
        !allowExpired &&
        cacheAge > CACHE_DURATION
      ) {
        return null;
      }

      return cached.data;
    } catch (error) {
      return null;
    }
  }

  async function loadRates() {
    if (ratesPromise) {
      return ratesPromise;
    }

    ratesPromise = (async function () {
      const freshCache = readCachedRates(false);

      if (freshCache) {
        return freshCache;
      }

      try {
        const response = await fetch(API_URL, {
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(
            `Rate service returned ${response.status}`
          );
        }

        const data = await response.json();

        if (
          data.result !== "success" ||
          !data.rates
        ) {
          throw new Error("Invalid rate response");
        }

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            savedAt: Date.now(),
            data
          })
        );

        return data;
      } catch (error) {
        const oldCache = readCachedRates(true);

        if (oldCache) {
          return oldCache;
        }

        throw error;
      }
    })();

    return ratesPromise;
  }

  function formatRate(value) {
    const decimals =
      value < 1 ? 4 :
      value < 10 ? 3 :
      2;

    return new Intl.NumberFormat("en-BD", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  function formatUpdateDate(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Daily rate";
    }

    return new Intl.DateTimeFormat("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  }

  function createWidget(countryKey, currency) {
    const widget = document.createElement("div");

    widget.className = "bdt-rate-widget";
    widget.dataset.rateCountry = countryKey;

    widget.innerHTML = `
      <div class="bdt-rate-heading">
        <span class="bdt-rate-icon" aria-hidden="true">
          ৳
        </span>

        <div>
          <div class="bdt-rate-title">
            BDT exchange rate
          </div>

          <div class="bdt-rate-currency">
            ${currency.name} (${currency.code})
          </div>
        </div>
      </div>

      <div class="bdt-rate-value-area">
        <div class="bdt-rate-value">
          Loading daily rate…
        </div>

        <div class="bdt-rate-meta">
          Indicative reference rate
        </div>
      </div>
    `;

    return widget;
  }

  async function updateWidget(
    widget,
    currency
  ) {
    const valueElement =
      widget.querySelector(".bdt-rate-value");

    const metaElement =
      widget.querySelector(".bdt-rate-meta");

    try {
      const data = await loadRates();

      const bdtToCurrency =
        Number(data.rates[currency.code]);

      if (
        !Number.isFinite(bdtToCurrency) ||
        bdtToCurrency <= 0
      ) {
        throw new Error(
          `Rate unavailable for ${currency.code}`
        );
      }

      const currencyToBDT =
        1 / bdtToCurrency;

      valueElement.textContent =
        `1 ${currency.code} ≈ ৳${formatRate(currencyToBDT)}`;

      metaElement.innerHTML = `
        Updated ${formatUpdateDate(
          data.time_last_update_utc
        )}
        ·
        <a
          href="https://www.exchangerate-api.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rates by Exchange Rate API
        </a>
      `;
    } catch (error) {
      valueElement.textContent =
        "Rate temporarily unavailable";

      metaElement.textContent =
        "Please check again later";
    }
  }

  function findVisibleGuideTitle() {
    const titles = Array.from(
      document.querySelectorAll(
        ".guide-hero h1"
      )
    );

    return (
      titles.find(title => title.offsetParent !== null) ||
      titles[0] ||
      null
    );
  }

  function renderWidget() {
    addStyles();

    const title = findVisibleGuideTitle();

    if (!title) {
      return;
    }

    const countryKey =
      title.textContent
        .trim()
        .toLowerCase();

    const currency =
      COUNTRY_CURRENCY[countryKey];

    if (!currency) {
      return;
    }

    const guideHero =
      title.closest(".guide-hero");

    if (!guideHero) {
      return;
    }

    const oldWidgets = Array.from(
      document.querySelectorAll(
        ".bdt-rate-widget"
      )
    );

    oldWidgets.forEach(widget => {
      if (
        widget.dataset.rateCountry !== countryKey ||
        !guideHero.contains(widget)
      ) {
        widget.remove();
      }
    });

    if (
      guideHero.querySelector(
        `.bdt-rate-widget[data-rate-country="${countryKey}"]`
      )
    ) {
      return;
    }

    const widget =
      createWidget(countryKey, currency);

    const guideSummary =
      guideHero.querySelector(".guide-summary");

    if (guideSummary) {
      guideSummary.insertAdjacentElement(
        "afterend",
        widget
      );
    } else {
      guideHero.appendChild(widget);
    }

    updateWidget(widget, currency);
  }

  function scheduleRender() {
    if (renderScheduled) {
      return;
    }

    renderScheduled = true;

    requestAnimationFrame(function () {
      renderScheduled = false;
      renderWidget();
    });
  }

  function start() {
    scheduleRender();

    const observer =
      new MutationObserver(scheduleRender);

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      start,
      { once: true }
    );
  } else {
    start();
  }
})();
