/*------------------------------------------------------------------------------------------------
---------------------------- LANACION.COM.AR -----------------------------------------------------
------------------------------------------------------------------------------------------------*/
if (matchDomain('lanacion.com.ar')) {
  //crear una fecha
  var date = new Date();
  date.setTime(date.getTime() + (1 * 24 * 60 * 60 *1000));
  //reescribir valores en localStorage
  localStorage.setItem('countNotas','1');
  localStorage.setItem('CDpayUser','si');
  localStorage.setItem('CDusuarioRegistrado','si');
  localStorage.setItem('NotasCounterData','[{"notaId":"AY5WYTAPGFCTLDR26OAZKF6HA4","fecha":"'+date.getFullYear()+"-"+(date.getMonth()+1)+date.getDate()+'"}]');
  //reescribir cookies
  document.cookie = "metering_arc_counter=1; expires="  + date.toGMTString() + "; path=/; domain=.lanacion.com.ar";
  document.cookie = 'controlGroupV3={"GrupoControlMeteredV3":"1","expire":'+(date.getTime()/1000)+',"inicio":'+date.getTime()+',"quota":20}; expires='  + date.toGMTString() + "; path=/; domain=.lanacion.com.ar";
  setTimeout(function(){ document.cookie = "metering_arc_counter=1; expires="  + date.toGMTString() + "; path=/; domain=.lanacion.com.ar"; }, 5000);
}

/*------------------------------------------------------------------------------------------------
---------------------------- PERFIL.COM ----------------------------------------------------------
------------------------------------------------------------------------------------------------*/
if (matchDomain('perfil.com')) {
  //crear una fecha
  var date = new Date();
  date.setTime(date.getTime() + (1 * 24 * 60 * 60 *1000));
  //reescribir valores en localStorage
  localStorage.setItem('url_metered','[{"t":"'+ date.toISOString() +'","u":"/noticias/medios/carta-a-los-lectores-de-perfil-por-el-lanzamiento-del-paywall.phtml"}]');
  //reescribir cookies
  document.cookie = "paywall_meter=1; expires="  + date.toGMTString() + "; path=/; domain=.perfil.com";
  document.cookie = "wpnViewcount=1; expires="  + date.toGMTString() + "; path=/;";
  //esperar a que aparezcan los elementos del paywall
  waitForElm('#pw-zocalo').then(elm => paywallPerfilGratis()); //zocalo "suscribirse gratis"
  waitForElm('#pw-modal').then(elm => paywallPerfil()); //modal de limite de noticias
}

//eliminar paywall de limite de noticias
function paywallPerfil(){
  const paywall = document.querySelector('#pw-modal');
  removeDOMElement(paywall);
}

//eliminar zocalo "suscribirse gratis"
function paywallPerfilGratis(){
  const paywall = document.querySelector('#pw-zocalo');
  removeDOMElement(paywall);
}

/*------------------------------------------------------------------------------------------------
---------------------------- CLARIN.COM ----------------------------------------------------------
------------------------------------------------------------------------------------------------*/
if (matchDomain('clarin.com')) {
  //esperar a que aparezcan los elementos del paywall
  waitForElm('.pase-container').then(elm => paywallClarin());
}

//eliminar paywall de limite de noticias
function paywallClarin()
{
  const paywall = document.querySelector('.mfp-iframe');
  const paywall2 = document.querySelector('.mfp-wrap');
  const paywall3 = document.querySelector('.mfp-bg');
  const body = document.querySelector('html');
  const page = document.querySelector('.mainPage')

  removeDOMElement(paywall, paywall2, paywall3);
  body.removeAttribute('style');
  page.removeAttribute('style');
}

/*------------------------------------------------------------------------------------------------
---------------------------- ELPAIS.COM ----------------------------------------------------------
------------------------------------------------------------------------------------------------*/
if (matchDomain('elpais.com')) {
  //esperar a que aparezcan los elementos del paywall
  waitForElm('.fc-ab-root').then(elm => paywallElPais());
}

//eliminar paywall de limite de noticias
function paywallElPais()
{
  const paywall = document.querySelector('.fc-ab-root');
  const body = document.querySelector('body');


  removeDOMElement(paywall);
  body.removeAttribute('style');
}

/*------------------------------------------------------------------------------------------------
---------------------------- FUNCIONES AUXILIARES ------------------------------------------------
------------------------------------------------------------------------------------------------*/
function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

function matchDomain (domains) {
  const hostname = window.location.hostname;
  if (typeof domains === 'string') { domains = [domains]; }
  return domains.some(domain => hostname === domain || hostname.endsWith('.' + domain));
}

function removeDOMElement (...elements) {
  for (const element of elements) {
    if (element) { element.remove();}
  }
}

