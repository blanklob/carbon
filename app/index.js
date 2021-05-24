import test from './math'
import 'index.css'
  
console.log('Hello Youness')

fetch('http://localhost:8000/')
.then(response => response.json())
.then(res => {
    document.querySelector('.title').innerHTML = "Python à renvoyé ce message: " + res.msg
})
.catch(error => alert("Erreur : " + error));
