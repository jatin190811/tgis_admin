import react from 'react'


function App() {
  return (
    <>
      <header>
        <nav className="navbar navbar-inverse adminNav">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Admin<span>Panel</span></a>
            </div>
            <div className="collapse navbar-collapse" id="AdminNavbar">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <div className="dropdown-link">
                    <a href="#" className="dropdown-toggle" type="button" data-toggle="dropdown"><span className="user-icon"><i className="fa fa-user" aria-hidden="true"></i></span>user
                      <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                      <li><a href="#">HTML</a></li>
                      <li><a href="#">CSS</a></li>
                      <li><a href="#">JavaScript</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <aside id='sidebar'>
          <div id='top-sidebar'>
            <form>
              <input placeholder='Search..' type='text' className='form-control' />
            </form>
          </div>
          <div id='bottom-sidebar'>
            <ul>
              <li className='active'><a><i className='fa fa-users'></i>Users</a></li>
              <li><a><i className='fa fa-bell'></i>Notification</a></li>
              <li>
                <a href="#" data-toggle="collapse" data-target="#dashboard">
                  <span><i className="fa fa-users" aria-hidden="true"></i></span>
                  Dashboard
                  <span className="caret pull-right" style={{marginTop:'10px'}}></span>
                </a>
                <ul className="sub_nav collapse" id="dashboard">
                  <li><a href="#"><span><i className="fa fa-plus" aria-hidden="true"></i></span> Add</a></li>
                  <li><a href="#"><span><i className="fa fa-edit" aria-hidden="true"></i></span> Edit</a></li>
                  <li><a href="#"><span><i className="fa fa-trash" aria-hidden="true"></i></span> Delete</a></li>
                </ul>
              </li>
              <li><a><i className='fa fa-sign-out'></i>Logout</a></li>
            </ul>
          </div>
        </aside>
        <section id='page-content'>
          <div className='breadcrumbsec'>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#"><i className='fa fa-home'></i> Home</a></li>
              <li className="breadcrumb-item"><a href="#">Library</a></li>
              <li className="breadcrumb-item active">Data</li>
            </ol>

          </div>
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

export default App;
