export default function getCollection(el) {
  
  fetch(`http://localhost:8000/products`)
  .then(response => response.json())
  .then(response => {
    response.forEach(element => {
      el.appendChild(document.createTextNode(element.product_title))
    });
  })
  .catch(error => console.log("Erreur : " + error))
}
