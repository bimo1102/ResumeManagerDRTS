import { Suspense, lazy, useContext } from 'react';
import { ThemeContext } from './context/theme.context';
import Navbar from './components/navbar/Navbar.component';
import { Route, Routes } from 'react-router-dom';
import CustomLinearLoader from './components/CustomLinearLoader/CustomLinearLoader.components';
// import Companies from './pages/companies/Companies.page';
// import Home from './pages/home/Home.page';
//import with laze loading
const Home = lazy(() => import('./pages/home/Home.page'));
const Companies = lazy(() => import('./pages/companies/Companies.page'));

const App = () => {

  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? 'app dark' : 'app'

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearLoader />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/companies'>
              <Route index element={<Companies />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App