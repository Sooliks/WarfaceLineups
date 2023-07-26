import React, {useEffect, useState} from 'react';
import VideoForLineups from "./VideosPreview/VideoForLineups";
import VideoForProfile from "./VideosPreview/VideoForProfile";
import VideoForFavorites from "./VideosPreview/VideoForFavorites";
import VideoForAdminPanel from "./VideosPreview/VideoForAdminPanel";
import ModalVideo from "./ModalVideo";
import ModalScreenshots from "./ModalScreenshots";



const VideoPreview = ({video, type, key}) => {
    const[isVisibleModalVideo,setIsVisibleModalVideo] = useState(false);
    const [isVisibleModalScreenshots,setIsVisibleModalScreenshots] = useState(false);
    const handleClickOnVideo = () =>{
        if(video.screenShotsId===0){
            setIsVisibleModalVideo(true);
        }
        else {
            setIsVisibleModalScreenshots(true);
        }
    }
    const handleOnMouseOver = (e) =>{
        e.target.style.borderColor="rgb(63,65,70)";
    }
    const handleOnMouseOut = (e) =>{
        e.target.style.borderColor="#303030";
    }
    /*useEffect(()=>{
        if(video.title.length > 37){
            video.title = video.title.substring(0,37);
            video.title += "...";
        }
    })*/

    return (
        <div>
            <div>
                {type === "default" &&
                    <VideoForLineups video={video} handleClickOnVideo={handleClickOnVideo} handleOnMouseOver={handleOnMouseOver} handleOnMouseOut={handleOnMouseOut}/>
                }
            </div>
            <div>
                {type === "favorites" &&
                    <VideoForFavorites video={video} handleClickOnVideo={handleClickOnVideo} handleOnMouseOver={handleOnMouseOver} handleOnMouseOut={handleOnMouseOut}/>
                }
            </div>
            <div>
                {type === "uservideo" &&
                    <VideoForProfile video={video} handleClickOnVideo={handleClickOnVideo} handleOnMouseOver={handleOnMouseOver} handleOnMouseOut={handleOnMouseOut}/>
                }
            </div>
            <div>
                {type === "admin" &&
                    <VideoForAdminPanel video={video} handleClickOnVideo={handleClickOnVideo} handleOnMouseOver={handleOnMouseOver} handleOnMouseOut={handleOnMouseOut}/>
                }
            </div>
            {isVisibleModalVideo && <ModalVideo video={video} onClose={()=>setIsVisibleModalVideo(false)}/>}
            {isVisibleModalScreenshots && <ModalScreenshots video={video} onClose={()=>setIsVisibleModalScreenshots(false)}/>}
        </div>
    );
};

export default VideoPreview;