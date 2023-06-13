const facil = document.querySelector('.easy')
const medio = document.querySelector('.medium')
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
    localStorage.setItem('dificuldade',15)
    window.location = "./game.html"
})
/*------------------------------------------ANDROID------------------------------------*/
facil.addEventListener('touchstart',(e)=>{
    e.preventDefault()
    localStorage.setItem('dificuldade',5)
    window.location = "./game.html"
})
medio.addEventListener('touchstart',(e)=>{
    e.preventDefault()
    localStorage.setItem('dificuldade',10)
    window.location = "./game.html"
})
dificil.addEventListener('touchstart',(e)=>{
    e.preventDefault()
    localStorage.setItem('dificuldade',15)
    window.location = "./game.html"
})

