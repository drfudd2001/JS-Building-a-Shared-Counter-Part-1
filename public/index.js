async function main(){

    await getCount()

    let refreshButton = document.createElement("Button")
    refreshButton.setAttribute("onclick", "getCount()")
    refreshButton.innerHTML = "Refresh"
    refreshButton.setAttribute("class", "btn btn-outline-secondary btn-lg px-4")
    document.body.getElementsByClassName("d-grid gap-2 d-sm-flex justify-content-sm-center")[0].appendChild(refreshButton)

    
    let countValue = 0
    const updateCount = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');
    
    function increment(){
        countValue++;
        updateCount();
    }

    function decrement(){
        countValue--;
        updateCount();
    }

    refreshButton.addEventListener('click', getCount);
    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
}
main()

async function updateCount() {
    await fetch("http://192.168.1.170:9001/counter", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "value": countValue
        })
    })
    countContainer.textContent  = countValue.toString()
}

async function getCount() {
    const storedCountObject = await fetch('http://192.168.1.170:9001/counter')
    const storedCountJson = await storedCountObject.json()

    countContainer.textContent = countValue = storedCountJson.value;
}