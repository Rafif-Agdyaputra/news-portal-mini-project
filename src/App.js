import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NotFound404 from './Pages/NotFound404';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box padding='3'>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='*' element={<NotFound404/>}/>
    </Routes>
    </Box>
  );
}

export default App;
