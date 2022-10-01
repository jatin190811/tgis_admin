import react, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';


import Header from '../global/Header';
import Sidebar from '../global/Sidebar';

import Breadcrumb from '../global/Breadcrumb.js';
import { url } from '../env'



function Home() {
  
  let navigate = useNavigate();
  let { id } = useParams();

  let [state, setState] = useState({});

  useEffect(() => {
    axios.post(url + 'mehndi/' + id, {}).then(resp => {
      setState({ ...state, mehndi: resp?.data?.data })
    })
  }, [])


  return (
    <>
      <Header />
      <NotificationContainer />
      <main>
        <Sidebar />
        <section id='page-content'>
          
          <div className='main-area'>
            <div id='page-title'>
              <h1>Mehndi </h1>
            </div>
            <div className='working-area'>
              <br /><br />
              <h3>{String(state.mehndi?.name).capitalize()} <small><small><small>({state.mehndi?.price}Rs)</small></small></small></h3>
              <hr />
              <h4>Description</h4>
              <p dangerouslySetInnerHTML={{ __html: state.mehndi?.description }}></p>
               <div className='row'>
                <div className='col-12'><h5>Tags</h5></div>
                <div className='col'><p>{state.mehndi?.tags?.map(i => <><button className='btn btn-sm btn-info'>{i}</button>&nbsp;</>)}</p></div>
              </div>
              <hr />
              { state.mehndi?.detailedPrice &&  <div className='row'>
                <div className='col-12'>
                  <h4>Detailed Price</h4>
                  <ul style={{ listStylePosition: "inside" }}>
                  {   Object.keys(state.mehndi?.detailedPrice).filter(i=>typeof(state.mehndi?.detailedPrice[i])!='string')?.map(i => <li> {state.mehndi?.detailedPrice[i].join(' - ')}</li>)}
                </ul>
                </div>
              </div> }
              <div className='row'>
                <div className='col'><h5>Address</h5></div>
                <div className='col'><p>{state.mehndi?.address}</p></div>
              </div>
              <hr />
              <div className='row'>
                <div className='col'><h5>Category</h5></div>
                <div className='col'><p>{'mehndis'}</p></div>
              </div>
              <div className='row'>
                <div className='col'><h5>Sub category</h5></div>
                <div className='col'><p>{state.mehndi?.sub_cat}</p></div>
              </div>
              <div className='row'>
                <div className='col'><h5>Execuisite</h5></div>
                <div className='col'><p>{state.mehndi?.execuisite ? 'Yes' : 'No'}</p></div>
              </div>
              <div className='row'>
                <div className='col'><h5>Featured</h5></div>
                <div className='col'><p>{state.mehndi?.isFeatured ? 'Yes' : 'No'}</p></div>
              </div>
              <hr />
              <div className='row'>
                <div className='col'>
                  <h4>Ameneties</h4>
                  <ul style={{ listStylePosition: "inside" }}>
                    {state.mehndi?.ameneties?.map(i => <li>{i}</li>)}
                  </ul>
                </div>
                
              </div>
              <div className='row'>
                <hr />
                <div className='col-12'>
                  <h4>Contact Details</h4>
                  <ul style={{ listStylePosition: "inside" }}>
                    <li><strong>Number</strong> - {state.mehndi?.contact_details?.number}</li>
                    <li><strong>Email</strong> - {state.mehndi?.contact_details?.email}</li>
                  </ul>
                </div>
              </div>
              { state.mehndi?.specifications &&  <div className='row'>
                <hr />
                <div className='col-12'>
                  <h4>Specifications</h4>
                  <ul style={{ listStylePosition: "inside" }}>
                  {   Object.keys(state.mehndi?.specifications).filter(i=>i!='inhouse')?.map(i => <li><strong>{String(i).capitalize()}</strong> - {state.mehndi?.specifications[i]}</li>)}
                </ul>
                </div>
              </div> }
              { state.mehndi?.detailedPrice &&  <div className='row'>
                <hr />
                <div className='col-12'>
                  <h4>Detailed Price</h4>
                  <ul style={{ listStylePosition: "inside" }}>
                  {   Object.keys(state.mehndi?.detailedPrice).filter(i=>typeof(state.mehndi?.detailedPrice[i])!='string')?.map(i => <li> {state.mehndi?.detailedPrice[i].join(' - ')}</li>)}
                </ul>
                </div>
              </div> }
              {/*  <!-- Working area start--> */}














              {/*  <!-- Working area end--> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
