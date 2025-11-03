
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

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
    getDefaultFilter
}



function query(filterBy = {}) {
    filterBy = { ...filterBy }
    console.log('filterBy',filterBy)
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            
            if (!filterBy.txt) filterBy.txt = '';
            if (!filterBy.title) filterBy.title = '';
            if (!filterBy.severity) filterBy.severity = 0;
            const regExp = new RegExp(filterBy.txt, 'i')
            return bugs.filter(bug =>
                (regExp.test(bug.title)) &&
                    bug.severity >= filterBy.severity
            )
        })
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId).then(res => res.data)
}

function remove(bugId) {
    // return Promise.reject('Not now!')
    return axios.get(BASE_URL + bugId + '/remove')
}


function save(bug) {
    return axios.get(BASE_URL + 'save', { params: bug }).then(res => res.data)
}
function getDefaultFilter() {
    return { txt: '', title: '', severity: '' }
}
// function remove(bugId) {
//     return storageService.remove(STORAGE_KEY, bugId)
// }
// function save(bug) {
//     if (bug._id) {
//         return storageService.put(STORAGE_KEY, bug)
//     } else {
//         return storageService.post(STORAGE_KEY, bug)
//     }
// }