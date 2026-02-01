/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

const supportedThemes = ["light", "dark", "party"];
const themeLabels = {
  "light": "Light",
  "dark": "Dark",
  "party": "Party",
};
const themeIcons = {
  "light": "fa-sun",
  "dark": "fa-moon",
  "party": "fa-music",
};
const themeIconClasses = "fa-sun fa-moon fa-music";

const themeStorage = {
  get: () => {
    try {
      return localStorage.getItem("theme");
    } catch (err) {
      return null;
    }
  },
  set: (value) => {
    try {
      localStorage.setItem("theme", value);
    } catch (err) {
      // Ignore storage errors (e.g., private mode)
    }
  },
};

let normalizeTheme = (theme) => (supportedThemes.includes(theme) ? theme : null);
let getStoredTheme = () => normalizeTheme(themeStorage.get());
let getCurrentTheme = () => normalizeTheme(document.documentElement.getAttribute("data-theme")) || "light";
let getPreferredTheme = () => getStoredTheme() || getCurrentTheme();

let updateThemeToggle = (theme) => {
  const label = themeLabels[theme] || themeLabels.light;
  const iconClass = themeIcons[theme] || themeIcons.light;
  const $icon = $("#theme-icon");
  const $toggle = $("#theme-toggle a.theme-toggle");
  const statusText = `Theme: ${label}`;

  if ($icon.length) {
    $icon.removeClass(themeIconClasses).addClass(iconClass);
  }
  if ($toggle.length) {
    $toggle.attr("aria-label", statusText);
    $toggle.attr("title", statusText);
  }
  $("#theme-label").text(label);
  $("#theme-toggle-status").text(statusText);
};

// Set the theme on page load or when explicitly called
let setTheme = (theme) => {
  const nextTheme = normalizeTheme(theme) || "light";
  if (nextTheme === "light") {
    $("html").removeAttr("data-theme");
  } else {
    $("html").attr("data-theme", nextTheme);
  }
  updateThemeToggle(nextTheme);
};

// Toggle the theme manually
let toggleTheme = (event) => {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }
  const currentTheme = getCurrentTheme();
  const currentIndex = supportedThemes.indexOf(currentTheme);
  const nextTheme = supportedThemes[(currentIndex + 1) % supportedThemes.length];
  themeStorage.set(nextTheme);
  setTheme(nextTheme);
};

let handleThemeToggleKeydown = (event) => {
  if (event.key === " " || event.key === "Spacebar" || event.key === "Enter") {
    event.preventDefault();
    toggleTheme();
  }
};

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the 
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is 
// actually present on the page.
import { plotlyDarkLayout, plotlyLightLayout } from './theme.js';
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      plotlyElements.forEach((elem) => {
        // Parse the Plotly JSON data and hide it
        var jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const themeSetting = getPreferredTheme();
        const theme = (themeSetting === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files 
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  const savedTheme = getStoredTheme();
  setTheme(savedTheme || "light");

  // Enable the theme toggle unless the fallback already bound it
  if (!window.__themeToggleBound) {
    const $themeToggle = $("#theme-toggle a.theme-toggle");
    $themeToggle.on("click", toggleTheme);
    $themeToggle.on("keydown", handleThemeToggleKeydown);
    window.__themeToggleBound = true;
  }

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("padding-bottom", "0");
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

  // Init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });

});
