import './App.css'
import Navbar from './components/navbar'
import UserManagment from './views/user-management'

function App() {
  return (
    <>
      <div className='container'>
        <Navbar />
        <main className='content'>
          <UserManagment />
        </main>
      </div>
    </>
  )
}

export default App
