
// BOTÃO DE TEMA  

var btnTema   = document.getElementById('btnTema');
var icone     = document.getElementById('icone-tema');
var html      = document.documentElement;

var temaSalvo = localStorage.getItem('tema') || 'escuro';
html.setAttribute('data-tema', temaSalvo);
icone.textContent = temaSalvo === 'escuro' ? '☀️' : '🌙';

btnTema.addEventListener('click', function () {
  var atual  = html.getAttribute('data-tema');
  var novo   = atual === 'escuro' ? 'claro' : 'escuro';

  html.setAttribute('data-tema', novo);
  localStorage.setItem('tema', novo);
  icone.textContent = novo === 'escuro' ? '☀️' : '🌙';
});


//  MENU  MOBILE 

var hamburguer = document.getElementById('hamburguer');
var menuMobile = document.getElementById('menuMobile');

hamburguer.addEventListener('click', function () {
  hamburguer.classList.toggle('aberto');
  menuMobile.classList.toggle('aberto');
});

menuMobile.querySelectorAll('.menu-mobile-link').forEach(function (link) {
  link.addEventListener('click', function () {
    hamburguer.classList.remove('aberto');
    menuMobile.classList.remove('aberto');
  });
});


// CSS LINK ATIVO NO MENU 

var secoes   = document.querySelectorAll('section[id]');
var linksNav = document.querySelectorAll('.menu-link');

var observador = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      linksNav.forEach(function (l) { l.classList.remove('ativo'); });

      var linkAtivo = document.querySelector('.menu-link[href="#' + entry.target.id + '"]');
      if (linkAtivo) linkAtivo.classList.add('ativo');
    }
  });
}, { threshold: 0.4 });

secoes.forEach(function (s) { observador.observe(s); });


// ANIMAÇÃO DAS BARRAS DE IDIOMA

var barras = document.querySelectorAll('.barra-fill');

var observadorBarras = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('animado');
      observadorBarras.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

barras.forEach(function (b) { observadorBarras.observe(b); });


// ANO NO RODAPÉ

document.getElementById('ano').textContent = new Date().getFullYear();
