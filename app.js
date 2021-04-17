 // Inicialización del select
  document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
  });
  
  // Inicialización del input fecha
  document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems,'2021,04,10',{
      format: 'yyyy/mm/dd',
      setDefaultDate: true,
      defaultDate: new Date(2021,04, 10),
      i18n: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      }
    });
  });
  

  document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});

const listOrder = document.getElementById('list-order')

// listOrder.addEventListener('change', event => {
//   console.log(event.target.value)
// })