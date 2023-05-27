import { asyncStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'
import { httpService } from './http.service.js'


const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
  // return asyncStorageService.query(STORAGE_KEY).then(toys => toys)
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
  // return asyncStorageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
  // return asyncStorageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  const method = (toy._id) ? 'put' : 'post'
  return httpService[method](BASE_URL, toy)
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: ["Doll", "Puzzle", "Outdoor",],
    createdAt: Date.now(),
    inStock: true,
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '', status: '', labels: [] }
}

const gToys = [
  {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: Date.now(),
    inStock: true,
  },
  {
    _id: 't102',
    name: 'Talking Teddy Bear',
    price: 51,
    labels: ['Baby', 'Doll'],
    createdAt: Date.now(),
    inStock: true,
  },
  {
    _id: 't103',
    name: 'Colorful Puzzle Blocks',
    price: 113,
    labels: ['Puzzle', 'Art'],
    createdAt: Date.now(),
    inStock: true,
  },
  {
    _id: 't104',
    name: 'Giggling Giraffe',
    price: 64,
    labels: ['Baby', 'Outdoor'],
    createdAt: Date.now(),
    inStock: true,
  },
  {
    _id: 't105',
    name: 'RC Race Car',
    price: 79,
    labels: ['On wheels', 'Battery Powered'],
    createdAt: Date.now(),
    inStock: true,
  },

]

_createToys()
function _createToys() {
  let toys = storageService.loadFromStorage(STORAGE_KEY) || []
  if (!toys || !toys.length) {
    toys = gToys
    storageService.saveToStorage(STORAGE_KEY, toys)
  }
}
