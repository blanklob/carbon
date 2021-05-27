export default function getProduct(productId, el) {
  
  fetch(`http://localhost:8000/products/${productId}`)
  .then(response => response.json())
  .then(response => el.innerHTML=response.product.title)
  .catch(error => console.log("Erreur : " + error))
}
