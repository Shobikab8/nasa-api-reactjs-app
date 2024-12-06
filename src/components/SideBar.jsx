import React from 'react'

export default function SideBar(props){
    const {handleToggleInfo, data} = props;
    return(
        <div className='sideBar'>
            <div className='bgOverlay'></div>
            <div className='sbContent'>
                <h2>{data?.title}</h2>
                <div className='descriptionContainer'> 
                    <p className='sbDate'>{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>
                <button onClick={handleToggleInfo}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}
