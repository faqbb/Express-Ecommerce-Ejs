let addProduct = async () => {
    console.log('hola')
    fetch('/api/addProduct', {
      method:'POST',
      body:product.id
    }).then(result=>console.log(result)).catch(error => console.error('Error:', error));
  }