import qs from 'qs';

function check() {
  const allDivs = [...document.querySelectorAll('div')];
  const phoneNumberLabel = allDivs.find(d => d.textContent === 'On your phone, dial:');
  const pinLabel = allDivs.find(d => d.textContent === 'Enter this PIN when prompted:');
  
  if (!phoneNumberLabel || !pinLabel) {
    return;
  }

  const phoneNumberElement = phoneNumberLabel.nextElementSibling;
  const pinElement = pinLabel.nextElementSibling;

  if (!phoneNumberElement || !pinElement) {
    return;
  }

  
  // Make sure that there is a new Dial In Share div.
  let shareElement = document.getElementById('dial-in-share-value');
  if (!shareElement) {
    const dialInShareContainer = document.createElement('div');
    dialInShareContainer.className = pinLabel.parentNode.className;
    pinElement.parentNode.appendChild(dialInShareContainer);

    // During creation, also add a label.
    const dialInShareLabel = document.createElement('div');
    dialInShareLabel.className = pinLabel.className;
    dialInShareLabel.innerText = 'Or send this to your phone:';
    dialInShareContainer.appendChild(dialInShareLabel);

    // And a value.

    const dialInShareValueContainer = document.createElement('div');
    dialInShareValueContainer.className = pinElement.className;
    dialInShareContainer.appendChild(dialInShareValueContainer);

    shareElement = document.createElement('input')
    shareElement.id = 'dial-in-share-value';
    shareElement.setAttribute('type', 'text');
    shareElement.style.width = '100%';
    shareElement.style.fontSize = 'inherit';
    shareElement.onclick = function() {
      this.select();
      const itWorked = document.execCommand('copy');
      this.select();

      if (itWorked) {
        const itWorkedMessage = document.createElement('span');
        itWorkedMessage.innerText = 'Copied to clipboard!';
        dialInShareContainer.appendChild(itWorkedMessage);
        setTimeout(() => {
          itWorkedMessage.remove();
        }, 5000);
      }
    }
    dialInShareValueContainer.appendChild(shareElement);
  }

  const phoneNumber = phoneNumberElement.innerText;
  const pin = pinElement.innerText;

  shareElement.value = `https://bartlangelaan.github.io/google-meet-send-dial-in/share-result/#${qs.stringify({phoneNumber, pin})}`
}

setInterval(check, 1000);