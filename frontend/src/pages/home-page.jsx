import homep from '../assets/img/home-page.jpg';


export function HomePage() {

  return (
    <section className="home-page">
      <h1>Welcome To Our Toy Store</h1>
      <img className='home-img' src={homep} alt="" />
    </section>

  )
}