class NewGame {
    constructor({gridClass , dificultty, divLoadingClass}){
        this.grid = document.querySelector(`.${gridClass}`)
        this.dificultty = dificultty
        this.divLoading = document.querySelector(`.${divLoadingClass}`)
        this.divClick1 = ""
        this.divClick2 = ""
    }
    errorPromisse(){
        alert('Error,please come back later!')
    }
    loadingGame(){
        this.divLoading.classList.add('active')
        setTimeout(()=>{
            this.divLoading.classList.remove('active')
        },3000)
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
    winGameTest(){
        
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

const jogo = new NewGame({
    gridClass: 'gridGame',
    dificultty: '5',
    divLoadingClass : 'loading'
})

jogo.loadingGame()
jogo.init()