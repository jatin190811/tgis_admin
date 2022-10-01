import react, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from '../global/Header';
import Sidebar from '../global/Sidebar';

import Breadcrumb from '../global/Breadcrumb.js';



function Home() {
  let navigate = useNavigate();


  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      navigate(`/login`);
    }
  }, [])




  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <section id='page-content'>
          
          <div className='main-area'>
            <div id='page-title'>
              <h1>Dashboard</h1>
            </div>
            <div className='working-area'>
              {/*  <!-- Working area start--> */}
              <div className='row'>
                <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                  <div className='infocard  infowarning'>
                    <div className='infoimg'>
                      <i className='fa fa-users'></i>
                    </div>
                    <div className='infoetxt'>
                      <h2>150</h2>
                      <a href='btn btn-link '>Users</a>
                    </div>
                  </div>
                </div>
              </div>
              {/*  <!-- Working area end--> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
