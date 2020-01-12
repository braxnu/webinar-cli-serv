const dqs = document.querySelector.bind(document)
const itemListEl = dqs('#item-list')
const newItemInput = dqs('#new-item-text')
const addNewItemButton = dqs('#add-new-item')

const createTodoItem = (text, completed = false, _id) => {
  const newItemEl = document.createElement('li')

  const completedCheckbox = document.createElement('input')
  completedCheckbox.type = 'checkbox'
  completedCheckbox.checked = completed

  completedCheckbox.addEventListener('click', (ev) => {
    const newCompletedState = ev.target.checked

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
  })

  newItemEl.innerHTML = text
  newItemEl.appendChild(completedCheckbox)
  itemListEl.appendChild(newItemEl)
}

;(async () => {
  const response = await fetch('/api/todo')
  const { itemList } = await response.json()

  itemList.forEach(todoItem => {
    createTodoItem(todoItem.text, todoItem.completed, todoItem._id)
  })

})();


addNewItemButton.addEventListener('click', () => {
  const itemText = newItemInput.value

  createTodoItem(itemText)

  fetch('/api/todo', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      text: itemText
    })
  })
})


