import react, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Header from '../global/Header';
import Sidebar from '../global/Sidebar';

import Breadcrumb from '../global/Breadcrumb.js';
import { url } from '../env'



function Home() {
  let navigate = useNavigate();
  let [state, setState] = useState({bridal_wearsShow: [], page: 1});

  useEffect(() => {
    axios.post(url + 'groom', {}).then(resp => {
      setState({ ...state, groom_wears: resp?.data?.data, groom_wearsShow :  resp?.data?.data })
    })
  }, [])

  const deleteItem = (i) => {
    setState({ ...state, showDeleteModal: true, deleteRef: i })
  }

  const handleClose = (i) => {
    setState({ ...state, showDeleteModal: false, deleteRef: null })
  }

  const deleteItemConfirm = (i) => {
    setState({ ...state, showDeleteModal: false })
    axios.post(url + 'groom/delete/' + state.deleteRef._id, {}, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then(resp => {
      if (resp.data.status != 'error') {
        axios.post(url + 'groom', {}).then(resp => {
          setState({ ...state, groom_wears: resp?.data?.data,  groom_wearsShow :  resp?.data?.data,   deleteRef: null, showDeleteModal: false, })
          NotificationManager.success('Successfully Deleted', 'Success');
        })
      } else {
        if (resp.data.error == 999) {
          NotificationManager.error('Session Expired', 'Error');
          setTimeout(() => {
            navigate('/login');
          }, 3000)
        } else {
          NotificationManager.error(resp.data.message, 'Error');
        }
      }
    })
  }

  useEffect(()=>{
    if(state.searchKey){
      let vanues = JSON.parse(JSON.stringify(state.groom_wears));
       vanues = vanues.filter(o => o.address.includes(state.searchKey) ||
             o.name.includes(state.searchKey) ||
             o.name.includes(state.searchKey) ||
             o.contact_details?.email.includes(state.searchKey) ||
             o.contact_details?.number.includes(state.searchKey) 
        );
      console.log(vanues)
      setState({...state, groom_wearsShow: vanues})
    } else {
      setState({...state, groom_wearsShow: state.groom_wears})
    }

  },[state.searchKey])


  useEffect(() => {
    axios.post(url + 'groom?page='+state.page, {}).then(resp => {
      setState({ ...state, groom_wears: resp?.data?.data, groom_wearsShow: resp?.data?.data, searchKey: '' })
    })
    
  }, [state.page])

  return (
    <>
      <Header />
      <NotificationContainer />
      <main>
        <Sidebar />
        <section id='page-content'>
          
          <div className='main-area'>
            <div id='page-title'>
              <h1>Groom Wears</h1>
            </div>
            <div className='working-area'>
              <br /><br />
              {/*  <!-- Working area start--> */}
              <div className='row'>
                <div className='col-12'>
                  <button onClick={()=>navigate('/groomwear/add')} className='btn btn-primary pull-right'>Add New</button><br /><br />
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder="search Key"
                          aria-label="Search Key"
                          aria-describedby="basic-addon1"
                          onChange={(e)=>{ setState({...state, searchKey : e.target.value})}}
                        />
                      </InputGroup>
                    </div>
                  </div>
                {state.groom_wearsShow && state.groom_wearsShow.length ? <div class="table-responsive">

                  <table class="table table-hover table-bordered table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Address</th>
                        <th>Contact Email</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        state.groom_wearsShow.map((item, index) => {
                          return (
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.type}</td>
                              <td>{item.address}</td>
                              <td>{item.contact_details?.email}</td>
                              <td>{item.contact_details?.number}</td>
                              <td>
                                <button  className='btn btn-primary btn-sm' onClick={() => {
                                  navigate('/groomwear/' + item._id)
                                }}>View</button>&nbsp;
                                <button className='btn btn-warning btn-sm' onClick={() => {
                                  navigate('/groomwear/media/' + item._id)
                                }}>Media</button>&nbsp;
                                 <button className='btn btn-warning btn-sm' onClick={() => {
                                  navigate('/groomwear/update/' + item._id)
                                }}>Update</button>&nbsp;
                                
                                <button className='btn btn-danger  btn-sm' onClick={(e) => {
                                  e.preventDefault();
                                  deleteItem(item)
                                }}>Delete</button>
                              </td>
                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </table>
                </div> :
                  <div className='col'>
                    <div className='alert alert-info'>No Result Found</div>
                  </div>
                }
              </div>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  { state.page > 1 ? <li class="page-item" ><button onClick={() => { if (state.page > 0) setState({ ...state, page: state.page - 1 }) }} class="page-link" href="#">Previous</button></li> : null }
                  { state.groom_wearsShow?.length ? <li class="page-item" ><button onClick={() => { setState({ ...state, page: state.page + 1 }) }} class="page-link" href="#">Next</button></li> : null }
                </ul>
              </nav>
              {/*  <!-- Working area end--> */}
            </div>
          </div>
        </section>
        <Modal show={state.showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Hey, Are you sure you want to delete this Item!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteItemConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
}

export default Home;
