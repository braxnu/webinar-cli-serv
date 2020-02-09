const dqs = document.querySelector.bind(document)
const itemListEl = dqs('#item-list')
const newItemInput = dqs('#new-item-text')
const addNewItemButton = dqs('#add-new-item')

const createTodoItem = (text, _id, completed = false) => {
  const newItemEl = document.createElement('li')
  const completedCheckbox = document.createElement('input')

  completedCheckbox.type = 'checkbox'
  completedCheckbox.checked = completed

  completedCheckbox.addEventListener('click', (ev) => {
    const newCompletedState = ev.target.checked
    const oldCompletedState = !newCompletedState

    fetch('/api/todo', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        completed: newCompletedState,
        _id,
      })
    })
      .then(response => {
        if (!response.ok) {
          ev.target.checked = oldCompletedState
        }
      })
  })

  newItemEl.innerHTML = text
  newItemEl.appendChild(completedCheckbox)
  itemListEl.appendChild(newItemEl)
}

;(async () => {
  const response = await fetch('/api/todo')
  const { itemList } = await response.json()

  itemList.forEach(todoItem => {
    createTodoItem(todoItem.text, todoItem._id, todoItem.completed)
  })

})();


addNewItemButton.addEventListener('click', () => {
  const itemText = newItemInput.value

  fetch('/api/todo', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      text: itemText
    })
  })
    .then(response => response.json())
    .then(data => {
      newItemInput.value = ''
      createTodoItem(itemText, data.newRecordId)
    })
})


