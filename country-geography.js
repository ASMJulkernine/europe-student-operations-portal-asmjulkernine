// Geographic location widget for every country guide in the Europe Student Operations Portal.
// Uses Leaflet 1.9.4 and OpenStreetMap tiles.

(() => {
  "use strict";

  const COUNTRY_GEOGRAPHY = {
    austria: {
      name: "Austria",
      capital: "Vienna",
      center: [47.5162, 14.5501],
      capitalCoordinates: [48.2082, 16.3738],
      zoom: 6,
      region: "Central Europe",
      borders: "Germany, Czechia, Slovakia, Hungary, Slovenia, Italy, Switzerland and Liechtenstein",
      area: "Approx. 83,879 km²",
      languages: "German",
      iso2: "AT"
    },
    belgium: {
      name: "Belgium",
      capital: "Brussels",
      center: [50.5039, 4.4699],
      capitalCoordinates: [50.8503, 4.3517],
      zoom: 7,
      region: "Western Europe",
      borders: "France, Germany, Luxembourg and the Netherlands",
      area: "Approx. 30,689 km²",
      languages: "Dutch, French and German",
      iso2: "BE"
    },
    bulgaria: {
      name: "Bulgaria",
      capital: "Sofia",
      center: [42.7339, 25.4858],
      capitalCoordinates: [42.6977, 23.3219],
      zoom: 6,
      region: "Southeastern Europe",
      borders: "Romania, Serbia, North Macedonia, Greece and Turkey",
      area: "Approx. 110,879 km²",
      languages: "Bulgarian",
      iso2: "BG"
    },
    croatia: {
      name: "Croatia",
      capital: "Zagreb",
      center: [45.1, 15.2],
      capitalCoordinates: [45.8150, 15.9819],
      zoom: 6,
      region: "Southeastern Europe",
      borders: "Slovenia, Hungary, Serbia, Bosnia and Herzegovina, and Montenegro",
      area: "Approx. 56,594 km²",
      languages: "Croatian",
      iso2: "HR"
    },
    cyprus: {
      name: "Cyprus",
      capital: "Nicosia",
      center: [35.1264, 33.4299],
      capitalCoordinates: [35.1856, 33.3823],
      zoom: 8,
      region: "Eastern Mediterranean",
      borders: "Island country; no internationally recognised land border",
      area: "Approx. 9,251 km²",
      languages: "Greek and Turkish",
      iso2: "CY"
    },
    czechia: {
      name: "Czechia",
      capital: "Prague",
      center: [49.8175, 15.4730],
      capitalCoordinates: [50.0755, 14.4378],
      zoom: 6,
      region: "Central Europe",
      borders: "Germany, Poland, Slovakia and Austria",
      area: "Approx. 78,871 km²",
      languages: "Czech",
      iso2: "CZ"
    },
    denmark: {
      name: "Denmark",
      capital: "Copenhagen",
      center: [56.2639, 9.5018],
      capitalCoordinates: [55.6761, 12.5683],
      zoom: 6,
      region: "Northern Europe",
      borders: "Germany",
      area: "Approx. 42,943 km²",
      languages: "Danish",
      iso2: "DK"
    },
    estonia: {
      name: "Estonia",
      capital: "Tallinn",
      center: [58.5953, 25.0136],
      capitalCoordinates: [59.4370, 24.7536],
      zoom: 6,
      region: "Northern Europe",
      borders: "Latvia and Russia",
      area: "Approx. 45,339 km²",
      languages: "Estonian",
      iso2: "EE"
    },
    finland: {
      name: "Finland",
      capital: "Helsinki",
      center: [61.9241, 25.7482],
      capitalCoordinates: [60.1699, 24.9384],
      zoom: 5,
      region: "Northern Europe",
      borders: "Sweden, Norway and Russia",
      area: "Approx. 338,455 km²",
      languages: "Finnish and Swedish",
      iso2: "FI"
    },
    france: {
      name: "France",
      capital: "Paris",
      center: [46.2276, 2.2137],
      capitalCoordinates: [48.8566, 2.3522],
      zoom: 5,
      region: "Western Europe",
      borders: "Belgium, Luxembourg, Germany, Switzerland, Italy, Monaco, Spain and Andorra",
      area: "Approx. 551,695 km² (metropolitan France)",
      languages: "French",
      iso2: "FR"
    },
    germany: {
      name: "Germany",
      capital: "Berlin",
      center: [51.1657, 10.4515],
      capitalCoordinates: [52.5200, 13.4050],
      zoom: 5,
      region: "Central Europe",
      borders: "Denmark, Poland, Czechia, Austria, Switzerland, France, Luxembourg, Belgium and the Netherlands",
      area: "Approx. 357,022 km²",
      languages: "German",
      iso2: "DE"
    },
    greece: {
      name: "Greece",
      capital: "Athens",
      center: [39.0742, 21.8243],
      capitalCoordinates: [37.9838, 23.7275],
      zoom: 6,
      region: "Southeastern Europe",
      borders: "Albania, North Macedonia, Bulgaria and Turkey",
      area: "Approx. 131,957 km²",
      languages: "Greek",
      iso2: "GR"
    },
    hungary: {
      name: "Hungary",
      capital: "Budapest",
      center: [47.1625, 19.5033],
      capitalCoordinates: [47.4979, 19.0402],
      zoom: 6,
      region: "Central Europe",
      borders: "Austria, Slovakia, Ukraine, Romania, Serbia, Croatia and Slovenia",
      area: "Approx. 93,028 km²",
      languages: "Hungarian",
      iso2: "HU"
    },
    ireland: {
      name: "Ireland",
      capital: "Dublin",
      center: [53.1424, -7.6921],
      capitalCoordinates: [53.3498, -6.2603],
      zoom: 6,
      region: "Northwestern Europe",
      borders: "United Kingdom, through Northern Ireland",
      area: "Approx. 70,273 km²",
      languages: "Irish and English",
      iso2: "IE"
    },
    italy: {
      name: "Italy",
      capital: "Rome",
      center: [41.8719, 12.5674],
      capitalCoordinates: [41.9028, 12.4964],
      zoom: 5,
      region: "Southern Europe",
      borders: "France, Switzerland, Austria, Slovenia, San Marino and Vatican City",
      area: "Approx. 301,340 km²",
      languages: "Italian",
      iso2: "IT"
    },
    latvia: {
      name: "Latvia",
      capital: "Riga",
      center: [56.8796, 24.6032],
      capitalCoordinates: [56.9496, 24.1052],
      zoom: 6,
      region: "Northern Europe",
      borders: "Estonia, Russia, Belarus and Lithuania",
      area: "Approx. 64,589 km²",
      languages: "Latvian",
      iso2: "LV"
    },
    lithuania: {
      name: "Lithuania",
      capital: "Vilnius",
      center: [55.1694, 23.8813],
      capitalCoordinates: [54.6872, 25.2797],
      zoom: 6,
      region: "Northern Europe",
      borders: "Latvia, Belarus, Poland and Russia's Kaliningrad region",
      area: "Approx. 65,300 km²",
      languages: "Lithuanian",
      iso2: "LT"
    },
    luxembourg: {
      name: "Luxembourg",
      capital: "Luxembourg City",
      center: [49.8153, 6.1296],
      capitalCoordinates: [49.6116, 6.1319],
      zoom: 9,
      region: "Western Europe",
      borders: "Belgium, Germany and France",
      area: "Approx. 2,586 km²",
      languages: "Luxembourgish, French and German",
      iso2: "LU"
    },
    malta: {
      name: "Malta",
      capital: "Valletta",
      center: [35.9375, 14.3754],
      capitalCoordinates: [35.8989, 14.5146],
      zoom: 10,
      region: "Southern Europe, Central Mediterranean",
      borders: "Island country; no land borders",
      area: "Approx. 316 km²",
      languages: "Maltese and English",
      iso2: "MT"
    },
    moldova: {
      name: "Moldova",
      capital: "Chișinău",
      center: [47.4116, 28.3699],
      capitalCoordinates: [47.0105, 28.8638],
      zoom: 7,
      region: "Eastern Europe",
      borders: "Romania and Ukraine",
      area: "Approx. 33,846 km²",
      languages: "Romanian",
      iso2: "MD"
    },
    netherlands: {
      name: "Netherlands",
      capital: "Amsterdam",
      center: [52.1326, 5.2913],
      capitalCoordinates: [52.3676, 4.9041],
      zoom: 7,
      region: "Western Europe",
      borders: "Belgium and Germany",
      area: "Approx. 41,850 km²",
      languages: "Dutch",
      iso2: "NL"
    },
    norway: {
      name: "Norway",
      capital: "Oslo",
      center: [60.4720, 8.4689],
      capitalCoordinates: [59.9139, 10.7522],
      zoom: 4,
      region: "Northern Europe",
      borders: "Sweden, Finland and Russia",
      area: "Approx. 385,207 km²",
      languages: "Norwegian",
      iso2: "NO"
    },
    poland: {
      name: "Poland",
      capital: "Warsaw",
      center: [51.9194, 19.1451],
      capitalCoordinates: [52.2297, 21.0122],
      zoom: 5,
      region: "Central Europe",
      borders: "Germany, Czechia, Slovakia, Ukraine, Belarus, Lithuania and Russia's Kaliningrad region",
      area: "Approx. 312,696 km²",
      languages: "Polish",
      iso2: "PL"
    },
    portugal: {
      name: "Portugal",
      capital: "Lisbon",
      center: [39.3999, -8.2245],
      capitalCoordinates: [38.7223, -9.1393],
      zoom: 6,
      region: "Southwestern Europe",
      borders: "Spain",
      area: "Approx. 92,212 km²",
      languages: "Portuguese",
      iso2: "PT"
    },
    romania: {
      name: "Romania",
      capital: "Bucharest",
      center: [45.9432, 24.9668],
      capitalCoordinates: [44.4268, 26.1025],
      zoom: 6,
      region: "Southeastern Europe",
      borders: "Ukraine, Moldova, Bulgaria, Serbia and Hungary",
      area: "Approx. 238,397 km²",
      languages: "Romanian",
      iso2: "RO"
    },
    russia: {
      name: "Russia",
      capital: "Moscow",
      center: [58.0, 50.0],
      capitalCoordinates: [55.7558, 37.6173],
      zoom: 3,
      region: "Eastern Europe and Northern Asia",
      borders: "Norway, Finland, Estonia, Latvia, Lithuania, Poland, Belarus, Ukraine, Georgia, Azerbaijan, Kazakhstan, China, Mongolia and North Korea",
      area: "Approx. 17,098,246 km²",
      languages: "Russian",
      iso2: "RU"
    },
    slovakia: {
      name: "Slovakia",
      capital: "Bratislava",
      center: [48.6690, 19.6990],
      capitalCoordinates: [48.1486, 17.1077],
      zoom: 7,
      region: "Central Europe",
      borders: "Czechia, Austria, Poland, Ukraine and Hungary",
      area: "Approx. 49,035 km²",
      languages: "Slovak",
      iso2: "SK"
    },
    slovenia: {
      name: "Slovenia",
      capital: "Ljubljana",
      center: [46.1512, 14.9955],
      capitalCoordinates: [46.0569, 14.5058],
      zoom: 7,
      region: "Central Europe",
      borders: "Italy, Austria, Hungary and Croatia",
      area: "Approx. 20,273 km²",
      languages: "Slovene",
      iso2: "SI"
    },
    spain: {
      name: "Spain",
      capital: "Madrid",
      center: [40.4637, -3.7492],
      capitalCoordinates: [40.4168, -3.7038],
      zoom: 5,
      region: "Southwestern Europe",
      borders: "Portugal, France and Andorra",
      area: "Approx. 505,990 km²",
      languages: "Spanish; several regional languages are co-official",
      iso2: "ES"
    },
    sweden: {
      name: "Sweden",
      capital: "Stockholm",
      center: [60.1282, 18.6435],
      capitalCoordinates: [59.3293, 18.0686],
      zoom: 4,
      region: "Northern Europe",
      borders: "Norway and Finland",
      area: "Approx. 450,295 km²",
      languages: "Swedish",
      iso2: "SE"
    },
    switzerland: {
      name: "Switzerland",
      capital: "Bern",
      center: [46.8182, 8.2275],
      capitalCoordinates: [46.9480, 7.4474],
      zoom: 7,
      region: "Central Europe",
      borders: "France, Germany, Austria, Liechtenstein and Italy",
      area: "Approx. 41,285 km²",
      languages: "German, French, Italian and Romansh",
      iso2: "CH"
    },
    turkey: {
      name: "Turkey",
      capital: "Ankara",
      center: [38.9637, 35.2433],
      capitalCoordinates: [39.9334, 32.8597],
      zoom: 5,
      region: "Southeastern Europe and Western Asia",
      borders: "Greece, Bulgaria, Georgia, Armenia, Azerbaijan, Iran, Iraq and Syria",
      area: "Approx. 783,562 km²",
      languages: "Turkish",
      iso2: "TR"
    },
    "united kingdom": {
      name: "United Kingdom",
      capital: "London",
      center: [55.3781, -3.4360],
      capitalCoordinates: [51.5074, -0.1278],
      zoom: 5,
      region: "Northwestern Europe",
      borders: "Ireland, through Northern Ireland",
      area: "Approx. 243,610 km²",
      languages: "English; Welsh, Scottish Gaelic and Irish also have recognised use",
      iso2: "GB"
    }
  };

  const COUNTRY_ALIASES = {
    "czech republic": "czechia",
    "moldova, republic of": "moldova",
    "russian federation": "russia",
    "turkiye": "turkey",
    "türkiye": "turkey",
    "uk": "united kingdom",
    "great britain": "united kingdom"
  };

  const LEAFLET_VERSION = "1.9.4";
  const LEAFLET_CSS_URL =
    `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`;
  const LEAFLET_JS_URL =
    `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`;

  let leafletPromise = null;
  let activeMap = null;
  let activeCountryKey = null;
  let renderScheduled = false;

  function normalizeCountryName(value) {
    const normalized = String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    return COUNTRY_ALIASES[normalized] || normalized;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatCoordinates(latitude, longitude) {
    const latDirection = latitude >= 0 ? "N" : "S";
    const lngDirection = longitude >= 0 ? "E" : "W";

    return (
      `${Math.abs(latitude).toFixed(4)}° ${latDirection}, ` +
      `${Math.abs(longitude).toFixed(4)}° ${lngDirection}`
    );
  }

  function addStyles() {
    if (document.getElementById("country-geography-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "country-geography-styles";

    style.textContent = `
      .country-geography-widget {
        margin-top: 16px;
        padding: 16px;
        border: 1px solid rgba(95, 143, 130, 0.28);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.55);
        color: var(--ink, #17231f);
        overflow: hidden;
      }

      .country-geography-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 14px;
      }

      .country-geography-title {
        display: flex;
        align-items: center;
        gap: 9px;
        min-width: 0;
        font-size: 13px;
        font-weight: 850;
        letter-spacing: 0.055em;
        text-transform: uppercase;
      }

      .country-geography-title-icon {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        flex: 0 0 34px;
        border-radius: 10px;
        background: rgba(95, 143, 130, 0.14);
        color: #4f8d7c;
        font-size: 17px;
      }

      .country-geography-open-map {
        color: #4f8d7c;
        font-size: 11px;
        font-weight: 750;
        text-decoration: none;
        white-space: nowrap;
      }

      .country-geography-open-map:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      .country-geography-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(235px, 0.65fr);
        gap: 16px;
        align-items: stretch;
      }

      .country-geography-map {
        min-height: 320px;
        width: 100%;
        border: 1px solid rgba(95, 143, 130, 0.18);
        border-radius: 13px;
        overflow: hidden;
        background: #dce9e4;
        z-index: 0;
      }

      .country-geography-details {
        display: grid;
        align-content: start;
        gap: 0;
        border: 1px solid rgba(95, 143, 130, 0.18);
        border-radius: 13px;
        background: rgba(238, 244, 240, 0.72);
        overflow: hidden;
      }

      .country-geography-item {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        gap: 10px;
        padding: 11px 12px;
      }

      .country-geography-item + .country-geography-item {
        border-top: 1px solid rgba(95, 143, 130, 0.15);
      }

      .country-geography-item-icon {
        display: grid;
        place-items: start center;
        padding-top: 1px;
        color: #4f8d7c;
        font-size: 15px;
      }

      .country-geography-label {
        margin-bottom: 2px;
        color: var(--muted, #65736d);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.055em;
        text-transform: uppercase;
      }

      .country-geography-value {
        font-size: 12px;
        font-weight: 650;
        line-height: 1.4;
      }

      .country-geography-note {
        margin-top: 11px;
        padding: 10px 12px;
        border-radius: 10px;
        background: rgba(95, 143, 130, 0.09);
        color: var(--muted, #65736d);
        font-size: 10px;
        line-height: 1.45;
      }

      .country-geography-pin {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        border: 3px solid #ffffff;
        border-radius: 50% 50% 50% 0;
        background: #4f8d7c;
        box-shadow: 0 4px 12px rgba(23, 35, 31, 0.28);
        transform: rotate(-45deg);
      }

      .country-geography-pin::after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ffffff;
      }

      .country-geography-pin-wrapper {
        background: transparent;
        border: 0;
      }

      .country-geography-widget .leaflet-control-attribution {
        font-size: 9px;
      }

      .country-geography-widget .leaflet-popup-content {
        margin: 10px 13px;
        font-family: inherit;
        line-height: 1.35;
      }

      [data-theme="dark"] .country-geography-widget {
        background: rgba(24, 34, 31, 0.72);
        border-color: rgba(160, 200, 188, 0.22);
      }

      [data-theme="dark"] .country-geography-details {
        background: rgba(35, 50, 45, 0.8);
        border-color: rgba(160, 200, 188, 0.18);
      }

      [data-theme="dark"] .country-geography-item + .country-geography-item {
        border-top-color: rgba(160, 200, 188, 0.14);
      }

      @media (max-width: 900px) {
        .country-geography-layout {
          grid-template-columns: 1fr;
        }

        .country-geography-map {
          min-height: 290px;
        }
      }

      @media (max-width: 600px) {
        .country-geography-widget {
          padding: 12px;
        }

        .country-geography-heading {
          align-items: flex-start;
          flex-direction: column;
          gap: 7px;
        }

        .country-geography-map {
          min-height: 260px;
        }
      }

      @media print {
        .country-geography-map {
          min-height: 230px;
        }

        .country-geography-open-map,
        .leaflet-control-zoom {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function loadLeaflet() {
    if (window.L) {
      return Promise.resolve(window.L);
    }

    if (leafletPromise) {
      return leafletPromise;
    }

    leafletPromise = new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-country-geography-leaflet]')) {
        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = LEAFLET_CSS_URL;
        stylesheet.integrity =
          "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        stylesheet.crossOrigin = "";
        stylesheet.dataset.countryGeographyLeaflet = "true";
        document.head.appendChild(stylesheet);
      }

      const existingScript =
        document.querySelector('script[data-country-geography-leaflet]');

      if (existingScript) {
        existingScript.addEventListener(
          "load",
          () => resolve(window.L),
          { once: true }
        );
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Leaflet failed to load")),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.src = LEAFLET_JS_URL;
      script.integrity =
        "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.dataset.countryGeographyLeaflet = "true";

      script.addEventListener(
        "load",
        () => resolve(window.L),
        { once: true }
      );

      script.addEventListener(
        "error",
        () => reject(new Error("Leaflet failed to load")),
        { once: true }
      );

      document.head.appendChild(script);
    });

    return leafletPromise;
  }

  function findVisibleGuideTitle() {
    const selectors = [
      ".guide-hero h1",
      ".guide-hero h2",
      "[data-country-guide] h1",
      "[data-country-guide] h2"
    ];

    const titles = Array.from(
      document.querySelectorAll(selectors.join(","))
    );

    return (
      titles.find(title => title.offsetParent !== null) ||
      titles[0] ||
      null
    );
  }

  function createInfoItem(icon, label, value) {
    return `
      <div class="country-geography-item">
        <div class="country-geography-item-icon" aria-hidden="true">
          ${icon}
        </div>
        <div>
          <div class="country-geography-label">
            ${escapeHtml(label)}
          </div>
          <div class="country-geography-value">
            ${escapeHtml(value)}
          </div>
        </div>
      </div>
    `;
  }

  function createWidget(countryKey, country) {
    const widget = document.createElement("section");
    widget.className = "country-geography-widget";
    widget.dataset.countryGeographyKey = countryKey;

    const mapId =
      `country-geography-map-${countryKey.replaceAll(" ", "-")}`;

    const [latitude, longitude] = country.capitalCoordinates;
    const openMapUrl =
      "https://www.openstreetmap.org/" +
      `?mlat=${encodeURIComponent(latitude)}` +
      `&mlon=${encodeURIComponent(longitude)}` +
      `#map=${country.zoom}/${latitude}/${longitude}`;

    widget.innerHTML = `
      <div class="country-geography-heading">
        <div class="country-geography-title">
          <span class="country-geography-title-icon" aria-hidden="true">
            ⌖
          </span>
          <span>Geographical location</span>
        </div>

        <a
          class="country-geography-open-map"
          href="${openMapUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open full map ↗
        </a>
      </div>

      <div class="country-geography-layout">
        <div
          id="${mapId}"
          class="country-geography-map"
          role="img"
          aria-label="Interactive map showing ${escapeHtml(country.name)} and its capital, ${escapeHtml(country.capital)}"
        ></div>

        <div class="country-geography-details">
          ${createInfoItem("◉", "Region", country.region)}
          ${createInfoItem("★", "Capital", country.capital)}
          ${createInfoItem(
            "⌖",
            "Capital coordinates",
            formatCoordinates(latitude, longitude)
          )}
          ${createInfoItem("↔", "Land borders", country.borders)}
          ${createInfoItem("□", "Area", country.area)}
          ${createInfoItem("◌", "Main language(s)", country.languages)}
        </div>
      </div>

      <div class="country-geography-note">
        Map position is for geographical orientation. Country borders and place names are supplied by the map provider and should not be treated as immigration or legal guidance.
      </div>
    `;

    return { widget, mapId };
  }

  function removeOldWidgets(countryKey) {
    document
      .querySelectorAll(".country-geography-widget")
      .forEach(widget => {
        if (widget.dataset.countryGeographyKey !== countryKey) {
          widget.remove();
        }
      });
  }

  async function initialiseMap(mapId, country) {
    const L = await loadLeaflet();
    const mapElement = document.getElementById(mapId);

    if (!mapElement || mapElement.dataset.mapReady === "true") {
      return;
    }

    if (activeMap) {
      try {
        activeMap.remove();
      } catch (error) {
        // The old map may already have been removed with its guide.
      }
      activeMap = null;
    }

    const map = L.map(mapElement, {
      scrollWheelZoom: false,
      worldCopyJump: true,
      zoomControl: true,
      attributionControl: true
    }).setView(country.center, country.zoom);

    L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
      }
    ).addTo(map);

    const capitalIcon = L.divIcon({
      className: "country-geography-pin-wrapper",
      html: '<span class="country-geography-pin" aria-hidden="true"></span>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -27]
    });

    L.marker(country.capitalCoordinates, {
      icon: capitalIcon,
      title: `${country.capital}, ${country.name}`
    })
      .addTo(map)
      .bindPopup(
        `<strong>${escapeHtml(country.capital)}</strong><br>` +
        `Capital of ${escapeHtml(country.name)}`
      )
      .openPopup();

    L.circle(country.center, {
      radius: 12000,
      color: "#4f8d7c",
      weight: 2,
      opacity: 0.65,
      fillColor: "#78aa9b",
      fillOpacity: 0.15,
      interactive: false
    }).addTo(map);

    mapElement.dataset.mapReady = "true";
    activeMap = map;

    window.setTimeout(() => {
      try {
        map.invalidateSize();
      } catch (error) {
        // The user may have already changed country guides.
      }
    }, 150);
  }

  async function renderWidget() {
    addStyles();

    const title = findVisibleGuideTitle();

    if (!title) {
      return;
    }

    const countryKey = normalizeCountryName(title.textContent);
    const country = COUNTRY_GEOGRAPHY[countryKey];

    if (!country) {
      return;
    }

    const guideHero =
      title.closest(".guide-hero") ||
      title.closest("[data-country-guide]") ||
      title.parentElement;

    if (!guideHero) {
      return;
    }

    removeOldWidgets(countryKey);

    const existingWidget = guideHero.querySelector(
      `.country-geography-widget[data-country-geography-key="${countryKey}"]`
    );

    if (existingWidget) {
      return;
    }

    if (activeCountryKey && activeCountryKey !== countryKey && activeMap) {
      try {
        activeMap.remove();
      } catch (error) {
        // Ignore already removed map containers.
      }
      activeMap = null;
    }

    activeCountryKey = countryKey;

    const { widget, mapId } = createWidget(countryKey, country);

    const rateWidget =
      guideHero.querySelector(".bdt-rate-widget");

    const guideSummary =
      guideHero.querySelector(".guide-summary");

    if (rateWidget) {
      rateWidget.insertAdjacentElement("afterend", widget);
    } else if (guideSummary) {
      guideSummary.insertAdjacentElement("afterend", widget);
    } else {
      guideHero.appendChild(widget);
    }

    try {
      await initialiseMap(mapId, country);
    } catch (error) {
      const mapElement = document.getElementById(mapId);

      if (mapElement) {
        mapElement.innerHTML = `
          <div style="
            display:grid;
            place-items:center;
            min-height:260px;
            padding:24px;
            text-align:center;
            color:#65736d;
            font:600 12px/1.5 inherit;
          ">
            Interactive map temporarily unavailable.<br>
            Use “Open full map” to view the location.
          </div>
        `;
      }
    }
  }

  function scheduleRender() {
    if (renderScheduled) {
      return;
    }

    renderScheduled = true;

    requestAnimationFrame(() => {
      renderScheduled = false;
      renderWidget();
    });
  }

  function start() {
    scheduleRender();

    const observer = new MutationObserver(scheduleRender);

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    window.addEventListener("resize", () => {
      if (activeMap) {
        activeMap.invalidateSize();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, {
      once: true
    });
  } else {
    start();
  }
})();
