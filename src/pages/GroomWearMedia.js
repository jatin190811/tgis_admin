import react, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Header from '../global/Header';
import Sidebar from '../global/Sidebar';
import { Form } from 'react-bootstrap';
import { url, mediaurl } from '../env'



function Home() {

  let navigate = useNavigate();
  let { id } = useParams();

  const [state, setState] = useState({

  });

  useEffect(() => {
    axios.post(url + 'groom-wear/' + id, {}).then(resp => {
      let response = structuredClone(resp?.data?.data)
      console.log(response.images)
      setState(response)
    })
  }, [])


  const deleteImage = (index) => {
    let images = [...state.images];
    let dlImages = images.splice(index, 1)
    axios.post(url + 'groom-wear/image/delete/' + id, { images: images, deletedImage: dlImages }).then(resp => {
      axios.post(url + 'groom-wear/' + id, {}).then(resp => {
        let response = structuredClone(resp?.data?.data)
        console.log(response.images)
        setState(response)
      })
    })
  }


  const onFileChange = event => {
        console.log( event.target.files)
        setState({ ...state,  selectedFile: event.target.files[0] });
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "images",
      state.selectedFile,
      state.selectedFile.name
    );

    axios.post(url + 'groom-wear/image/upload/' + id, formData).then(resp => {
      axios.post(url + 'groom-wear/' + id, {}).then(resp => {
        let response = structuredClone(resp?.data?.data)
        console.log(response.images)
        setState(response)
      })
    })
  };


  const deleteVideo = (index) => {
    let videos = [...state.videos];
    let dlVideos = videos.splice(index, 1)
    axios.post(url + 'venue/video/delete/' + id, { videos: videos, deletedVideo: dlVideos }).then(resp => {
      axios.post(url + 'venue/' + id, {}).then(resp => {
        let response = structuredClone(resp?.data?.data)
        console.log(response.videos)
        setState(response)
      })
    })
  }

  const onFileChangeVideo = event => {
    console.log(event.target.files)
    setState({ ...state, selectedFileVideo: event.target.files[0] });
  };

  const onFileUploadVideo = () => {
    const formData = new FormData();
    formData.append(
      "videos",
      state.selectedFileVideo,
      state.selectedFileVideo.name
    );

    axios.post(url + 'venue/video/upload/' + id, formData).then(resp => {
      axios.post(url + 'venue/' + id, {}).then(resp => {
        let response = structuredClone(resp?.data?.data)
        console.log(response.videos)
        setState(response)
      })
    })
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
              <h1>Groom wear Media <small><small><small>({state.name})</small></small></small></h1>
            </div>
            <div className='working-area'>
              <br /><br />
              <div className="row">
                {state.images?.map((i, index) => (<div className="col-2 justify-content-center" style={{ justifyContent: 'space-around' }}>
                  <img height='100px' width='100%' src={mediaurl + "/" + i} onClick={() => {
                    window.open(mediaurl + "/" + i)
                  }} />

                  <p style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                    <i className='fa fa-trash' style={{ color: '#0275d8' }} onClick={() => deleteImage(index)}></i>
                  </p>
                </div>))}
              </div>
              <div className="row">
                <h3>Videos</h3>
                {state.videos?.map((i, index) => (<div className="col justify-content-center" style={{ justifyContent: 'space-around' }}>
                  <video width="320" height="240" controls>
                    <source src={mediaurl + "/" + i} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <p style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                    <i className='fa fa-trash' style={{ color: '#0275d8' }} onClick={() => deleteVideo(index)}></i>
                  </p>
                </div>))}
              </div>
                <br /><br /><br /><br />
                {/* form here  */}
                <hr/>
              <h3>Upload Image</h3>
              < input className='form-control' type="file" name="images" onChange={onFileChange} />
              <br />
              <button className='btn btn-primary' onClick={onFileUpload}>Upload</button>
              <hr/>
              <h3>Upload Video</h3>
              < input className='form-control' type="file" name="videos" onChange={onFileChangeVideo} />
              <br />
              <button className='btn btn-primary' onClick={onFileUploadVideo}>Upload</button>
            
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
