import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toys.service"
import { utilService } from "../services/util.service.js"
import { Select } from 'antd'
const { Option } = Select

export function ToyFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  onSetFilter = useRef(utilService.debounce(onSetFilter))

  const elInputRef = useRef(null)

  useEffect(() => {
    elInputRef.current.focus()
  }, [])

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange(event) {
    const { name, value, type } = event.target
    const processedValue = type === 'number' ? +value : value
    setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: processedValue }))
  }
  function handleMaxPriceChange(value) {
    setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, maxPrice: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  return (
    <section className="toy-filter">
      <h2>Toys Filter</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="txt"
          placeholder="By name"
          value={filterByToEdit.txt}
          onChange={handleChange}
          ref={elInputRef}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <Select
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice}
          onChange={handleMaxPriceChange}
        >
          <Option value="">All</Option>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
          <Option value="150">150</Option>
        </Select>

        <button hidden>Filter</button>
      </form>
    </section>
  )
}
