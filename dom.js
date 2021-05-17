const listCategories = document.getElementById("list-categories");
const listaCategoria = document.getElementById("lista-categoria");
const filtroListaCategoria = document.getElementById("filtro-lista-categoria");
const agregarCategoria = document.getElementById("agregar-categoria");
const listOperation = document.getElementById("list-operation");

const botonHome = document.getElementById("boton-home");
const createOperation = document.getElementById("create-operation");
const imagenSinOperaciones = document.getElementById("imagen-sin-operaciones");
const agregarOperacion = document.getElementById("agregar-operacion");
const balance = document.getElementById("balance");
const categoria = document.getElementById("categoria");
const reportes = document.getElementById("reportes");
const editarCategoria = document.getElementById("editar-categoria");
const botonBalance = document.getElementById("boton-balance");
const botonReporte = document.getElementById("boton-reporte");
const botonCategoria = document.getElementById("boton-categoria");
const botonCancelNewOperation = document.getElementById(
  "boton-cancel-new-operation"
);
const editOperation = document.getElementById("edit-operation");
const inputEditarCategoria = document.getElementById("input-editar-categoria");
const cancelarEditarCategoria = document.getElementById(
  "cancelar-editar-categoria"
);
const botonEditarCategoria = document.getElementById("boton-editar-categoria");
const btnAgregarOperacion = document.getElementById("btn-agregar-operation");
const barraOperaciones = document.getElementById("barra-operaciones");
const inputEditarOperacion = document.getElementById("input-editar-operacion");
const editarMonto = document.getElementById("editar-monto");
const editarTipo = document.getElementById("editar-tipo");
const editoListaCategoria = document.getElementById("edito-lista-categoria");
const editarFecha = document.getElementById("input-editar-fecha");
const botonCancelEditOperation = document.getElementById(
  "boton-cancel-edit-operation"
);
const editarOperacion = document.getElementById("btn-editar-operation");
const balanceGanancias = document.getElementById("balance-ganancias");
const balanceGastos = document.getElementById("balance-gastos");
const balanceTotal = document.getElementById("balance-total");
let idElementoAEditar;

const renderCategories = (array, element) => {
  element.innerHTML = "";

  for (let el of array) {
    const itemCategory = document.createElement("div");

    itemCategory.innerHTML = `
        <div class="row cursor-pointer" id="${el.id}">
            <div class="col margin-top-0 s8 green-text">${el.name}</div>
            <div class="col s2 blue-text category-edit" id="${el.id}" >Editar</div>
            <div class="col s2 blue-text category-delete">Eliminar</div>
        </div>  
        `;

    const edit = itemCategory.querySelector(".category-edit");
    const remove = itemCategory.querySelector(".category-delete");

    edit.onclick = () => {
      editarCategoria.style.display = "block";
      categoria.style.display = "none";
      inputEditarCategoria.value = el.name;
      inputEditarCategoria.id = el.id;
    };

    remove.onclick = () => {
      categories.remove(el.id);
      mostrarOpcionesCategoria();
      renderCategories(categories.getAll(), listCategories);
    };

    element.insertAdjacentElement("beforeend", itemCategory);
  }
};

renderCategories(categories.getAll(), listCategories);

agregarCategoria.addEventListener("click", () => {
  const name = document.getElementById("name");
  const category = {
    name: name.value,
  };
  if (category.name.length === 0) {
    return;
  }
  categories.create(category);

  name.value = "";

  renderCategories(categories.getAll(), listCategories);
});

//Botones cancelar y editar categoría
cancelarEditarCategoria.addEventListener("click", () => {
  editarCategoria.style.display = "none";
  categoria.style.display = "block";
});

botonEditarCategoria.addEventListener("click", () => {
  inputEditarCategoria.value;
  categories.edit(inputEditarCategoria.id, {
    name: inputEditarCategoria.value,
  });
  editarCategoria.style.display = "none";
  categoria.style.display = "block";

  mostrarOpcionesCategoria();
  renderCategories(categories.getAll(), listCategories);
});

//Mostrar opciones categoría
function mostrarOpcionesCategoria() {
  const arrayCategoria = categories.getAll();
  loadCategoriesFilters(listaCategoria, arrayCategoria);
  loadCategoriesFilters(filtroListaCategoria, arrayCategoria);
  loadCategoriesFilters(editoListaCategoria, arrayCategoria);
}
mostrarOpcionesCategoria();

function loadCategoriesFilters(elemento, arrayCategoria) {
  //Limpio el elemento para recargarlo
  while (elemento.length > 0) {
    elemento.remove(0);
  }

  let optionTodos = document.createElement("option");
  optionTodos.setAttribute("value", -1);
  let textTodos = document.createTextNode("Todas");
  optionTodos.appendChild(textTodos);
  elemento.appendChild(optionTodos);
  elemento.selected = true;

  //Agrego al select las categorias
  arrayCategoria.forEach((categoria) => {
    let option = document.createElement("option");
    option.setAttribute("value", categoria.id);
    let text = document.createTextNode(categoria.name);
    option.appendChild(text);
    elemento.appendChild(option);
  });
  M.FormSelect.init(elemento);
}

// Mostrar y ocultar secciones
agregarOperacion.addEventListener("click", () => {
  createOperation.style.display = "block";
  balance.style.display = "none";
  categoria.style.display = "none";
  editarCategoria.style.display = "none";
  editOperation.style.display = "none";
});

botonBalance.addEventListener("click", () => {
  mostrarHome();
});
const irABalance = () => {
  mostrarHome();
};

botonHome.addEventListener("click", () => {
  mostrarHome();
});

function mostrarHome() {
  createOperation.style.display = "none";
  balance.style.display = "block";
  categoria.style.display = "none";
  editarCategoria.style.display = "none";
  editOperation.style.display = "none";
  reportes.style.display = "none";
  renderOperaciones(operations.getAll(), listOperation);
  if (operations.getAll().length > 0) {
    imagenSinOperaciones.style.display = "none";
  } else {
    imagenSinOperaciones.style.display = "block";
  }
  mostrarOpcionesCategoria();
  calcularBalance();
}

botonCategoria.addEventListener("click", () => {
  irACategoria();
});
const irACategoria = () => {
  createOperation.style.display = "none";
  balance.style.display = "none";
  categoria.style.display = "block";
  editarCategoria.style.display = "none";
  editOperation.style.display = "none";
};

botonReporte.addEventListener("click", () => {
  irAReportes();
});
const irAReportes = () => {
  createOperation.style.display = "none";
  balance.style.display = "none";
  categoria.style.display = "none";
  editarCategoria.style.display = "none";
  reportes.style.display = "block";
  editOperation.style.display = "none";
};

botonCancelNewOperation.addEventListener("click", () => {
  mostrarHome();
});

window.addEventListener("DOMContentLoaded", () => {
  editOperation.style.display = "none";
  createOperation.style.display = "none";
  balance.style.display = "block";
  categoria.style.display = "none";
  editarCategoria.style.display = "none";
  editOperation.style.display = "none";
  reportes.style.display = "none";
  renderOperaciones(operations.getAll(), listOperation);
  ocultarCuandoHayOperaciones();
  calcularBalance();
});

//Agregando las operaciones
btnAgregarOperacion.addEventListener("click", () => {
  const descripcion = document.getElementById("descripcion");
  const monto = document.getElementById("monto");
  const tipo = document.getElementById("tipo");
  const categoria = document.getElementById("lista-categoria");
  const texto = categoria.selectedOptions[0].textContent;
  const fecha = document.getElementById("input-fecha");
  const operaciones = {
    descripcion: descripcion.value,
    categoria: texto,
    categoriaId: categoria.value,
    fecha: fecha.value,
    monto: monto.value,
    tipo: tipo.value,
  };
  if (
    operaciones.descripcion.length === 0 ||
    operaciones.categoria.length === "Todas" ||
    operaciones.fecha.length === 0 ||
    operaciones.monto.length === 0
  ) {
    return;
  }
  operations.create(operaciones);
  mostrarHome();
  ocultarCuandoHayOperaciones();
  limpiarFormulario();
});

//Limpio campos para cargar datos
function limpiarFormulario() {
  document.getElementById("descripcion").value = "";
  document.getElementById("monto").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("fecha") ? document.getElementById("fecha").value = "" : '';
}

const removeOperation = (id) => {
  operations.remove(id)
  renderOperaciones(operations.getAll(), listOperation)
  ocultarCuandoHayOperaciones()
  calcularBalance()
}

const renderOperaciones = (array, element) => {
  element.innerHTML = "";
  for (let el of array) {
    const itemOperation = document.createElement("div");

    itemOperation.innerHTML = `
    <div class="row" ${el.id}>
      <div class="col s3">${el.descripcion}</div>
      <div class="col s3">${el.categoria}</div>
      <div class="col s2">${el.fecha}</div>
      <div class="col s2 ${
        el.tipo === "profits" ? "montoGreen" : "montoRed"
      }"> ${el.tipo === "profits" ? "+ $" + el.monto : "- $" + el.monto}</div>
      <div class="col s2"> 
        <div class="margin-right-plus blue-text operation-edit manito" id="${
          el.id
        }" >Editar</div>
        <div class="margin-right-plus blue-text operation-delete manito">Eliminar</div>
      </div>
    </div>  
    `;
    const edit = itemOperation.querySelector(".operation-edit");
    const remove = itemOperation.querySelector(".operation-delete");

    edit.onclick = () => {
      idElementoAEditar = el.id;
      editOperation.style.display = "block";
      createOperation.style.display = "none";
      balance.style.display = "none";
      inputEditarOperacion.value = el.descripcion;
      inputEditarOperacion.setAttribute('data-id', el.id);
      editarMonto.value = el.monto;
      editarFecha.value = el.fecha;
      editarTipo.value = el.tipo;
      M.FormSelect.init(editarTipo);
      editoListaCategoria.value = el.categoriaId;
      M.FormSelect.init(editoListaCategoria);
    };

    remove.onclick = () => {
      operations.remove(el.id);
      renderOperaciones(operations.getAll(), listOperation);
      ocultarCuandoHayOperaciones();
      calcularBalance();
    };

    element.insertAdjacentElement("beforeend", itemOperation);
  }
};

editarOperacion.addEventListener("click", () => {
  const operacion = {
    descripcion: inputEditarOperacion.value,
    categoria: editoListaCategoria.selectedOptions[0].textContent,
    categoriaId: editoListaCategoria.value,
    fecha: editarFecha.value,
    monto: editarMonto.value,
    tipo: editarTipo.value,
  };
  operations.edit(idElementoAEditar, operacion);
  balance.style.display = "block";
  editOperation.style.display = "none";
  mostrarHome();
});

//Oculto y muestro cuando hay operaciones
function ocultarCuandoHayOperaciones() {
  renderOperaciones(operations.getAll(), listOperation);
  if (operations.getAll().length > 0) {
    imagenSinOperaciones.style.display = "none";
    barraOperaciones.style.display = "block";
  } else {
    imagenSinOperaciones.style.display = "block";
    barraOperaciones.style.display = "none";
  }
}

botonCancelEditOperation.addEventListener("click", () => {
  mostrarHome();
});

//Balance calculo pantalla principal
function calcularBalance() {
  let storage = operations.getAll();
  let ganancia = 0;
  let gastos = 0;
  let total = 0;

  for (let i = 0; i < storage.length; i++) {
    if (storage[i].tipo === "profits") {
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


//--------------FILTROS-----------------------
//Tipo, categoria y fecha
let filtroTipo = "Todos";
let filtroCategoria = "Todas";
let dtpFecha = document.getElementById("date");
let fecha = '';

function filtrar() {
  let operaciones = operations.getAll();

  let operacionesFiltradas = operaciones
    .filter((el) => el.tipo === filtroTipo || filtroTipo === "Todos")
    .filter(
      (el) => el.categoria === filtroCategoria || filtroCategoria === "Todas"
    );

  if (dtpFecha.value !== "") {
    operacionesFiltradas = operacionesFiltradas.filter(
      (el) => fechaOperacion(el.fecha) >= fechaOperacion(fecha)
    );
  }
  renderOperaciones(operacionesFiltradas, listOperation);
}

document.getElementById("select-tipo").addEventListener("change", (event) => {
  filtroTipo = event.target.selectedOptions[0].value;
  filtrar();
});
document
  .getElementById("filtro-lista-categoria")
  .addEventListener("change", (event) => {
    filtroCategoria = event.target.selectedOptions[0].textContent;
    filtrar();
  });
dtpFecha.addEventListener("change", (event) => {
  fecha = event.target.value;
  filtrar();
});

function fechaOperacion(date) {
  let myDate = date.split("-");
  let newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
  return newDate.getTime();
}

//Ordenar según opción
let valorAOrdenar = document.getElementById('list-order');
let operaciones = operations.getAll();  

valorAOrdenar.addEventListener('change',() =>{
  let nuevoArr = [...operations.getAll()]
  if(valorAOrdenar.value === 'A-Z'){
    nuevoArr.sort((a,b) => a.descripcion > b.descripcion ? 1 : -1)
  }
  if(valorAOrdenar.value === 'Z-A'){
    nuevoArr.sort((a,b) => a.descripcion < b.descripcion ? 1 : -1)
  }
  if(valorAOrdenar.value === 'Más reciente'){
    nuevoArr.sort((a,b) => a.fecha < b.fecha ? 1 : -1)
  }
  if(valorAOrdenar.value === 'Menos reciente'){
    nuevoArr.sort((a,b) => a.fecha > b.fecha ? 1 : -1)
  }
  if(valorAOrdenar.value === 'Mayor monto'){
    nuevoArr.sort((a,b) => b.monto - a.monto)
  }
  if(valorAOrdenar.value === 'Menor monto'){
    nuevoArr.sort((a,b) => a.monto - b.monto)
  }

  renderOperaciones(nuevoArr, listOperation);
})

//---------------REPORTES-----------------------
let seccionReportes = {
  resumen: [],
  totalesCategoria: [],
  totalesMes: [],
};

const resumenReportes = document.getElementById("resumen-reportes");
const reportesTotalCategorias = document.getElementById(
  "reportes-total-categorias"
);
const reportesTotalMes = document.getElementById("reportes-total-mes");


const resumenByMonth = (operations) => {
  if(!operations || !Array.isArray(operations)) return []

  return operations.reduce((total, operation) => {
      const date = `${new Date(operation.fecha).getFullYear()}/${new Date(operation.fecha).getMonth() + 1}`

      if(!total.hasOwnProperty(date)) {
          total[date] = {
            spending: 0,
            profits: 0,
            balance: 0
          }
      }

      total[date][operation.tipo] += parseInt(operation.monto)

      if (operation.tipo === 'profits') {
          total[date].balance += parseInt(operation.monto)
        } else {
          total[date].balance -= parseInt(operation.monto)
        }

      return total
  }, {})
}

const generarReportes = () => {
  let maxGanancia = 0;
  let maxGasto = 0;
  let maxBalance = 0;
  let categoriaMayorGanancia;
  let categoriaMayorGasto;
  let categoriaMayorBalance;

  let totalReportesCategorias = [];
  const categoriesStorage = categories.getAll();
  categoriesStorage.forEach((categoria) => {
    let itemReportes = {
      categoria: categoria.name,
      ganancia: 0,
      gasto: 0,
      balance: 0,
    };
    const operationsStorage = operations.getAll();
    operationsStorage.forEach((operaciones) => {
      if (categoria.id === operaciones.categoriaId) {
        if (operaciones.tipo === "spending") {
          itemReportes.gasto += Number(operaciones.monto);
        }
        if (operaciones.tipo === "profits") {
          itemReportes.ganancia += Number(operaciones.monto);
        }
      }
    });
    itemReportes.balance = itemReportes.ganancia - itemReportes.gasto;
    totalReportesCategorias.push(itemReportes);

    //Buscar categoría con mayor ganancia y mayor gasto
    if (itemReportes.ganancia > maxGanancia) {
      maxGanancia = itemReportes.ganancia;
      categoriaMayorGanancia = itemReportes.categoria;
    }
    if (itemReportes.gasto > maxGasto) {
      maxGasto = itemReportes.gasto;
      categoriaMayorGasto = itemReportes.categoria;
    }
    if (itemReportes.balance > maxBalance) {
      maxBalance = itemReportes.balance;
      categoriaMayorBalance = itemReportes.categoria;
    }

    // Mes con mayor ganancia y parseo de datos
    const listMonth = Object.entries(resumenByMonth(operations.getAll()))
    const listMonthProfits = listMonth.map(el => el[1].profits)
    const listMonthSpending = listMonth.map(el => el[1].spending)

    const maxMonthProfits = Math.max(...listMonthProfits)
    const maxMonthSpending = Math.max(...listMonthSpending)

    const monthMaxProfits =  listMonth.find(el => el[1].profits === maxMonthProfits)
    const monthMaxSpending =  listMonth.find(el => el[1].spending === maxMonthSpending)

    const fechaMayorGanancia = ({ ...monthMaxProfits[1], mes: monthMaxProfits[0], mesNombre: (
      new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date(new Date(monthMaxProfits[0])))
    )})

    const fechaMayorGasto = ({ ...monthMaxSpending[1], mes: monthMaxSpending[0], mesNombre: (
      new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date(new Date(monthMaxSpending[0])))
    )})


    let misReportes = {
      maxGanancia: maxGanancia,
      maxGasto: maxGasto,
      maxBalance: maxBalance,
      categoriaMayorGanancia: categoriaMayorGanancia,
      categoriaMayorGasto: categoriaMayorGasto,
      categoriaMayorBalance: categoriaMayorBalance,
      fechaMayorGanancia,
      fechaMayorGasto,
    };
    pintoReportes(misReportes);
    pintarResumenCategorias()
    pintarResumenMes()
  });
  seccionReportes.totalesCategoria = totalReportesCategorias;
};

function pintoReportes(misReportes) {
  titulosResumen = {
    tituloMayorGanancia: "Categoría con mayor ganancia",
    tituloMayorGasto: "Categoría con mayor gasto",
    tituloMayorBalance: "Categoría con mayor balance",
    tituloMesMayorGanancia: "Mes con mayor ganancia",
    tituloMesMayorGasto: "Mes con mayor gasto",
  };

  resumenReportes.innerHTML = "";
  let nuevoDiv = document.createElement("div");
  nuevoDiv.innerHTML = `
  <div class="row">
    <div class="col s4">${titulosResumen.tituloMayorGanancia}</div>
    <div class="col s4 cyan-text text-darken-3">${misReportes.categoriaMayorGanancia}</div>
    <div class="col s4">$${misReportes.maxGanancia}</div>

    <div class="col s4">${titulosResumen.tituloMayorGasto}</div>
    <div class="col s4 cyan-text text-darken-3">${misReportes.categoriaMayorGasto}</div>
    <div class="col s4">$${misReportes.maxGasto}</div>

    <div class="col s4">${titulosResumen.tituloMayorBalance}</div>
    <div class="col s4 cyan-text text-darken-3">${misReportes.categoriaMayorBalance}</div>
    <div class="col s4">$${misReportes.maxBalance}</div>

    <div class="col s4">${titulosResumen.tituloMesMayorGanancia}</div>
    <div class="col s4 cyan-text text-darken-3">${misReportes.fechaMayorGanancia.mesNombre}</div>
    <div class="col s4">$${misReportes.fechaMayorGanancia.profits}</div>

    <div class="col s4">${titulosResumen.tituloMesMayorGasto}</div>
    <div class="col s4 cyan-text text-darken-3">${misReportes.fechaMayorGasto.mesNombre}</div>
    <div class="col s4">$${misReportes.fechaMayorGanancia.spending}</div>

  </div>
`;
  resumenReportes.appendChild(nuevoDiv);
}

// Genera reporte de categorías
const categoriasBalances = (operations) => {
  if(!operations || !Array.isArray(operations)) return []

  return operations.reduce((total, operation) => {
      const categoryName = categories.get(operation.categoriaId)?.name

      if(!total.hasOwnProperty(categoryName)) {
          total[categoryName] = {
              spending: 0,
              profits: 0,
              balance: 0
          }
      }

      total[categoryName][operation.tipo] += parseInt(operation.monto)

      if(operation.tipo === 'profits') {
          total[categoryName].balance += parseInt(operation.monto)
      } 
      else {
          total[categoryName].balance -= parseInt(operation.monto)
      } 

      return total
  }, {})
}

// Pinta reporte de categorias
const listaCategoriasReporte = document.getElementById('lista-categorias-reporte')
function pintarResumenCategorias(){
    const categorias = categoriasBalances((operations.getAll()))
    console.log(categorias)
    listaCategoriasReporte.innerHTML = ''

    for (const key in categorias) {
      listaCategoriasReporte.insertAdjacentHTML('beforeend', 
      `<div class="row">
        <div class="col s3">${key}</div>
        <div class="col s3">${categorias[key].spending}</div>
        <div class="col s2">${categorias[key].profits}</div>
        <div class="col s2">${categorias[key].balance}</div>
      </div>`
      )
    }
}

// Pinta reporte de meses
const listaMesesReporte = document.getElementById('lista-meses-reporte')
function pintarResumenMes() {
  const meses = resumenByMonth(operations.getAll())
  listaMesesReporte.innerHTML = ''

  for (const key in meses) {
    const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date(new Date(key)))
    listaMesesReporte.insertAdjacentHTML('beforeend', 
    `<div class="row">
      <div class="col s3">${nombreMes}</div>
      <div class="col s3">${meses[key].spending}</div>
      <div class="col s2">${meses[key].profits}</div>
      <div class="col s2">${meses[key].balance}</div>
    </div>`
    )
  }
}