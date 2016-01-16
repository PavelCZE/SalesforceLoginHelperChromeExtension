function _openWindow(url, username, password, incognito, tab) {
    var secret = "dsaklhkh231231jhlkaasd";
    var eUsername = CryptoJS.TripleDES.encrypt(username, secret);
    var ePassword = CryptoJS.TripleDES.encrypt(password, secret);
    
    if (!tab) {
        chrome.windows.create({ 
            url: `${chrome.runtime.getURL('login.html')}?a=${ url }&b=${ePassword}&c=${eUsername}`,
            incognito: incognito 
        });    
    } else {
        chrome.tabs.create({ 
            url: `${chrome.runtime.getURL('login.html')}?a=${ url }&b=${ePassword}&c=${eUsername}`, 
        });
    }
}

export default {
    openWindow: function(url, username, password, incognito = false, tab = false) {
        
        if (incognito) {
            chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess) {
                if (!isAllowedAccess) {
                    alert('To use this feature please allow incognito mode in the following screen.');

                    chrome.tabs.create({
                        url: 'chrome://extensions/?id=' + chrome.runtime.id
                    });
                } else {
                    _openWindow(url, username, password, incognito, tab);
                }
            });
        } else {
            _openWindow(url, username, password, incognito, tab);
        }
    }
}