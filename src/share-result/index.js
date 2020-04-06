import qs from 'qs';

try {
  const hash = document.location.hash;
  const dialButton = document.getElementById('dial-button');
  
  if (!hash || !dialButton) {
    throw new Error('No hash or dial button.');
  }
  
  const parsedHash = qs.parse(hash.slice(1));
  console.log({parsedHash})
  if (typeof parsedHash.phoneNumber !== 'string' || typeof parsedHash.pin !== 'string') {
    throw new Error('Query parameters not valid.')
  }
  dialButton.setAttribute('href', 'tel:' + encodeURIComponent(parsedHash.phoneNumber + ',' + parsedHash.pin));
  removeHashFromUrl();
}
catch(error) {
  console.error(error);
  showError(error.message);
}


/**
 * Source: https://stackoverflow.com/a/13824103/1907875 
 */ 
function removeHashFromUrl() {
  // remove fragment as much as it can go without adding an entry in browser history:
  window.location.replace("#");

  // slice off the remaining '#' in HTML5:    
  if (typeof window.history.replaceState == 'function') {
    history.replaceState({}, '', window.location.href.slice(0, -1));
  }
}

function showError() {
  document.body.className = 'error';
}