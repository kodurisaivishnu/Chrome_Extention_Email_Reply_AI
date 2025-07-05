console.log("Email Writer Extension - Content Script Loaded")

function createAIButton(){
  const button = document.createElement('div');
  button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
  button.style.marginRight = '8px';
  button.innerHTML = "AI Reply"
  button.setAttribute('role','button');
  button.setAttribute('data-tooltip','Generate AI Reply');
  return button;
}


function getEmailContent(){
  const selectors = [
    '.h7',
    '.a3s.aiL',
    '.gmail_quote',
    '[role="presentation"]'
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if(content) return content.innerText.trim();
    return '';
  }
}


function findComposeToolbar(){
  const selectors = [
    '.btC',
    '.aDh',
    '[role="toolbar"]',
    '.gU.Up'
  ];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if(toolbar) return toolbar; 
    return null;
  }
}

function injectButton() {
  const existingButton = document.querySelector('.ai-reply-btn');
  if(existingButton) existingButton.remove();

  const toolbar = findComposeToolbar();

  if(!toolbar){
    console.log("tool bar not found");
    return;
  }else{
    console.log("Tool bar found, creating AI Button");
    const button =  createAIButton();
    button.classList.add('.ai-reply-btn');
    button.addEventListener('click', async ()=>{
      try {
        button.innerHTML = 'Generating...';
        button.disabled = true;

        const emailContent = getEmailContent();

        const response = await fetch('https://chrome-extention-email-reply-ai.onrender.com/api/email/generate',{
          method:'POST',
          headers:{
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            emailContent : emailContent,
            tone : "professional"
          })
        });

        if(!response.ok){
          throw new Error('Api Request Failed !');
        }

        const generatedReply  = await response.text();

        const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

        if(composeBox){
          composeBox.focus();
          document.execCommand('insertText',false,generatedReply);
        }else{
          console.log('Compose box was not found !');
        }

      } catch (error) {
        console.error(error);
       alert('Failed to generate Reply');
      }finally{
        button.innerHTML = 'AI Reply'
        button.disabled = false; 
      }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
  }
}

//start here
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return (
          node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]')
        );
      }
      return false;
    });

    if (hasComposeElements) {
      console.log("Compose window detected");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
 