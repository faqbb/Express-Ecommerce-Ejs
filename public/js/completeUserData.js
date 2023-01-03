const form = document.getElementById('completeUserData')
form.addEventListener('submit', evt =>{
    evt.preventDefault()
    let data = new FormData(form)
    let obj = {}
    data.forEach((value,key) => obj[key]= value);
    fetch('/api/completeUserData', {
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result =>result.json()).then(json=>console.log(json)).catch(error => console.error('Error:', error));
})