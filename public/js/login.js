

const form = document.getElementById('loginForm')
form.addEventListener('submit', async evt =>{
    evt.preventDefault()
    let data = new FormData(form)
    let obj = {}
    data.forEach((value,key) => obj[key]= value);
    console.log(obj)
     fetch('/api/login', {
        method:'POST',
        body: obj,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response=>console.log(response.body)).catch(error => console.error('Error:', error));
})
