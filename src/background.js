const enabledSites = [
  'clarin.com',
  'lanacion.com.ar',
  'perfil.com'
];

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  updateBadge(tab);
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, updateBadge);
});

function updateBadge (activeTab) {
  if (chrome.runtime.lastError || !activeTab) { return; }
  const badgeText = getBadgeText(activeTab.url);
  chrome.browserAction.setBadgeBackgroundColor({ color: '#696969' });
  chrome.browserAction.setBadgeText({ text: badgeText });
}

function getBadgeText (currentUrl) {
  return  isSiteEnabled(currentUrl) ? 'ON' : '';
}


function isSiteEnabled (details) {
  var status = false;

  for(var i=0; i<enabledSites.length; i++){
    if(details.indexOf(enabledSites[i]) > -1) {
      status = true;
      break;
    }
  }

  return status;
}
