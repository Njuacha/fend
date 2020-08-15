function handleSubmit(event) {
    event.preventDefault()

    // very simple input validation
    let formText = document.getElementById('formText').value;
    if(formText == "") {
      return;
    }
    // remove white spaces
    formText = formText.trim();
    // add escape characters so that it would be compactible with format required by sentiment api
    formText = escape(formText);
    console.log("::: Form Submitted :::")

    postData('http://localhost:8081/getResults', {text: formText})
    .then((newData)  =>
      updateUI(newData)
    )
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

const updateUI = (newData) => {
     const objectiveOrSubjective = newData.subjectivity;
     const irony = newData.irony;
     const sentencesJsonArray = newData.sentence_list;
     console.log('objectivity:'+objectiveOrSubjective);
     console.log('irony:'+irony);
     document.querySelector('#objectivity').innerText = objectiveOrSubjective;
     document.querySelector('#irony').innerText = irony;

     let tableContentFragment = document.createDocumentFragment();

     for(const sentenceJson of sentencesJsonArray) {
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `<td class="result-value">${sentenceJson.text}</td> <td class="result-value">${sentenceJson.confidence}</td> <td class="result-value">${sentenceJson.score_tag}</td>`;
        tableContentFragment.appendChild(tableRow);
     }

     document.querySelector('#table').appendChild(tableContentFragment);

}

export { handleSubmit }
