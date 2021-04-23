const listCategories = document.getElementById('list-categories')
const formCreateCategory = document.getElementById('form-create-category')

const renderCategories = (array, element) => {
    element.innerHTML = ''
  
    for (let el of array) {
      const itemCategory = document.createElement('div')

      itemCategory.innerHTML = `
        <div class="row cursor-pointer" id="${el.id}">
            <div class="col margin-top-0 s8 green-text">${el.name}</div>
            <div class="col s2 blue-text category-edit">Editar</div>
            <div class="col s2 blue-text category-delete">Eliminar</div>
        </div>  
        `
  
      const edit = itemCategory.querySelector('.category-edit')
      const remove = itemCategory.querySelector('.category-delete')
  
      edit.onclick = () => {
      }
  
      remove.onclick = () => {
        categories.remove(el.id)
        renderCategories(categories.getAll(), listCategories)
      }
  
      element.insertAdjacentElement('beforeend', itemCategory)
    }
}

renderCategories(categories.getAll(), listCategories)

formCreateCategory.addEventListener('submit', event => {
    event.preventDefault()

    const category = {
        name:  event.target['name'].value
    }

    categories.create(category)

    event.target['name'].value = ''

    renderCategories(categories.getAll(), listCategories)
})