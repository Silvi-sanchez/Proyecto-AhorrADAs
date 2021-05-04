const listCategories = document.getElementById('list-categories')
const formCreateCategory = document.getElementById('form-create-category')

const createOperation = document.getElementById('create-operation') 
const imagenSinOperaciones = document.getElementById('imagen-sin-operaciones') 
const agregarOperacion = document.getElementById('agregar-operacion') 
const balance = document.getElementById('balance')
const categoria = document.getElementById('categoria')
const reportes = document.getElementById('reportes')
const editarCategoria = document.getElementById('editar-categoria')
const botonBalance = document.querySelector('[href="#balance"]')
const botonReporte = document.querySelector('[href="#reportes"]')
const botonCategoria = document.querySelector('[href="#categoria"]')
const botonCancelNewOperation = document.getElementById('boton-cancel-new-operation')
const editOperation = document.getElementById('edit-operation')

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

// Mostrar y ocultar secciones
agregarOperacion.addEventListener('click', () => {
  createOperation.style.display = 'block';
  balance.style.display = 'none';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
  editOperation.style.display = 'none';
})

botonBalance.addEventListener('click', () =>{
  createOperation.style.display = 'none';
  balance.style.display = 'block';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
})

botonCategoria.addEventListener('click', () =>{
  createOperation.style.display = 'none';
  balance.style.display = 'none';
  categoria.style.display = 'block';
  editarCategoria.style.display = 'none';
})

botonReporte.addEventListener('click', () =>{
  createOperation.style.display = 'none';
  balance.style.display = 'none';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
  reportes.style.display= 'block'
})

botonCancelNewOperation.addEventListener('click', () =>{
  balance.style.display = 'block';
  createOperation.style.display = 'none';
})

window.addEventListener('DOMContentLoaded', () =>{
  createOperation.style.display = 'none';
  balance.style.display = 'block';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
  editOperation.style.display = 'none';
  reportes.style.display= 'none'
})


