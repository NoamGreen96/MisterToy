import { GoogleMap } from "../cmps/google-map";

export function AboutUs() {
  return (
    <section >
      <div className="about-container">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam
          quo veniam velit dolor reprehenderit, laudantium consequatur neque
          numquam labore quae. Accusamus libero perferendis ducimus? Alias unde
          hic quisquam doloremque.
          <br />
          <br />
        </p>
        Our store Branch:
      </div>
      <GoogleMap />
    </section>
  )
}

