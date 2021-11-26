import {FunctionalComponent, h} from 'preact';
import { videoId } from '../../appConstants';
import style from './style.scss';

const Video: FunctionalComponent = () => {
    return (
        <div className={style.video}>
            <iframe
                style={{ width: "100%", height: "100%" }}
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
};

export default Video;