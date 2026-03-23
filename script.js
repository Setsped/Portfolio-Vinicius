
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

// FORMULÁRIO

var formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  var nome     = document.getElementById('nome').value.trim();
  var email    = document.getElementById('email').value.trim();
  var mensagem = document.getElementById('mensagem').value.trim();

  var erroNome     = document.getElementById('erroNome');
  var erroEmail    = document.getElementById('erroEmail');
  var erroMensagem = document.getElementById('erroMensagem');

  erroNome.textContent = '';
  erroEmail.textContent = '';
  erroMensagem.textContent = '';
  document.getElementById('nome').classList.remove('campo-erro');
  document.getElementById('email').classList.remove('campo-erro');
  document.getElementById('mensagem').classList.remove('campo-erro');

  var valido = true;

  if (nome.length < 3) {
    erroNome.textContent = nome === '' ? 'Informe seu nome.' : 'O nome precisa ter pelo menos 3 letras.';
    document.getElementById('nome').classList.add('campo-erro');
    valido = false;
  }

  // Validade de e-mail
  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    erroEmail.textContent = email === '' ? 'Informe seu e-mail.' : 'E-mail inválido. Ex: nome@email.com';
    document.getElementById('email').classList.add('campo-erro');
    valido = false;
  }

  if (mensagem.length < 10) {
    erroMensagem.textContent = mensagem === '' ? 'Escreva uma mensagem.' : 'A mensagem precisa ter pelo menos 10 caracteres.';
    document.getElementById('mensagem').classList.add('campo-erro');
    valido = false;
  }

  if (valido) {
    var btn = document.getElementById('btnEnviar');
    btn.textContent = 'Enviando... ⏳';
    btn.disabled = true;

    setTimeout(function () {
      formulario.reset();
      btn.textContent = 'Enviar mensagem ✉️';
      btn.disabled = false;

      var sucesso = document.getElementById('formSucesso');
      sucesso.classList.remove('escondido');

      setTimeout(function () {
        sucesso.classList.add('escondido');
      }, 5000);
    }, 1200);
  }
});


// ANO NO RODAPÉ

document.getElementById('ano').textContent = new Date().getFullYear();
