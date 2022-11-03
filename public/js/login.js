const form = document.getElementById('loginForm')
form.addEventListener('submit', async evt =>{
    evt.preventDefault()
    let data = new FormData(form)
    let obj = {}
    data.forEach((value,key) => obj[key]= value);
     fetch('/api/login', {
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result =>result.json()).then(data=>console.log(data)).catch(error => console.error('Error:', error));
})
// tira el mismo error que me tiraba el que tenia websockets, no consigo solucion alguna