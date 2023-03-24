const facil = document.querySelector('.facil')
const medio = document.querySelector('.medio')
const dificil = document.querySelector('.dificil')

facil.addEventListener('click',()=>{
    localStorage.setItem('dificuldade',5)
    window.location = "./game.html"
})
medio.addEventListener('click',()=>{
    localStorage.setItem('dificuldade',10)
    window.location = "./game.html"
})
dificil.addEventListener('click',()=>{
    localStorage.setItem('dificuldade',20)
    window.location = "./game.html"
})
