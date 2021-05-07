const listCategories = document.getElementById('list-categories')
const formCreateCategory = document.getElementById('form-create-category')

const createOperation = document.getElementById('create-operation') 
const imagenSinOperaciones = document.getElementById('imagen-sin-operaciones') 
const agregarOperacion = document.getElementById('agregar-operacion') 
const balance = document.getElementById('balance')
const categoria = document.getElementById('categoria')
const reportes = document.getElementById('reportes')
const editarCategoria = document.getElementById('editar-categoria')
const botonBalance = document.querySelectorAll('[href="#balance"]')
const botonReporte = document.querySelector('[href="#reportes"]')
const botonCategoria = document.querySelector('[href="#categoria"]')
const botonCancelNewOperation = document.getElementById('boton-cancel-new-operation')
const editOperation = document.getElementById('edit-operation')
const inputEditarCategoria = document.getElementById('input-editar-categoria')
const cancelarEditarCategoria = document.getElementById('cancelar-editar-categoria')
const botonEditarCategoria = document.getElementById('boton-editar-categoria')
const opcionesCategoria = Array.from(document.querySelectorAll('.lista-categoria'))


const renderCategories = (array, element) => {
    element.innerHTML = ''
  
    for (let el of array) {
      const itemCategory = document.createElement('div')

      itemCategory.innerHTML = `
        <div class="row cursor-pointer" id="${el.id}">
            <div class="col margin-top-0 s8 green-text">${el.name}</div>
            <div class="col s2 blue-text category-edit" id="${el.id}" >Editar</div>
            <div class="col s2 blue-text category-delete">Eliminar</div>
        </div>  
        `
  
      const edit = itemCategory.querySelector('.category-edit')
      const remove = itemCategory.querySelector('.category-delete')
      
      edit.onclick = () => {
        editarCategoria.style.display = 'block';
        categoria.style.display = 'none';
        inputEditarCategoria.value = el.name;
        inputEditarCategoria.id = el.id;
      }
  
      remove.onclick = () => {
        categories.remove(el.id)
        mostrarOpcionesCategoria()
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
    if(category.name.length === 0)
    return
    categories.create(category)

    event.target['name'].value = ''

    renderCategories(categories.getAll(), listCategories)
})


//Botones cancelar y editar categoría
cancelarEditarCategoria.addEventListener('click', () =>{
  editarCategoria.style.display = 'none';
  categoria.style.display = 'block';
})

botonEditarCategoria.addEventListener('click', () =>{
  inputEditarCategoria.value; 
  categories.edit(inputEditarCategoria.id, {name: inputEditarCategoria.value})
  editarCategoria.style.display = 'none';
  categoria.style.display = 'block';

  mostrarOpcionesCategoria()
  renderCategories(categories.getAll(), listCategories)
})


//Mostrar opciones categoría
function mostrarOpcionesCategoria(){
  const arrayCategoria = categories.getAll();
  loadCategoriesFilters(opcionesCategoria[0], arrayCategoria)
  loadCategoriesFilters(opcionesCategoria[1], arrayCategoria)
}
mostrarOpcionesCategoria()

function loadCategoriesFilters(elemento, arrayCategoria){
  //Limpio el elemento para recargarlo
  while(elemento.length>0){
    elemento.remove(0)
  }

  let optionTodos = document.createElement("option");
  optionTodos.setAttribute("value", -1);
  let textTodos = document.createTextNode('Todas');
  optionTodos.appendChild(textTodos);
  elemento.appendChild(optionTodos);
  
  //Agrego al select las categorias
  arrayCategoria.forEach(categoria => {
    let option = document.createElement("option");
    option.setAttribute("value", categoria.id);
    let text = document.createTextNode(categoria.name);
    option.appendChild(text);
    elemento.appendChild(option);
  })
  M.FormSelect.init(elemento)
}

// Mostrar y ocultar secciones
agregarOperacion.addEventListener('click', () => {
  createOperation.style.display = 'block';
  balance.style.display = 'none';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
  editOperation.style.display = 'none';
})

botonBalance[1].addEventListener('click', () =>{
  createOperation.style.display = 'none';
  balance.style.display = 'block';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
  mostrarOpcionesCategoria()
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


