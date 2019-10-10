(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("ccs", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.ccs = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  function _default() {
    // elements
    const root = document.querySelector('[data-ccs="root"]');
    const themeMenu = document.querySelector('[data-ccs="menu"]');
    const modeToggle = document.querySelector('[data-ccs-input="mode"]');
    const unsetBtn = document.querySelector('[data-ccs-input="unset"]'); // elements

    const selectElements = {
      theme: document.querySelector('[data-ccs-input="theme"]'),
      hue: document.querySelector('[data-ccs-input="hue"]'),
      sat: document.querySelector('[data-ccs-input="saturation"]'),
      light: document.querySelector('[data-ccs-input="lightness"]'),
      contrast: document.querySelector('[data-ccs-input="contrast"]')
    }; // attributes

    const attrs = {
      theme: 'data-ccs-theme'
    }; // properties

    const props = {
      hue: '--ccs-prime--user',
      sat: '--ccs-s--user',
      light: '--ccs-l--user',
      contrast: '--ccs-contrast--user',
      mode: '--ccs-mode--user'
    }; // local storage

    const store = {
      theme: 'ccsTheme',
      mode: 'ccsMode',
      hue: 'ccsHue',
      sat: 'ccsSat',
      light: 'ccsLight',
      contrast: 'ccsContrast'
    }; // clear all settings

    const clearColors = () => {
      setValue('theme', selectElements.theme.getAttribute('data-default'), false);
      Object.keys(store).forEach(type => localStorage.removeItem(store[type]));
      Object.keys(props).forEach(prop => root.style.removeProperty(props[prop]));
      Object.keys(selectElements).forEach(type => {
        const el = selectElements[type];
        selectElements[type].value = el.getAttribute('data-default');
      });
      unsetBtn.setAttribute('hidden', '');
    }; // set a value


    const setValue = (type, to, toStore = true) => {
      if (to) {
        if (attrs[type]) {
          root.setAttribute(attrs[type], to);
        } else if (props[type]) {
          root.style.setProperty(props[type], to);
        }

        if (toStore && store[type]) {
          localStorage.setItem(store[type], to);
          unsetBtn.removeAttribute('hidden');
        }
      }
    }; // toggle mode


    const getMode = () => {
      return Number(getComputedStyle(root).getPropertyValue('--ccs-mode').trim());
    };

    const changeMode = () => {
      setValue('mode', getMode() * -1, true);
    }; // initialize everything


    const initMenu = () => {
      themeMenu.removeAttribute('hidden');
    };

    const initValue = type => {
      selectElements[type].setAttribute('data-default', selectElements[type].value);
      const to = localStorage.getItem(store[type]);

      if (to) {
        setValue(type, to, false);
        selectElements[type].value = to;
        unsetBtn.removeAttribute('hidden');
      }
    };

    const initMode = () => {
      let to = localStorage.getItem(store.mode);

      if (to) {
        setValue('mode', to);
        unsetBtn.removeAttribute('hidden');
      }
    }; // init & events


    document.onload = initMenu();
    document.onload = initMode();
    modeToggle.addEventListener('click', () => changeMode());
    unsetBtn.addEventListener('click', () => clearColors());
    Object.keys(selectElements).forEach(type => {
      if (selectElements[type]) {
        document.onload = initValue(type);
        selectElements[type].addEventListener('input', () => setValue(type, selectElements[type].value));
      }
    });
  }

  ;
});
