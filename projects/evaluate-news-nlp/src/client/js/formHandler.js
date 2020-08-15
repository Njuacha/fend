function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    // let formText = document.getElementById('name').value
    // Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    const text = escape('Very wonderful app.')
    postData('http://localhost:8081/getResults', {text: text})
    .then(function(newData) {
        console.log('Subjective: '+newData.subjectivity);
        console.log('Irony: '+newData.irony);
        //console.log('')
    })
}

const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log('error', error);
  }
}

export { handleSubmit }
