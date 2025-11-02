
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

import { utilService } from './util.service.js'
// import axios from 'axios
// '
import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'http://localhost:3030/api/bug/'


export const bugService = {
    query,
    getById,
    save,
    remove,
}



function query(filterBy = {}) {
    filterBy = { ...filterBy }
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            if (!filterBy.txt) filterBy.txt = ''
            // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            // if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity
            return bugs;
            // const regExp = new RegExp(filterBy.txt, 'i')
            // return bugs.filter(car =>
            //     regExp.test(bugs.title) &&
            //     car.price <= filterBy.maxPrice &&
            //     car.speed >= filterBy.minSpeed
            // )
        })
}
function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
}
function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
}
function save(bug) {
    if (bug._id) {
        return storageService.put(STORAGE_KEY, bug)
    } else {
        return storageService.post(STORAGE_KEY, bug)
    }
}