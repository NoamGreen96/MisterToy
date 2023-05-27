import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/style/main.scss';

import { AboutUs } from './pages/about-us';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { HomePage } from './pages/home-page';
import { ToyIndex } from './pages/toy-index';
import { ToyEdit } from './pages/toy-edit.jsx';
import { ToyDetails } from './pages/toy-details';
import { Dashboard } from './pages/dashboard';
import { LabelDashboard } from './cmps/label-dashboard';
import { UserMsg } from './cmps/user-msg.jsx'


export default function App() {
  return (
    <Provider store={store} >
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            {/* # after / */}
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<LabelDashboard />} path='/toy/label-dashboard' />

            </Routes>
          </main>
          <UserMsg />
          <AppFooter />
        </section>
      </Router>
    </Provider>
  );
}

