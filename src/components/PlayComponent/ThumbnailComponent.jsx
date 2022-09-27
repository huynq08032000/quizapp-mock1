import React from "react";
import './css/style.css'
const ThumbnailComponent = ({ thumbnailSrc }) => {
    return (
        <>
            <div className='center thumbnail-container'>
                {thumbnailSrc && <img src={thumbnailSrc} alt='' />}
            </div>
        </>
    )
}

export default ThumbnailComponent;