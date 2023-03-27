const facil = document.querySelector('.easy')
const medio = document.querySelector('.medim')
const dificil = document.querySelector('.hard')

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
