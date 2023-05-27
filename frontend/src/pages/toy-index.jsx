import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { toyService } from '../services/toys.service.js'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/toy.action.js'

export function ToyIndex() {

  const dispatch = useDispatch()
  const { toys, filterBy } = useSelector((storeState) => storeState.toyModule)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys(filterBy)
  }, [filterBy])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove toy')
      })
  }

  function onSetFilter(filterBy) {
    // console.log('FilterBy', filterBy)
    setFilterBy(filterBy)
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch(err => {
        showErrorMsg('Cannot add toy')
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?', toy.price)
    if (!price || price === toy.price) return
    const toyToSave = { ...toy, price }
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch(err => {
        showErrorMsg('Cannot update toy')
      })
  }

  return (
    <main>
      {/* <h3>Toys App</h3> */}
      <div className='add-toy-container'>

        <button className='add-toy-btn'>
          <Link to={`/toy/edit`}>Add toy</Link>
        </button>
      </div>
      <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy}
      />
      {isLoading && <h4 className="loading-message">Loading...</h4>}
      <ToyList
        toys={toys}
        onEditToy={onEditToy}
        onRemoveToy={onRemoveToy}
      />
    </main>
  )
}