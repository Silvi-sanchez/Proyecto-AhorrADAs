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

const operations = crudder('data','operations')
const categories = crudder('data','categories')
