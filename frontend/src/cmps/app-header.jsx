import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <div className="header-container">

        <Link to="/">
          <img className='header-logo' src="logo.png" alt="" />
        </Link>

        <nav className='app-nav'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/toy">Toys</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/dashboard">dashboard</NavLink>
        </nav>
      </div>
    </header>

  )
}