var formE=document.getElementById('formE')
var formC=document.getElementById('formC')
var messageE=document.getElementById('messageE')
var messageC=document.getElementById('messageC')
var subscribeBtn=document.getElementById('subscribeBtn')
if (formE) {
    formE.addEventListener('submit',async function(e){
        e.preventDefault()
        var formData=new FormData(this)
        const email = formData.get('email');
        if (email=="") {
            messageE.innerText="Field's cannot be empty"
            messageE.style.color='red'
            messageE.style.display='block'
            setTimeout(() => {
              messageE.style.display='none'
            }, 2000);
    
        } else {
              const response = await fetch('/account/email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email })
              });
              const responseData = await response.json();
              console.log(responseData)
              if (responseData.status==200) {
                subscribeBtn.innerText="Subscribed ✓"
                subscribeBtn.style.backgroundColor='green'
                subscribeBtn.previousElementSibling.style.display='none'
                subscribeBtn.parentElement.style.justifyContent='center'
                setTimeout(() => {
                    messageE.style.display='none'
                    // window.location.href='/'
                }, 1000);
             }  
        }
    })
}
if (formC) {
    formC.addEventListener('submit', async function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      if (email === "" && name === "") {
          messageC.innerText = "Fields cannot be empty";
          messageC.style.color = 'red';
          messageC.style.display = 'block';
          setTimeout(() => {
              messageC.style.display = 'none';
          }, 2000);
      } else {
          try {
              const response = await fetch('/account/contactInfo', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ name, email, message })
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const responseData = await response.json();
              console.log(responseData);
              if (responseData.status === 200) {
                  messageC.innerText = "Success";
                  messageC.style.color = 'green';
                  messageC.style.display = "block";
                  setTimeout(() => {
                      messageC.style.display = 'none';
                      // window.location.href = '/'; 
                  }, 1000);
              }
          } catch (error) {
              console.error('Error:', error);
              // Handle error here
          }
      }
    });
}    
