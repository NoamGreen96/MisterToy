import axios from 'axios'
import { Link } from 'react-router-dom'


export function ToyPreview({ toy }) {
  // console.log(toy)
  return (
    <article>
      <h4>{toy.name}</h4>
      <div className='img-preview-container'>
        <img className='img-preview' src={require(`../assets/img/${toy.img}`)} alt="" />
      </div>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <span>{toy.inStock ? 'InStock' : 'Not in stock'}</span>
      <hr />
      <Link to={`/toy/${toy._id}`}>Details</Link> |
      <Link to={`/toy/edit/${toy._id}`}> Edit</Link >
    </article >
  )
}
