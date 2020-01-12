const dqs = document.querySelector.bind(document)
const itemListEl = dqs('#item-list')
const newItemInput = dqs('#new-item-text')
const addNewItemButton = dqs('#add-new-item')

addNewItemButton.addEventListener('click', () => {
  const itemText = newItemInput.value

  const newItemEl = document.createElement('li')

  newItemEl.innerHTML = itemText
  itemListEl.appendChild(newItemEl)

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


