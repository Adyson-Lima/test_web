import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cars from "./pages/Cars";
import NewUpdateCar from "./pages/NewUpdateCar";

function AppRoutes() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cars />}/>
        <Route path="/cars/:carId" element={<NewUpdateCar />}/>
      </Routes>
    </BrowserRouter>
  );

}

export default AppRoutes;
