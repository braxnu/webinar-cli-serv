const dqs = document.querySelector.bind(document)
const itemListEl = dqs('#item-list')
const newItemInput = dqs('#new-item-text')
const addNewItemButton = dqs('#add-new-item')

const createTodoItem = text => {
  const newItemEl = document.createElement('li')

  newItemEl.innerHTML = text
  itemListEl.appendChild(newItemEl)
}

;(async () => {
  const response = await fetch('/api/todo')
  const { itemList } = await response.json()

  itemList.forEach(todoItem => {
    createTodoItem(todoItem.text)
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


