import axios from 'axios';
import react, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { url } from '../env';



function Login() {
  let navigate = useNavigate()
  const [state, setState] = useState({})

  const doLogin = async () => {
    if (!state.username) {
      NotificationManager.error('Username not found', 'Error');
      return;
    }

    if (!state.password) {
      NotificationManager.error('Password not found', 'Error');
      return;
    }

    try {
      let response = await axios.post(url+'admin/login',{username : state.username, password : state.password})
      if(response.status == 200) {
        if(response.data.status == 'error') {
          NotificationManager.error(response.data.message, 'Error');
          return 
        } else {
          let token = response?.data?.data?.token;
          localStorage.setItem('token',token)
          navigate('/')
        }
      } else {
        NotificationManager.error('Something Went Wrong', 'Error');
      }

    } catch (e) {
      NotificationManager.error('Something Went Wrong', 'Error');
    }
  }


  return (
    <>
      <NotificationContainer />
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div id='loginpanel'>
              <div className="row " style={{ marginTop: "20px" }}>
                <div className="col-3"></div>
                <div className="col-6">
                  <form role="form">
                    <fieldset>
                      <h2>Please Sign In</h2>
                      <hr className="colorgraph" />
                      <div className="mb-3">
                        <input type="text" name="username" id="username" className="form-control input-lg" placeholder="Username" onChange={(e) => {
                          setState({ ...state, [e.target.name]: e.target.value })
                        }} />
                      </div>
                      <div className="mb-3">
                        <input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password" onChange={(e) => {
                          setState({ ...state, [e.target.name]: e.target.value })
                        }} />
                      </div>
                      <hr className="colorgraph" />
                      <span className="button-checkbox">
                        <a href="" className="btn btn-link pull-right">Forgot Password?</a>
                      </span>
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <input type="buton" className="btn btn-lg btn-primary btn-block" value="Sign In" onClick={(e) => {
                            e.preventDefault();
                            doLogin();
                          }} />
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
