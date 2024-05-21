const search = document.getElementById("input-btn");
const inputValue = document.getElementById("input");
const leftContainer = document.getElementById("left");
const rightContainer = document.getElementById("right");


search.addEventListener('click', () => {
    searchPlayer(inputValue.value);
})


const defaultDisplay = () => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=a")
        .then(res => res.json())
        .then(data => {
            if (data && data.player) {
                displayPayers(data.player);
            }
        })
}
defaultDisplay();

const searchPlayer = (value) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${value}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.player) {
                displayPayers(data.player);
            }
            else {
                leftContainer.innerHTML = "";
                leftContainer.innerHTML = `<h2 class="not-found">Player Not Found!</h2>`;
            }
        })
}


let count = 0;

const displayPayers = (players) => {
    leftContainer.innerHTML = "";

    players.forEach(player => {
        const div = document.createElement("div");
        div.classList.add("player-cart");
        div.innerHTML = `
                <div class"items-center">
                    <img class="profile-img" src="${player?.strCutout}" alt="profile">
                    <h6 class="text-center mt-2 title">${player.strPlayer}</h6>
                    <p class="text-center">${player.strNationality}</p>
                    <p class="text-center">${player.strTeam}</p>
                    <p class="text-center">${player.strHeight}</p>
                    <p class="text-center">${player.strWeight}</p>
                    
                    <div class="d-flex justify-content-between p-1 pb-2">
                        <button 
                        
                        type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal"
                        
                        onclick="showDetails('${player.strThumb}','${player.strPlayer}','${player.strNationality}',
                        '${player.strHeight}','${player.strWeight}')" class="btn btn-primary">Details</button>
                        <button onclick = "addToCart('${player.strPlayer}')" class="btn btn-info">Add To Cart</button>
                    </div>
                <div>
        `;
        leftContainer.appendChild(div);
    }
    )
}
const showDetails = (name, nationality, height, weight) => {
    alert(`Name: ${name} \nHeight: ${height} \nWeight: ${weight} \nNationality: ${nationality}`);

}


const addToCart = (name) => {

    if (count == 11) {
        alert("You can not add player anymore.");
    }
    else {
        count += 1;
        document.getElementsByTagName("span")[0].innerText = count;

        const div = document.createElement("div");
        div.innerHTML = `
                <h4 class="right-player">${name}</h4>
            `;
        rightContainer.appendChild(div);
    }
}