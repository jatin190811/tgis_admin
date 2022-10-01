import react, { useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import 'react-notifications/lib/notifications.css';



import Home from './pages/Home';
import Login from './pages/Login';

import Users from './pages/Users';
import Requests from './pages/Requests';




import Venues from './pages/Venues';
import BridalMakeups from './pages/BridalMakeups';
import Bridalwears from './pages/Bridalwears';
import Groomwears from './pages/Groomwears';
import Photographers from './pages/Photographers';
import Mehndis from './pages/Mehndis';
import Planners from './pages/Planners';

import VenueDetail from './pages/VenueDetail'
import GroomWearDetail from './pages/GroomWearDetail'
import BridalWearDetail from './pages/BridalWearDetail'
import BridalMakeupDetail from './pages/BridalMakeupDetail'
import PhotographerDetail from './pages/PhotographerDetail'
import MahndiDetail from './pages/MahndiDetail'
import PlannerDetail from './pages/PlannerDetail'


import VenueAdd from './pages/VenueAdd'
import GroomWearAdd from './pages/GroomWearAdd'
import BridalWearAdd from './pages/BridalWearAdd'
import BridalMakeupAdd from './pages/BridalMakeupAdd'
import MahndiAdd from './pages/MahndiAdd'
import PhotographerAdd from './pages/PhotographerAdd'
import PlannerAdd from './pages/PlannerAdd'


import VenueUpdate from './pages/VenueUpdate'
import GroomWearUpdate from './pages/GroomWearUpdate'
import BridalWearUpdate from './pages/BridalWearUpdate'
import BridalMakeupUpdate from './pages/BridalMakeupUpdate'
import MahndiUpdate from './pages/MahndiUpdate'
import PhotographerUpdate from './pages/PhotographerUpdate'
import PlannerUpdate from './pages/PlannerUpdate'



import VenueMedia from './pages/VenueMedia'
import GroomWearMedia from './pages/GroomWearMedia'
import BridalWearMedia from './pages/BridalWearMedia'
import BridalMakeupMedia from './pages/BridalMakeupMedia'
import MahndiMedia from './pages/MahndiMedia'
import PhotographerMedia from './pages/PhotographerMedia'
import PlannerMedia from './pages/PlannerMedia'



Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});


function App() {
   
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/requests" element={<Requests />} />

          <Route path="/venues" element={<Venues />} />
          <Route path="/BridalMakeups" element={<BridalMakeups />} />
          <Route path="/Bridalwears" element={<Bridalwears />} />
          <Route path="/Groomwears" element={<Groomwears />} />
          <Route path="/Photographers" element={<Photographers />} />
          <Route path="/Mehndis" element={<Mehndis />} />
          <Route path="/Planners" element={<Planners />} />


          <Route path="/venue/add" element={<VenueAdd />} exact />
          <Route path="/groomwear/add" element={<GroomWearAdd />} exact />
          <Route path="/bridalwear/add" element={<BridalWearAdd />} exact />
          <Route path="/bridalmakeup/add" element={<BridalMakeupAdd />} exact />
          <Route path="/mehndi/add" element={<MahndiAdd />} exact />
          <Route path="/photographer/add" element={<PhotographerAdd />} exact />
          <Route path="/planner/add" element={<PlannerAdd />} exact />
        

          <Route path="/venue/update/:id" element={<VenueUpdate />} exact />
          <Route path="/groomwear/update/:id" element={<GroomWearUpdate />} exact />
          <Route path="/bridalwear/update/:id" element={<BridalWearUpdate />} exact />
          <Route path="/bridalmakeup/update/:id" element={<BridalMakeupUpdate />} exact />
          <Route path="/mehndi/update/:id" element={<MahndiUpdate />} exact />
          <Route path="/photographer/update/:id" element={<PhotographerUpdate />} exact />
          <Route path="/planner/update/:id" element={<PlannerUpdate />} exact />
        


          <Route path="/venue/media/:id" element={<VenueMedia />} exact />
          <Route path="/groomwear/media/:id" element={<GroomWearMedia />} exact />
          <Route path="/bridalwear/media/:id" element={<BridalWearMedia />} exact />
          <Route path="/bridalmakeup/media/:id" element={<BridalMakeupMedia />} exact />
          <Route path="/mehndi/media/:id" element={<MahndiMedia />} exact />
          <Route path="/photographer/media/:id" element={<PhotographerMedia />} exact />
          <Route path="/planner/media/:id" element={<PlannerMedia />} exact />
        




          <Route path="/venue/:id" element={<VenueDetail />} />
          <Route path="/groomwear/:id" element={<GroomWearDetail />} />
          <Route path="/bridalwear/:id" element={<BridalWearDetail />} />
          <Route path="/bridalmakeup/:id" element={<BridalMakeupDetail />} />
          <Route path="/mehndi/:id" element={<MahndiDetail />} />
          <Route path="/photographer/:id" element={<PhotographerDetail />} />
          <Route path="/planner/:id" element={<PlannerDetail />} />
          


        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
