import react, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { WithContext as ReactTags } from 'react-tag-input';


import Header from '../global/Header';
import Sidebar from '../global/Sidebar';
import { Form } from 'react-bootstrap';
import Breadcrumb from '../global/Breadcrumb.js';
import { url } from '../env'



function Home() {

  let navigate = useNavigate();
  let { id } = useParams();

  const [state, setState] = useState({
    area_avail: [{ type: '', capacity: '' }],
    type:'bridalwear',
    specifications: [{ '': '' }],
    facts: [{ ques: '', ans: '' }],
    detailedPrice: {
      tag3: '',
      tag1: [],
      tag2: []
    }
  });
  const [editorState, setEditorState] = useState(null);
  const [tags, setTags] = useState([]);
  const [ameneties, setAmeneties] = useState([]);

  const onEditorStateChange = (e) => {
    setEditorState(e)
    setState({ ...state, description: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
  }


  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleAmenetiesDelete = i => {
    setAmeneties(ameneties.filter((tag, index) => index !== i));
  };

  const handleAmenetiesAddition = tag => {
    setAmeneties([...ameneties, tag]);
  };


  const doSubmit = () => {
    const formData = new FormData();

    let req = structuredClone(state)
    if (!req.name) return NotificationManager.error('Name not found', 'Error');

    if (state.selectedFile && state.selectedFile.name) {
      formData.append(
        "images",
        state.selectedFile,
        state.selectedFile.name
      );
    } else {
      return NotificationManager.error('Image not found', 'Error');
    }

    if (state.selectedFileVideo && state.selectedFileVideo.name) {
      formData.append(
        "videos",
        state.selectedFileVideo,
        state.selectedFileVideo.name
      );
    } 

    delete req['selectedFile']
    delete req['selectedFileVideo']


    if (!req.price) return NotificationManager.error('Price not found', 'Error');
    if (!req.type) return NotificationManager.error('Type not found', 'Error');
    if (!req.sub_cat) return NotificationManager.error('Sub Type not found', 'Error');
    if (!req.contact_details?.number) return NotificationManager.error('Contact Number not found', 'Error');
    if (!req.contact_details?.email) return NotificationManager.error('Contact Email not found', 'Error');
    if (!req.description) return NotificationManager.error('Description not found', 'Error');
    if (tags.length < 1) {
      return NotificationManager.error('Tags not found', 'Error');
    } else {
      req['tags'] = tags.map(i => i.text)
    }

    if (ameneties.length < 1) {
      return NotificationManager.error('Ameneties not found', 'Error');
    } else {
      req['ameneties'] = ameneties.map(i => i.text)
    }

    if (!req.address) return NotificationManager.error('Address not found', 'Error');

    
    let nsub = {}
    for (let i = 0; i < req.specifications.length; i++) {
      if (!Object.keys(req.specifications[i])[0] || !Object.values(req.specifications[i])[0]) {
        return NotificationManager.error('Specifications are not Completed', 'Error');
      }
      nsub[Object.keys(req.specifications[i])[0]] = Object.values(req.specifications[i])[0]
    }
    req.specifications = nsub
    for (let i = 0; i < req.facts.length; i++) {
      if (!req.facts[i]['ques'] || !req.facts[i]['ans']) {
        return NotificationManager.error('FAQs are not Completed', 'Error');
      }
    }

    if (!req.detailedPrice || !req.detailedPrice['tag3']) return NotificationManager.error('Detailed Price lable id not Completed', 'Error');
    if (!req.detailedPrice || !req.detailedPrice.tag1 || req.detailedPrice.tag1.length < 1) return NotificationManager.error('Detailed Price tag 1 id not Completed', 'Error');
    if (!req.detailedPrice || !req.detailedPrice.tag2 || req.detailedPrice.tag2.length < 1) return NotificationManager.error('Detailed Price tag 2 id not Completed', 'Error');
    if (req.inhouse) req.specifications['inhouse'] = req.inhouse ? req.inhouse : false

    req['specifications'] = JSON.stringify(req['specifications']);
    req['area_avail'] = JSON.stringify(req['area_avail']);
    req['facts'] = JSON.stringify(req['facts']);
    req['contact_details'] = JSON.stringify(req['contact_details']);
    req['detailedPrice'] = JSON.stringify(req['detailedPrice']);
    req['tags'] = JSON.stringify(req['tags']);
    req['ameneties'] = JSON.stringify(req['ameneties']);


    for (var key in req) {
      formData.append(key, req[key]);
    }
    axios.post(url + 'bridal-wear/create', formData, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then(resp => {
      if (resp.data.status == 'success') {
        return NotificationManager.success('Successfully Added', 'Success');
      } else {
        return NotificationManager.error(resp.data.message, 'Error');
      }
    })



  }

  const onFileChange = event => {
    console.log(event.target.files)
    setState({ ...state, selectedFile: event.target.files[0] });
  };


  const onFileChangeVideo = event => {
    console.log(event.target.files)
    setState({ ...state, selectedFileVideo: event.target.files[0] });
  };

  return (
    <>
      <Header />
      <NotificationContainer />
      <main>
        <Sidebar />
        <section id='page-content'>
          
          <div className='main-area'>
            <div id='page-title'>
              <h1>Bridal Wear </h1>
            </div>
            <div className='working-area'>
              <br /><br />
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setState({ ...state, name: e.target.value })} />
                </Form.Group>


                <h3>Image</h3>
                <input className='form-control' type="file" name="images" onChange={onFileChange} />
                <br />

                <h3>Upload Video</h3>
                <input className='form-control' type="file" name="videos" onChange={onFileChangeVideo} />
                <br />


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Check
                    label="Featured"
                    name="group1" type="radio"
                    onChange={(e) => setState({ ...state, isFeatured: state.isFeatured ? false : true })}
                  />
                  <br />
                  <Form.Check
                    label="Execuisite"
                    name="group1" type="radio"
                    onChange={(e) => setState({ ...state, execuisite: state.execuisite ? false : true })}
                  />
                  <br />
                  <Form.Check
                    label="Inhouse"
                    name="group1" type="radio"
                    onChange={(e) => setState({ ...state, inhouse: state.inhouse ? false : true })}
                  />
                  <br />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sub Type</Form.Label>
                  <Form.Select onChange={(e) => setState({ ...state, sub_cat: e.target.value })} aria-label="Default select example">
                    <option> -- Select Subcategory -- </option>
                    <option value="Kanjeevaram Sarees">Kanjeevaram Sarees</option>
                    <option value='Silk Sarees'>Silk Sarees</option>
                    <option value="Bridal Lehengas">Bridal Lehengas</option>
                    <option value="Cocktail Gowns">Cocktail Gowns</option>
                  </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Phone Number" onChange={(e) => setState({ ...state, contact_details: { ...state.contact_details, number: e.target.value } })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter Email" onChange={(e) => setState({ ...state, contact_details: { ...state.contact_details, email: e.target.value } })} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="Number" placeholder="Enter Price in Rs" onChange={(e) => setState({ ...state, price: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Editor
                    toolbar={{
                      options: ['inline'],
                    }}
                    editorState={editorState}
                    toolbarClassName="description"
                    wrapperClassName="description"
                    editorClassName="description"
                    onEditorStateChange={onEditorStateChange}
                  />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tags</Form.Label>
                  <ReactTags
                    tags={tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="bottom"
                    autofocus={false}
                  />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Address here"
                    style={{ height: '100px' }}
                    onChange={(e) => setState({ ...state, address: e.target.value })}
                  />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ameneties</Form.Label>
                  <ReactTags
                    tags={ameneties}
                    placeholder="Please Enter new Ameneties"
                    handleDelete={handleAmenetiesDelete}
                    handleAddition={handleAmenetiesAddition}
                    inputFieldPosition="bottom"
                    autofocus={false}
                  />
                </Form.Group>

               
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Specifications <i className='fa fa-plus' onClick={() => {
                    let specifications = state.specifications
                    specifications.push({ '': '' })
                    setState({ ...state, specifications })
                  }} ></i></Form.Label>
                  <div className='row'>
                    {state.specifications?.map((item, index) => {
                      return (<>
                        <div className='col-6' style={{ marginBottom: '5px' }}>
                          <Form.Control
                            placeholder="key"
                            defaultValue={Object.keys(state.specifications[index])[0]}
                            onChange={e => {
                              let specifications = state.specifications
                              let lastVal = Object.values(specifications[index])[0]
                              specifications[index] = {}
                              specifications[index][e.target.value] = lastVal
                              setState({ ...state, specifications })
                            }
                            }
                          />
                        </div>
                        <div className='col-6' style={{ marginBottom: '5px' }}>
                          <Form.Control
                            placeholder="Value"
                            defaultValue={state.specifications[index][Object.keys(state.specifications[index])[0]]}
                            onChange={e => {
                              let specifications = state.specifications
                              let lastVal = Object.keys(specifications[index])[0]
                              specifications[index] = { [lastVal]: e.target.value }
                              setState({ ...state, specifications })
                            }
                            }
                          />
                        </div>
                      </>)
                    })
                    }
                  </div>
                </Form.Group>



                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>FAQs <i className='fa fa-plus' onClick={() => {
                    let facts = state.facts
                    facts.push({ ques: '', ans: '' })
                    setState({ ...state, facts })

                  }}></i></Form.Label>
                  <div className='row'>
                    {state.facts?.map((item, index) => {
                      return (<>
                        <div className='col-12' style={{ marginBottom: 5 }}>
                          <Form.Control
                            placeholder="Question"
                            defaultValue={state.facts[index]['ques']}
                            onChange={e => {
                              let facts = state.facts
                              facts[index]['ques'] = e.target.value
                              setState({ ...state, facts })
                            }}
                          />
                        </div>
                        <div className='col-12' style={{ marginBottom: 25 }}>
                          <Form.Control
                            placeholder="Answer"
                            as="textarea"
                            style={{ height: '50px' }}
                            defaultValue={state.facts[index]['ans']}
                            onChange={e => {
                              let facts = state.facts
                              facts[index]['ans'] = e.target.value
                              setState({ ...state, facts })
                            }}
                          />
                        </div>
                      </>)
                    })
                    }
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Detailed Price </Form.Label>
                  <div className='row'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Label</Form.Label>
                      <Form.Control type="text" placeholder="Enter Label" onChange={e => {
                        if (!state.detailedPrice) state.detailedPrice = {}
                        state.detailedPrice['tag3'] = e.target.value
                      }} />
                    </Form.Group>

                    <Form.Label>Tag 1</Form.Label>
                    <>
                      <div className='col' style={{ marginBottom: 5 }}>
                        <Form.Control
                          placeholder="Type"
                          onChange={e => {
                            state.detailedPrice['tag1'][0] = e.target.value
                          }}
                        />
                      </div>
                      <div className='col' style={{ marginBottom: 25 }}>
                        <Form.Control
                          placeholder="Value"
                          onChange={e => {
                            state.detailedPrice['tag1'][1] = e.target.value
                          }}
                        />
                      </div>
                    </>
                    <Form.Label>Tag 3</Form.Label>
                    <>
                      <div className='col' style={{ marginBottom: 5 }}>
                        <Form.Control
                          placeholder="Type"
                          onChange={e => {
                            state.detailedPrice['tag2'][0] = e.target.value
                          }}
                        />
                      </div>
                      <div className='col' style={{ marginBottom: 25 }}>
                        <Form.Control
                          placeholder="Value"
                          onChange={e => {
                            state.detailedPrice['tag2'][1] = e.target.value
                          }}
                        />
                      </div>
                    </>
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <button className='btn btn-primary' onClick={(e) => {
                    e.preventDefault()
                    doSubmit()
                  }} >Next</button>
                </Form.Group>


              </Form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
