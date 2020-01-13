document.addEventListener("DOMContentLoaded", function() {

    let monsterContainer = document.getElementById("monster-container")
    let pageNumber = 1

    fetchMonsters()

    function fetchMonsters() {
        fetch (`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(function(response) {
          return response.json();
        })
        .then(results => {
            results.forEach(monster => renderMonsters(monster))
          });
      }

    function renderMonsters(monster) {
        let monsterDiv = document.createElement('div')
        let headerName = document.createElement('h2')
        let headerAge = document.createElement('h4')
        let monsterDescription = document.createElement('p')

        headerName.innerText = `${monster.name}` 
        headerName.dataset.id = `${monster.id}`
        headerAge.innerText = `Age: ${monster.age}`
        monsterDescription.innerText = `Bio: ${monster.description}`

        monsterDiv.appendChild(headerName)
        monsterDiv.appendChild(headerAge)
        monsterDiv.appendChild(monsterDescription)
        monsterContainer.appendChild(monsterDiv)
    }

    let backButton = document.getElementById("back")
    let forwardButton = document.getElementById("forward")

    backButton.addEventListener("click", function(){
        previousPage()
        fetchMonsters()
    })
    forwardButton.addEventListener("click", function() {
        nextPage()
        fetchMonsters()
    })

    function nextPage() {
        pageNumber = pageNumber + 1
        while (monsterContainer.hasChildNodes()) {
            monsterContainer.removeChild(monsterContainer.firstChild)
        }
    }

    function previousPage() {
        pageNumber = pageNumber - 1
        while (monsterContainer.hasChildNodes()) {
            monsterContainer.removeChild(monsterContainer.firstChild)
        }
    }

    let monsterForm = document.createElement('form')
    monsterForm.innerHTML = `
        <form id="monster-form">
        <input type="text" name="name" placeholder="name">
        <input type="text" name="age" placeholder="age">
        <input type="text" name="description" placeholder="description">
        </br>
    <button id='submit'>submit</button>
    </form>
    `
    createMonster = document.getElementById("create-monster")
    createMonster.appendChild(monsterForm)

    monsterForm.addEventListener("submit", function(e) {
        e.preventDefault()
        
        monster = {name: e.target.name.value, age: e.target.age.value, description: e.target.description.value}
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(monster)
        })
        e.target.reset()
    })

    

    

 


})
