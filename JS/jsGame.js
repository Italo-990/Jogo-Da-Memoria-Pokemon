class NewGame {
    constructor({gridClass , dificultty, divLoadingClass}){
        this.grid = document.querySelector(`.${gridClass}`)
        this.dificultty = dificultty
        this.divLoading = document.querySelector(`.${divLoadingClass}`)
        this.eventReveal = this.eventReveal.bind(this)
        this.divClick1 = ""
        this.divClick2 = ""
    }
    errorPromisse(){
        alert('Error,please come back later or TRY AGAIN!')
    }
    loadingGame(){
        this.divLoading.classList.add('active')
    }
    addImagesAndName(data,divCardsCreate){
        const divCardsWithImageAndName = []
        for(let i = 0; i < (this.dificultty * 2) ; i++){
            divCardsCreate[i].childNodes[0].style.background = 
            `rgb(235, 235, 235) url(${data[i].image}) no-repeat center`
            divCardsCreate[i].setAttribute('data-pokemon', data[i].name)
            divCardsWithImageAndName[i] = divCardsCreate[i]
        }
        return divCardsWithImageAndName
    }
    arrayWinsContainsFilter(arrayWinsContains){
        arrayWinsContains = arrayWinsContains.filter((element)=>{
            if(element.classList.contains('win')){
                return element
            }
        })
        return arrayWinsContains
    }
    ArraysWinsConvertInArray(WinsContains){
        let arrayWinsContains = []
        for(let i = 0; i < (this.dificultty * 2) ; i++){
            arrayWinsContains[i] = WinsContains[i]
        }
        return arrayWinsContains
    }
    loadingNewGame(){
        setTimeout(()=>{
            window.location.replace("./index.html")
        },1500)
    }
    winGameTest(){
        let WinsContains = this.grid.childNodes

        let arrayWinsContains = this.ArraysWinsConvertInArray(WinsContains)

        arrayWinsContains = this.arrayWinsContainsFilter(arrayWinsContains)

        if( (arrayWinsContains.length) === (this.dificultty * 2)){
            setTimeout(()=>{
                alert('Congratulations you win!')
                this.loadingGame()
                this.loadingNewGame()
            },1100)
        }

    }
    removeDivsClik(){
        this.divClick1 = ""
        this.divClick2 = ""
    }
    rightTest(){
        if((this.divClick1.getAttribute("data-pokemon")) === (this.divClick2.getAttribute("data-pokemon")) ){
            this.divClick1.classList.add('win')
            this.divClick2.classList.add('win')
            this.winGameTest()
            this.removeDivsClik()
        }else{
            setTimeout(()=>{
                 this.divClick1.classList.remove('reveal-card')
                 this.divClick2.classList.remove('reveal-card')
                 this.removeDivsClik()
            },1000)
        }
}
    eventReveal(event){
        if(event.target.parentNode.classList.contains('win')){
            return
        }
       if( (this.divClick1 === "") ) {
            this.divClick1 = event.target.parentNode
            this.divClick1.classList.add('reveal-card')
        }else if( (this.divClick2 === "") && (event.target.parentNode != this.divClick1) && (event.target.parentNode != this.grid) ) {
            this.divClick2 = event.target.parentNode
            this.divClick2.classList.add('reveal-card')
            this.rightTest()
        }
    }
    showCards(data,divCardsCreate){
        const divAddImagesAndName = this.addImagesAndName(data,divCardsCreate)
        for(let i = 0; i < (this.dificultty * 2); i++){
            this.grid.appendChild(divAddImagesAndName[i])
            divAddImagesAndName[i].addEventListener('click', (e)=> this.eventReveal(e))
        }
        setTimeout(()=>{
            this.divLoading.classList.remove('active')
        },1500)
    }
    createElement(tagName,className){
        const element = document.createElement(tagName)
        element.classList = className
        return element
    }
    createCardsDiv(){
        const divCardsCreate = []
        for(let i = 0; i < (this.dificultty * 2);i++){
            const cardDiv = this.createElement('div','card')
            const frontDiv = this.createElement('div','face front')
            const backDiv = this.createElement('div','face back')
            cardDiv.appendChild(frontDiv)
            cardDiv.appendChild(backDiv)
            divCardsCreate[i] = cardDiv
        }
        return divCardsCreate
    }
    async requestAPI(){
        try{
            const data = [{}]
            for(let i = 0; i < this.dificultty ;i++){
                const randomNumber = Math.floor(Math.random() * 600 + 1)
                const request = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)).json()
                data[i] = {
                    name: request.name,
                    image : request.sprites.front_default
                }
            }
            const dataDuplicate = [...data, ...data]
            const shuffleDataDuplicate = dataDuplicate.sort(()=>Math.random() - 0.5)
            const cardDivsCreates = this.createCardsDiv()
            this.showCards(shuffleDataDuplicate,cardDivsCreates)
        }catch(e){
            this.errorPromisse()
            throw Error(e)
        }
    }
    init(){
        this.loadingGame()
        this.requestAPI()
    }
}
if(!localStorage.getItem('dificuldade')){
    window.location = "./index.html"
}else{
    const jogo = new NewGame({
        gridClass: 'gridGame',
        dificultty: localStorage.getItem('dificuldade'),
        divLoadingClass : 'loading'
    })  
    jogo.init()  
}
