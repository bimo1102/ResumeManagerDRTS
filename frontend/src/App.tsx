import { Suspense, lazy, useContext } from 'react';
import { ThemeContext } from './context/theme.context';
import Navbar from './components/navbar/Navbar.component';
import { Route, Routes } from 'react-router-dom';
import CustomLinearLoader from './components/CustomLinearLoader/CustomLinearLoader.components';
import AddCandidate from './pages/candidates/AddCandidate.page';
// import Candidates from './pages/candidates/companies/Candidates.page';
// import AddJob from './pages/jobs/AddJob.page';
// import Jobs from './pages/jobs/Jobs.page';
// import AddCompany from './pages/companies/AddCompany.page';
// import Companies from './pages/companies/Companies.page';
// import Home from './pages/home/Home.page';
//import with laze loading
const Home = lazy(() => import('./pages/home/Home.page'));

const Companies = lazy(() => import('./pages/companies/Companies.page'));
const AddCompany = lazy(() => import('./pages/companies/AddCompany.page'));

const Jobs = lazy(() => import('./pages/jobs/Jobs.page'));
const AddJob = lazy(() => import('./pages/jobs/AddJob.page'));

const Candidates = lazy(() => import('./pages/candidates/Candidates.page'));


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
              <Route path='add' element={<AddCompany />} />
            </Route>
            <Route path='/jobs'>
              <Route index element={<Jobs />} />
              <Route path='add' element={<AddJob />} />
            </Route>
            <Route path='/candidates'>
              <Route index element={<Candidates />} />
              <Route path='add' element={<AddCandidate />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App