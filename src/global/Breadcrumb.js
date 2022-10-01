import react from 'react'



function Breadcrumb() {
    return (
        <div className='breadcrumbsec'>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#"><i className='fa fa-home'></i> Home</a></li>
                <li className="breadcrumb-item"><a href="#">Library</a></li>
                <li className="breadcrumb-item active">Data</li>
            </ol>
        </div>
    );
}

export default Breadcrumb;
