function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    // let formText = document.getElementById('name').value
    // Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/getResults', {text: 'how are you doing today.'})
    .then(res => res.json())
    .then(function(res) {
        console.log(res.message);
        //document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
