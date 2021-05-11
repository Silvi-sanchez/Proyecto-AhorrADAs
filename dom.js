const listCategories = document.getElementById('list-categories')
const listaCategoria = document.getElementById('lista-categoria')
const filtroListaCategoria = document.getElementById('filtro-lista-categoria')
const agregarCategoria = document.getElementById('agregar-categoria')
const listOperation = document.getElementById('list-operation')

const botonHome = document.getElementById('boton-home')
const createOperation = document.getElementById('create-operation') 
const imagenSinOperaciones = document.getElementById('imagen-sin-operaciones') 
const agregarOperacion = document.getElementById('agregar-operacion') 
const balance = document.getElementById('balance')
const categoria = document.getElementById('categoria')
const reportes = document.getElementById('reportes')
const editarCategoria = document.getElementById('editar-categoria')
const botonBalance = document.getElementById('boton-balance')
const botonReporte = document.getElementById('boton-reporte')
const botonCategoria = document.getElementById('boton-categoria')
const botonCancelNewOperation = document.getElementById('boton-cancel-new-operation')
const editOperation = document.getElementById('edit-operation')
const inputEditarCategoria = document.getElementById('input-editar-categoria')
const cancelarEditarCategoria = document.getElementById('cancelar-editar-categoria')
const botonEditarCategoria = document.getElementById('boton-editar-categoria')
const btnAgregarOperacion = document.getElementById('btn-agregar-operation')
const barraOperaciones = document.getElementById('barra-operaciones')
const inputEditarOperacion = document.getElementById('input-editar-operacion')
const editarMonto = document.getElementById('editar-monto')
const editarTipo = document.getElementById('editar-tipo')
const editarListaCategoria = document.getElementById('editar-lista-categoria')
const editarFecha = document.getElementById('input-editar-fecha')
const botonCancelEditOperation = document.getElementById('boton-cancel-edit-operation')
const editarOperacion = document.getElementById('btn-editar-operation')
const balanceGanancias = document.getElementById('balance-ganancias')
const balanceGastos = document.getElementById('balance-gastos')
const balanceTotal = document.getElementById('balance-total')


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

agregarCategoria.addEventListener('click', () => {
  const name = document.getElementById('name')
    const category = {
        name:  name.value
    }
    if(category.name.length === 0){
      return;
    }
    categories.create(category)

    name.value = ''

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
  loadCategoriesFilters(listaCategoria, arrayCategoria)
  loadCategoriesFilters(filtroListaCategoria, arrayCategoria)
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
  elemento.selected = true;
  
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

botonBalance.addEventListener('click', () =>{
 mostrarHome()
})

botonHome.addEventListener('click', () =>{
  mostrarHome()
})

function mostrarHome(){
  createOperation.style.display = 'none';
  balance.style.display = 'block';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
  editOperation.style.display = 'none';
  renderOperaciones(operations.getAll(), listOperation)
  if(operations.getAll().length >0){
    imagenSinOperaciones.style.display='none';
  }else{
    imagenSinOperaciones.style.display='block';
  }
  mostrarOpcionesCategoria()
  calcularBalance()
}

botonCategoria.addEventListener('click', () =>{
  createOperation.style.display = 'none';
  balance.style.display = 'none';
  categoria.style.display = 'block';
  editarCategoria.style.display = 'none';
  editOperation.style.display = 'none';
})

botonReporte.addEventListener('click', () =>{
  createOperation.style.display = 'none';
  balance.style.display = 'none';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
  reportes.style.display= 'block'
  editOperation.style.display = 'none';
})

botonCancelNewOperation.addEventListener('click', () =>{
  mostrarHome()
})

window.addEventListener('DOMContentLoaded', () =>{
  editOperation.style.display = 'none';
  createOperation.style.display = 'none';
  balance.style.display = 'block';
  categoria.style.display = 'none';
  editarCategoria.style.display = 'none';
  editOperation.style.display = 'none';
  reportes.style.display= 'none'
  renderOperaciones(operations.getAll(), listOperation)
  ocultarCuandoHayOperaciones()
  calcularBalance()
})

//Agregando las operaciones
btnAgregarOperacion.addEventListener('click', () =>{
  debugger
  const descripcion = document.getElementById('descripcion')
  const monto = document.getElementById('monto')
  const tipo = document.getElementById('tipo')
  const categoria = document.getElementById('lista-categoria').selectedOptions[0];
  const texto = categoria.textContent;
  const fecha = document.getElementById('input-fecha')
  const operaciones = {
    descripcion: descripcion.value,
    categoria: texto,
    categoriaId: document.getElementById('lista-categoria').value,
    fecha: fecha.value,
    monto: monto.value,
    tipo: tipo.value
  }
  if(operaciones.descripcion.length === 0 || 
    operaciones.categoria.length === 'Todas' ||
    operaciones.fecha.length === 0 ||
    operaciones.monto.length === 0){
      return
    }
  operations.create(operaciones);
  mostrarHome()
  ocultarCuandoHayOperaciones()
})

const renderOperaciones = (array, element) => {
  element.innerHTML = ''

  for (let el of array) {
    const itemOperation = document.createElement('div')

    itemOperation.innerHTML = `
    <div class="row" ${el.id}>
      <div class="col s3">${el.descripcion}</div>
      <div class="col s3">${el.categoria}</div>
      <div class="col s2">${el.fecha}</div>
      <div class="col s2 ${el.tipo === 'Ganancia' ? 'montoGreen' : 'montoRed'}"> ${el.tipo ==='Ganancia' ? '+ $' + el.monto : '- $' + el.monto}</div>
      <div class="col s2"> 
        <div class="margin-right-plus blue-text operation-edit manito" id="${el.id}" >Editar</div>
        <div class="margin-right-plus blue-text operation-delete manito">Eliminar</div>
      </div>
    </div>  
    `

    const edit = itemOperation.querySelector('.operation-edit')
    const remove = itemOperation.querySelector('.operation-delete')
    
    edit.onclick = () => {
      editOperation.style.display = 'block';
      createOperation.style.display = 'none';
      balance.style.display= 'none';
      inputEditarOperacion.value = el.descripcion;
      editarMonto.value = el.monto;
      editarTipo.value = el.tipo;
      editarListaCategoria.value = el.categoria.texto;
      editarFecha.value = el.fecha;
    }

    remove.onclick = () => {
      operations.remove(el.id)
      renderOperaciones(operations.getAll(), listOperation)
      ocultarCuandoHayOperaciones()
      calcularBalance()
    }

    element.insertAdjacentElement('beforeend', itemOperation)
  }
}

//Oculto y muestro cuando hay operaciones
function ocultarCuandoHayOperaciones (){
  renderOperaciones(operations.getAll(), listOperation)
  if(operations.getAll().length > 0){
    imagenSinOperaciones.style.display='none';
    barraOperaciones.style.display='block'
  }else{
    imagenSinOperaciones.style.display='block';
    barraOperaciones.style.display='none'
  }
}

botonCancelEditOperation.addEventListener('click', ()=>{
  mostrarHome()
})


//Balance calculo pantalla principal
function calcularBalance() {
  let storage = operations.getAll();
  let ganancia = 0;
  let gastos = 0;
  let total = 0;

  for (let i = 0; i < storage.length; i++) {
    if (storage[i].tipo === 'Ganancia') {
      ganancia += Number(storage[i].monto);
    } else {
      gastos += Number(storage[i].monto);
    }
    total = ganancia - gastos;
  }
  balanceGanancias.innerText = `+$${ganancia}`;
  balanceGastos.innerText = `-$${gastos}`;
  balanceTotal.innerText = `$${total}`;
}