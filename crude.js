const get = (key) => JSON.parse(localStorage.getItem(key))
const set = (key, obj) => localStorage.setItem(key, JSON.stringify(obj))

const defaultCategorys = ['comida', 'servicios', 'salidas', 'educación', 'transporte', 'trabajo']

/* Estructura de los datos y valores por defecto */
if(!get('data')) {
    const data = {
        categories: [],
        operations: []
    }

    defaultCategorys.map(el => data.categories.push({ name: el, id: uuidv4() }))

    set('data', data)
}


/* ===================== DATA CRUDE ===================== */

const crudder = (key , property) => {
    return ({
        create: (obj) => {
            const object = get(key)
            const newObject = {...obj, id: uuidv4()}
            
            return set('data', {...object, [property]: [...object[property], newObject]})
        },

        edit: (id, obj) => {
            const object = get(key)
            const newObject = {...obj, id}
            const newData = object[property].map((el) => el.id === id ? newObject : el)

            return set('data',  {...object, [property]: newData})
        },
        
        remove: (id) => {
            const object = get(key)
            const newData = object[property].filter((el) => el.id !== id)

            return set('data',  {...object, [property]: newData})
        },

        get: (id) => {
            const object = get(key)
            const item = object[property].find((el) => el.id === id)
            
            return item
        },

        getAll: () => get(key)[property]

    })
}

const filterByType = (array, type = 'all') => type === 'all' ? array : array?.filter((el) => el?.tipo === type)
    
const filterByCategory = (array, category = 'all') => category === 'all' ? array : array?.filter((el) => el?.categoriaId === category)
    
const filterByDate = (array, date) => array?.filter((el) => (new Date(el.fecha).getTime() >= new Date(date).getTime()))

const ordenarByAmount = (array, order = 'asc') => {
    if(order === 'asc') {
        return array?.sort((a, b) => a?.monto - b?.monto)
    } 
    else if(order === 'desc') {
        return array?.sort((a, b) => b?.monto - a?.monto)
    }
}

const ordenarByDate = (array, order) => {
    if(order === 'asc') {
        return array?.sort((a, b) => {
            const A = new Date(a?.fecha).getTime() 
            const B = new Date(b?.fecha).getTime()

            return parseInt(A) - parseInt(B)
        })
    } 

    return array?.sort((a, b) => {
        const A = new Date(a?.fecha).getTime() 
        const B = new Date(b?.fecha).getTime()

        return parseInt(B) - parseInt(A)
    })
}

const ordenarByDescription = (array, order = 'a-z') => {
    if(order === 'a-z') {
        return array?.sort((a, b) => a?.descripcion < b?.descripcion ? -1 : 1)
    } 
    else if(order === 'z-a') {
        return array?.sort((a, b) => a?.descripcion > b?.descripcion ? -1 : 1)
    }
}

const orderBy = (array, order) => {
    switch (order) {
        case 'date-asc':
            return ordenarByDate([...array], 'asc') ? ordenarByDate([...array], 'asc') : []
        case 'date-desc':
            return ordenarByDate([...array]) ? ordenarByDate([...array]) : []
        case 'amount-asc':
            return ordenarByAmount(array, 'asc') ? ordenarByAmount(array, 'asc') : []
        case 'amount-desc':
            return ordenarByAmount(array, 'desc') ? ordenarByAmount(array, 'desc') : []
        case 'asc':
            return ordenarByDescription(array, 'a-z') ? ordenarByDescription(array, 'a-z') : []
        case 'desc':
            return ordenarByDescription(array, 'z-a') ? ordenarByDescription(array, 'z-a') : []
        default:
            return array
    }       
}

const operations = crudder('data','operations')
const categories = crudder('data','categories')
