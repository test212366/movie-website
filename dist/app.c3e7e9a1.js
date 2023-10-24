// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"tMJT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotate = rotate;
exports.remove = remove;

function rotate(e) {
  const halfHeight = this.offsetHeight / 2;
  this.style.transform = `rotateX(` + (e.offsetY - halfHeight) / 5 + `deg) rotateY(` + -(e.offsetX - halfHeight) / 5 + 'deg)';
}

function remove(e) {
  this.style.transition = 'all 0.4s ease';
  this.style.transform = 'rotateX(0) rotateY(0)';
}
},{}],"sEiw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preloader = void 0;

const preloader = () => {
  setTimeout(function () {
    const preloader = document.querySelector('.preloaderI');
    preloader.classList.add('loaded_hiding');
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 300);
  }, 300);
};

exports.preloader = preloader;
},{}],"NS1M":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomPage = randomPage;
exports.createURLYouTube = createURLYouTube;
exports.createInfo = exports.transformSlide = exports.create = void 0;

var _fetch = require("./fetch");

const create = (tag, classItem = '', text = '') => {
  const item = document.createElement(tag);
  item.classList.add(classItem);
  item.textContent = text;
  return item;
};

exports.create = create;

const transformSlide = async slide => {
  const img = slide.querySelector('.preview');
  const desc = slide.querySelector('.overlay');
  img.classList.add('small');
  desc.classList.add('small');
  await setTimeout(() => {
    img.classList.remove('small');
    desc.classList.remove('small');
  }, 300);
  document.querySelector('.description__overlay').classList.add('active');
  document.querySelector('.description__wrapper').classList.add('active');
  (0, _fetch.getId)(slide.querySelector('.slider__title').textContent, slide.querySelector('.raiting').textContent);
};

exports.transformSlide = transformSlide;

const createInfo = data => {
  let countries = '',
      fulters = '';
  data.genres.forEach(fulter => {
    fulters += fulter.genre + ', ';
  });
  data.countries.forEach(country => {
    countries += country.country + ', ';
  });
  const $description__wrapper = document.querySelector('.description__wrapper');
  $description__wrapper.innerHTML = '';
  const wrap = create('div', 'wrapper-info');
  if (!data.filmLength) data.filmLength = '~01:30';
  wrap.insertAdjacentHTML('afterbegin', `
                 <div class="description__wrapper-title">${data.nameRu}</div>
                <div class="description__wrapper-titleEn"><span class="blue">EN:<span> ${data.nameEn}</div>
                <div class="description__wrapper-genres"><span class="blue">Жанр:<span> ${fulters}</div>
                <div class="description__wrapper-destributors"><span> ${countries}<span> ${data.distributors} ${data.distributorRelease} ${data.year + ', '} ${data.filmLength} Часа</div>
                <div class="description__wrapper-country"><span class="blue">Страна премьеры:<span> ${data.premiereWorldCountry}</div>
                <div class="description__wrapper-premier-world"><span>Дата премьеры в мире:<span> ${data.premiereWorld}</div>
                <div class="description__wrapper-premier-ru"><span>Дата премьеры в России:<span> ${data.premiereRu}</div>
                <div class="description__wrapper-filmslogan"><span class="blue">Слоган фильма:<span> ${data.slogan}</div>
                <div class="description__wrapper-desFilm"><span class="blue">Описание:<span> ${data.description}</div>
                <div class="description__wrapper-poster">
                  <img class="preview" width="200px" height="300px" src=${data.posterUrlPreview} alt=${data.nameEn}>
                  <div class="description__wrapper-trailer"></div>
                </div>
                
                <div class="description__wrapper-type">${data.type}</div>
                <div class="description__wrapper-age">${data.ratingAgeLimits}+</div>
                <div class="description__wrapper-facts"><span class="blue">Факты: <span>${data.facts}</div>
    `);
  const nameEn = wrap.querySelector('.description__wrapper-titleEn'),
        slogan = wrap.querySelector('.description__wrapper-filmslogan'),
        premierRu = wrap.querySelector('.description__wrapper-premier-ru'),
        facts = wrap.querySelector('.description__wrapper-facts'),
        premierContry = wrap.querySelector('.description__wrapper-country'),
        premierAll = wrap.querySelector('.description__wrapper-premier-world'),
        desc = wrap.querySelector('.description__wrapper-desFilm'),
        age = wrap.querySelector('.description__wrapper-age');
  if (!data.nameEn) wrap.removeChild(nameEn);
  if (!data.ratingAgeLimits) age.textContent = '0+';
  if (!data.slogan) wrap.removeChild(slogan);
  if (!data.premiereRu) wrap.removeChild(premierRu);
  if (!data.premiereWorldCountry) wrap.removeChild(premierContry);
  if (!data.premiereWorld) wrap.removeChild(premierAll);
  if (!data.description) wrap.removeChild(desc);
  if (data.facts == false) wrap.removeChild(facts);
  $description__wrapper.appendChild(wrap);
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '10px';
  const $header = document.querySelector('.header');
  $header.style.paddingRight = '10px';
};

exports.createInfo = createInfo;

function randomPage(number) {
  number -= 1;
  return Math.floor(Math.random() * number + 1);
}

function createURLYouTube(dataArray) {
  let currentURL;
  dataArray.forEach(item => {
    if (item.site == 'YOUTUBE' && !currentURL && item.name == 'Трейлер' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Трейлер (дублированный)' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Тизер-трейлер (дублированный)' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Трейлер №1' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Трейлер №2' || item.site == 'YOUTUBE' && !currentURL && item.name == 'Фрагмент (дублированный)') {
      currentURL = item.url;
      preparingDataURL(currentURL);
    }
  });

  if (!currentURL) {
    preparingDataURL('NotFound');
  }
}

function preparingDataURL(data) {
  const trailer = document.querySelector('.description__wrapper-trailer');

  if (data == 'NotFound') {
    return trailer.innerHTML = `<div class="noFind">Трейлер не найден :/</div>`;
  } else if (data.includes('https://www.youtube.com/v/')) {
    let yURL = data.replace('https://www.youtube.com/v/', '');
    trailer.innerHTML = `<iframe class="youtube" width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (data.includes('https://www.youtube.com/watch?v=')) {
    let yURL = data.replace('https://www.youtube.com/watch?v=', '');
    trailer.innerHTML = `<iframe class="youtube" width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (data.includes('https://youtu.be/')) {
    let yURL = data.replace('https://youtu.be/', '');
    trailer.innerHTML = `<iframe class="youtube" width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (data.includes('http://www.youtube.com/v/')) {
    let yURL = data.replace('http://www.youtube.com/v/', '');
    trailer.innerHTML = `<iframe width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (data.ignore('https://www.youtube.com/watch?&v=')) {
    let yURL = data.replace('https://www.youtube.com/watch?&v=', '');
    trailer.innerHTML = `<iframe class="youtube" width="560" height="305" src="https://www.youtube.com/embed/${yURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
}
},{"./fetch":"hyU7"}],"CJZo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSwiper = createSwiper;

function createSwiper(slider, prev, next) {
  const swiper = new Swiper('.' + slider, {
    navigation: {
      nextEl: '.' + next,
      prevEl: '.' + prev
    },
    slidesPerView: 3,
    spaceBetween: 30,
    autoHeight: true,
    breakpoints: {
      1470: {
        slidesPerView: 6
      },
      1060: {
        slidesPerView: 5
      },
      440: {
        slidesPerView: 4
      }
    }
  });
}
},{}],"xPMl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSlides = createSlides;
exports.openSearch = openSearch;
exports.closeSearch = closeSearch;
exports.createSearchMovies = createSearchMovies;

var _utils = require("./utils");

var _swiper = require("../swiper");

var _fetch = require("./fetch");

function createSlides(data, append, chose = false, slider, prev, next) {
  const recomend = document.querySelector(`.` + append);
  data.forEach(film => {
    let countries = '',
        genres = '';
    film.genres.forEach(genre => genres += `${genre.genre}, `);
    film.countries.forEach(item => countries += `${item.country}, `);
    const item = (0, _utils.create)('div', 'swiper-slide');
    item.insertAdjacentHTML('afterbegin', `
                         <div class="slide">
                            <div class="overlay">
                                <div class="chose">Выбор PWA-NZ</div>
                                <div class="desc">
                                    <div class="raiting">${film.rating}</div>
                                    <div class="year">${film.year}</div>
                                    <div class="countries">${countries}</div>
                                    <div class="filters">${genres}</div>
                                    <div class="length">${film.filmLength} Часа</div>
                                    <div class="d-show"></div>
                                </div>
                            </div>
                            <img class="preview" width="200px" height="300px" src=${film.posterUrlPreview} alt=${film.nameEn}>
                            <div class="slider__title">${film.nameRu}</div>
                            <div class="see__trailer">Смотреть трейлер</div>
                        </div>
        `);
    const ovelay = item.querySelector('.overlay');
    if (!chose) ovelay.removeChild(ovelay.querySelector('.chose'));
    const desc = item.querySelector('.desc');
    if (!film.filmLength) desc.removeChild(item.querySelector('.length'));
    if (!film.rating) return item.querySelector('.raiting').textContent = 0;

    if (film.rating > 7.0) {
      const raiting = item.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid green';
    } else if (film.rating <= 7.0 && film.rating > 4.0) {
      const raiting = item.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid yellow';
    } else if (film.rating <= 4.0) {
      const raiting = item.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid red';
    }

    recomend.appendChild(item);
  });
  (0, _swiper.createSwiper)(slider, prev, next);
}

function openSearch() {
  const overlay = document.querySelector('.search__title');
  overlay.classList.add('activeSearch');
  const title = document.querySelector('.search__title-wrapper ');
  title.classList.add('activeSearch');
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  document.body.style.overflow = 'visible';
  const $header = document.querySelector('.header');
  $header.style.paddingRight = '0px';
  const overlay = document.querySelector('.search__title');
  overlay.classList.remove('activeSearch');
  const title = document.querySelector('.search__title-wrapper ');
  title.classList.remove('activeSearch');
  const $results = document.querySelector('.results');
  $results.innerHTML = '';
  $results.classList.remove('resa');
  const searchWrapper = document.querySelector('.search__title-wrapper');
  searchWrapper.style.marginTop = '9rem';
}

let currentPage = 1;

async function createSearchMovies(dataArray, text, newP) {
  const $results = document.querySelector('.results');
  if (newP) $results.innerHTML = '';
  await dataArray.forEach(film => {
    let countries = '',
        genres = '';
    film.genres.forEach(genre => genres += `${genre.genre}, `);
    film.countries.forEach(item => countries += `${item.country}, `);
    $results.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="overlay small">
                                <div class="desc small">
                                    <div class="raiting">${film.rating}</div>
                                    <div class="year">${film.year}</div>
                                    <div class="countries">${countries}</div>
                                    <div class="filters">${genres}</div>
                                    <div class="length">${film.filmLength} Часа</div>
                                    <div class="d-show"></div>
                                </div>
                            </div>
                            <img class="preview small" width="200px" height="300px" src=${film.posterUrlPreview} alt=${film.nameEn}>
                            <div class="slider__title">${film.nameRu}</div>
                            <div class="see__trailer">Смотреть трейлер</div>
                        </div>
             `);

    if (film.rating > 7.0) {
      const raiting = $results.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid green';
    } else if (film.rating <= 7.0 && film.rating > 4.0) {
      const raiting = $results.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid yellow';
    } else if (film.rating <= 4.0) {
      const raiting = $results.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid red';
    }
  });
  $results.classList.add('resa');
  const searchWrapper = document.querySelector('.wrap-sear');
  const premiers = searchWrapper.querySelector('.premiers');
  searchWrapper.style.marginTop = '0rem';

  if (premiers) {
    searchWrapper.removeChild(premiers);
  }

  $results.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="see-more SearchSemore">Загрузить ещё</div>
                        </div>
    `);
  const seeMore = $results.querySelector('.SearchSemore');
  seeMore.addEventListener('click', () => {
    currentPage++;
    (0, _fetch.preparingDataForm)(currentPage, text, true);
    $results.removeChild(seeMore.parentNode);
  });
}
},{"./utils":"NS1M","../swiper":"CJZo","./fetch":"hyU7"}],"sDmO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preparingDataFulter = preparingDataFulter;
exports.createFulterData = createFulterData;
exports.closeFulters = closeFulters;
exports.fulterItem = void 0;

var _fetch = require("./fetch");

const allgenres = [{
  "id": 1750,
  "genre": "Аниме"
}, {
  "id": 22,
  "genre": "Биография"
}, {
  "id": 3,
  "genre": "Боевики"
}, {
  "id": 13,
  "genre": "Вестерн"
}, {
  "id": 19,
  "genre": "Военный"
}, {
  "id": 17,
  "genre": "Детективы"
}, {
  "id": 456,
  "genre": "Детский"
}, {
  "id": 20,
  "genre": "Для взрослых"
}, {
  "id": 12,
  "genre": "Документальный"
}, {
  "id": 8,
  "genre": "Драма"
}, {
  "id": 27,
  "genre": "Игра"
}, {
  "id": 23,
  "genre": "История"
}, {
  "id": 6,
  "genre": "Комедии"
}, {
  "id": 1747,
  "genre": "Концерт"
}, {
  "id": 15,
  "genre": "Короткометражки"
}, {
  "id": 16,
  "genre": "Криминал"
}, {
  "id": 7,
  "genre": "Мелодрамы"
}, {
  "id": 21,
  "genre": "Музыка"
}, {
  "id": 14,
  "genre": "Мультфильмы"
}, {
  "id": 9,
  "genre": "Мюзикл"
}, {
  "id": 28,
  "genre": "Новости"
}, {
  "id": 10,
  "genre": "Приключения"
}, {
  "id": 25,
  "genre": "Реальное ТВ"
}, {
  "id": 11,
  "genre": "Семейный"
}, {
  "id": 24,
  "genre": "Спорт"
}, {
  "id": 26,
  "genre": "Ток-шоу"
}, {
  "id": 4,
  "genre": "Триллер"
}, {
  "id": 1,
  "genre": "Ужасы"
}, {
  "id": 2,
  "genre": "Фантастика"
}, {
  "id": 18,
  "genre": "Фильм-нуар"
}, {
  "id": 5,
  "genre": "Фэнтези"
}, {
  "id": 1751,
  "genre": "Церемония"
}];
let fulterItem;
exports.fulterItem = fulterItem;
let currentpage = 1;

function preparingDataFulter(fulter) {
  if (fulter) {
    exports.fulterItem = fulterItem = fulter;
    allgenres.forEach(fulterItem => {
      if (fulterItem.genre == fulter) {
        (0, _fetch.preparingDataFultersHeader)(fulterItem.id, fulterItem.genre);
      }
    });
  } else {
    allgenres.forEach(fulterI => {
      if (fulterI.genre == fulterItem) {
        currentpage++;
        (0, _fetch.preparingDataFultersHeader)(fulterI.id, fulterI.genre, currentpage, false);
      }
    });
  }
}

function createFulterData(filmsArray, name, item = true, itemF = false) {
  const results = document.querySelector('.results__fulter-wrapper');
  if (item) results.innerHTML = '';
  results.insertAdjacentHTML('beforeend', `
                <div class="results__fulter-title">${name}</div>
                <div class="results__fulter-movies"></div>
    `);
  const resultsMovies = document.querySelector('.results__fulter-movies');
  filmsArray.forEach(film => {
    let countries = '',
        genres = '';
    film.genres.forEach(genre => genres += `${genre.genre}, `);
    film.countries.forEach(item => countries += `${item.country}, `);
    resultsMovies.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="overlay">
                                <div class="desc">
                                    <div class="raiting">${film.rating}</div>
                                    <div class="year">${film.year}</div>
                                    <div class="countries">${countries}</div>
                                    <div class="filters">${genres}</div>
                                    <div class="d-show"></div>
                                </div>
                            </div>
                            <img class="preview" width="200px" height="300px" src=${film.posterUrlPreview} alt=${film.nameEn}>
                            <div class="slider__title">${film.nameRu}</div>
                            <div class="see__trailer">Смотреть трейлер</div>
                        </div>
        `);

    if (film.rating > 7.0) {
      const raiting = resultsMovies.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid green';
      return;
    } else if (film.rating <= 7.0 && film.rating >= 4.0) {
      const raiting = resultsMovies.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid yellow';
      return;
    } else if (film.rating <= 4.0) {
      const raiting = resultsMovies.querySelector('.raiting');
      raiting.style.borderBottom = '2px solid red';
      return;
    }
  });

  if (itemF) {
    resultsMovies.insertAdjacentHTML('beforeend', `
                        <div class="slide">
                            <div class="see-morePopular">Посмотреть всё</div>
                        </div>
    `);
  } else {
    resultsMovies.insertAdjacentHTML('beforeend', `
                        <div class="slide">
                            <div class="see-moreFulters">Посмотреть всё</div>
                        </div>
    `);
  }

  document.body.style.overflow = 'hidden';
  const $results__fulter = document.querySelector('.results__fulter');
  $results__fulter.classList.add('activeFulter');
}

function closeFulters() {
  exports.fulterItem = fulterItem = '';
  document.body.style.overflow = 'visible';
  const $results__fulter = document.querySelector('.results__fulter');
  $results__fulter.classList.remove('activeFulter');
}
},{"./fetch":"hyU7"}],"hyU7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preparingDataAll = preparingDataAll;
exports.preparingDataFulters = preparingDataFulters;
exports.preparingDataTopAwait = preparingDataTopAwait;
exports.preparingDataForm = preparingDataForm;
exports.preparingDataFultersHeader = preparingDataFultersHeader;
exports.preparingDataTopPopular = preparingDataTopPopular;
exports.getId = void 0;

var _model = require("./model");

var _utils = require("./utils");

var _preparingDataFilters = require("./preparingDataFilters");

const all = [];

async function preparingDataAll(currentPage = 1) {
  currentPage = (0, _utils.randomPage)(13);
  const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
  const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${currentPage}`;
  const resp = await fetch(API_URL, {
    headers: {
      "X-Api-Key": API_KEY
    }
  });
  const responceAll = await resp.json();
  all.push(responceAll.films);
  console.log(all);
  await (0, _model.createSlides)(responceAll.films, 'recomend', true, 'recomendSlider', 'prevRecomend', 'nextRecomend');
  await preparingDataFulters(17, 1, false, 'fulters-det', 'detSlider', 'prevDet', 'nextDet');
  await preparingDataFulters(3, 1, false, 'fulters-ring', 'ringSlider', 'prevRing', 'nextRing');
  await preparingDataTopAwait(1, 'await', false, 'awaitSlider', 'prevAwait', 'nextAwait');
  await preparingDataFulters(1750, 1, false, 'anime', 'animeSlider', 'prevAnime', 'nextAnime');
  await preparingDataFulters(2, 1, false, 'about', 'aboutSlider', 'prevAbout', 'nextAbout');
  await preparingDataFulters(6, 1, false, 'comed', 'comedSlider', 'prevComed', 'nextComed');
  await preparingDataFulters(7, 1, false, 'melodrams', 'melodramsSlider', 'prevMelodrams', 'nextMeloadrams');
  await preparingDataFulters(1, 1, false, 'creppy', 'creppySlider', 'prevCreppy', 'nextCreppy');
  await preparingDataFulters(5, 1, false, 'fant', 'fantSlider', 'prevFant', 'nextFant');
  await preparingDataFulters(15, 1, false, 'short', 'shortSlider', 'prevShort', 'nextShort');
}

async function preparingDataFulters(fulter, pageNumber, chose, append, slider, prev, next) {
  pageNumber = (0, _utils.randomPage)(5);
  const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
  const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${fulter}&order=YEAR&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2020&page=${pageNumber}`;
  const resp = await fetch(API_URL, {
    headers: {
      "X-Api-Key": API_KEY
    }
  });
  const responceAll = await resp.json();
  all.push(responceAll.films);
  (0, _model.createSlides)(responceAll.films, append, chose, slider, prev, next);
}

async function preparingDataTopAwait(page, append, chose, slider, prev, next) {
  const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
  const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=${page}`;
  const resp = await fetch(API_URL, {
    headers: {
      "X-Api-Key": API_KEY
    }
  });
  const responceAll = await resp.json();
  all.push(responceAll.films);
  (0, _model.createSlides)(responceAll.films, append, chose, slider, prev, next);
}

let id = '';

const getId = async (name, raiting) => {
  await all.forEach(item => {
    item.forEach(film => {
      if (film.nameRu == name && film.rating == raiting) {
        id = '';
        id = film.filmId;
        return;
      }
    });
  });
  getInfoforId(id);
};

exports.getId = getId;

async function getInfoforId(id) {
  if (id) {
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`;
    const resp = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY
      }
    });
    const responce = await resp.json();
    await (0, _utils.createInfo)(responce.data);
    getYouTube(id);
  } else {
    const $description__wrapper = document.querySelector('.description__wrapper');
    $description__wrapper.innerHTML = `
        <div class="ErrorId">Ошибка: 401, похоже фильм/сериал/мультфильм низкорейтинговый :/</div>
        `;
  }
}

async function getYouTube(id) {
  const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
  const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`;
  const resp = await fetch(API_URL, {
    headers: {
      "X-Api-Key": API_KEY
    }
  });
  const responce = await resp.json();
  (0, _utils.createURLYouTube)(responce.items);
}

async function preparingDataForm(page = 1, text, more = false) {
  if (text && more) {
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${text}&page=${page}`;
    const resp = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY
      }
    });
    const responce = await resp.json();

    if (responce.pagesCount <= page) {
      const $results = document.querySelector('.results');
      $results.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="see-more SearchSemore">Результатов больше нет</div>
                        </div>
                `);
      return;
    }

    all.push(responce.films);
    await (0, _model.createSearchMovies)(responce.films, text);
  } else {
    let inputValue = document.querySelector('.search__title-input');
    const text = encodeURI(inputValue.value);
    inputValue.value = '';
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${text}&page=${page}`;
    const resp = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY
      }
    });
    const responce = await resp.json();
    all.push(responce.films);
    await (0, _model.createSearchMovies)(responce.films, text, true);
  }
}

async function preparingDataFultersHeader(fulter, genre, page = 1, item) {
  const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
  const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${fulter}&order=YEAR&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2020&page=${page}`;
  const resp = await fetch(API_URL, {
    headers: {
      "X-Api-Key": API_KEY
    }
  });
  const responceAll = await resp.json();
  all.push(responceAll.films);

  if (responceAll.pagesCount <= page) {
    const res = document.querySelector('.results__fulter-movies');
    res.insertAdjacentHTML('beforeend', `
                         <div class="slide small smallMargin">
                            <div class="see-more SearchSemore">Результатов больше нет</div>
                        </div>
                `);
    return;
  }

  (0, _preparingDataFilters.createFulterData)(responceAll.films, genre, item);
}

async function preparingDataTopPopular(item, page = 1) {
  if (item) {
    const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
    const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${item}`;
    const resp = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY
      }
    });
    const responceAll = await resp.json();
    all.push(responceAll.films);
    (0, _preparingDataFilters.createFulterData)(responceAll.films, 'Топ популярных фильмов', true, true);
    return;
  }

  const API_KEY = 'd4121654-de25-4589-9d26-0694e00a8ae8';
  const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`;
  const resp = await fetch(API_URL, {
    headers: {
      "X-Api-Key": API_KEY
    }
  });
  const responceAll = await resp.json();
  all.push(responceAll.films);
  (0, _preparingDataFilters.createFulterData)(responceAll.films, 'Топ популярных фильмов', true, true);
}
},{"./model":"xPMl","./utils":"NS1M","./preparingDataFilters":"sDmO"}],"i5Wi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentpageI = void 0;

var _tilt = require("./blocks/tilt");

var _preloader = require("./blocks/preloader");

var _fetch = require("./blocks/fetch");

var _utils = require("./blocks/utils");

var _model = require("./blocks/model");

var _preparingDataFilters = require("./blocks/preparingDataFilters");

let currentpageI = 1;
exports.currentpageI = currentpageI;

document.body.onload = async function () {
  await (0, _fetch.preparingDataAll)();
  const cards = document.querySelectorAll('.slide');
  cards.forEach((item, i) => {
    item.addEventListener('mousemove', _tilt.rotate);
    item.addEventListener('mouseleave', _tilt.remove);
  });
  await (0, _preloader.preloader)();
  const form = document.getElementById('searchForm');
  await form.addEventListener('submit', e => {
    e.preventDefault();
    (0, _fetch.preparingDataForm)();
  });
};

document.body.addEventListener('click', e => {
  if (e.target.classList.contains('d-show')) {
    return (0, _utils.transformSlide)(e.target.parentNode.parentNode.parentNode);
  }

  if (e.target.classList.contains('overlay')) return (0, _utils.transformSlide)(e.target.parentNode);

  if (e.target.classList.contains('description__overlay')) {
    document.querySelector('.description__wrapper').classList.remove('active');
    document.querySelector('.description__overlay').classList.remove('active');
    setTimeout(() => {
      document.querySelector('.description__wrapper').innerHTML = '';
    }, 1000);
    document.body.style.overflow = 'visible';
    document.body.style.paddingRight = '0';
    return;
  }

  if (e.target.classList.contains('svg')) return (0, _model.openSearch)();
  if (e.target.classList.contains('close')) return (0, _model.closeSearch)();
  if (e.target.classList.contains('search__title')) return (0, _model.closeSearch)();
  if (e.target.classList.contains('nav__items-filter')) return (0, _preparingDataFilters.preparingDataFulter)(e.target.textContent);

  if (e.target.classList.contains('see-moreFulters')) {
    const res = document.querySelector('.results__fulter-movies');
    res.removeChild(e.target.parentNode);
    return (0, _preparingDataFilters.preparingDataFulter)();
  }

  if (e.target.classList.contains('back') || e.target.classList.contains('backArrow')) return (0, _preparingDataFilters.closeFulters)();
  if (e.target.classList.contains('allrecomend')) return (0, _fetch.preparingDataTopPopular)();

  if (e.target.classList.contains('see-morePopular')) {
    exports.currentpageI = currentpageI = currentpageI + 1;
    return (0, _fetch.preparingDataTopPopular)(currentpageI);
  }
});
},{"./blocks/tilt":"tMJT","./blocks/preloader":"sEiw","./blocks/fetch":"hyU7","./blocks/utils":"NS1M","./blocks/model":"xPMl","./blocks/preparingDataFilters":"sDmO"}]},{},["i5Wi"], null)