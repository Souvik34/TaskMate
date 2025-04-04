import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import ShowTask from './pages/ShowTask';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: Show Signin */}
        <Route path="/" element={<Signin />} />
        
        {/* Public */}
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="task-list" element={<TaskListPage />} />
          <Route path="show-task/:taskid" element={<ShowTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
