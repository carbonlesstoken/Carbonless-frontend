import {FunctionalComponent, h} from 'preact';
import style from './style.scss';
import {team} from "./mock";
import {useCallback, useState} from "preact/hooks";

const Team: FunctionalComponent = () => {
    const [isDescFull, setIsDescFull] = useState<boolean>(false);

    const descHandler = useCallback((): void => {
        setIsDescFull(!isDescFull)
    }, [isDescFull])
    return (
        <div className={style.team}>
            <img className={style['team__rectangle']} src='../../assets/img/rectangle-team.png' alt='bg' />
            <div className={style['team__container']}>
                <h2 className={style['team__container_title']}>Team Info</h2>
                <div className={style['cards']}>
                    {team.map(item =>
                        <div key={item.alt} className={style['team__container_content']}>
                            <div className={style['team__container_content_item']}>
                                <div className={style['team__container_content_item_img']}>
                                    <img src='../../assets/img/team-border.png' alt='rectangle' />
                                    <img src={item.img} alt={item.alt} />
                                </div>
                                <h2 className={style['team__container_content_item_title']}>{item.name}</h2>
                                <h3 className={style['team__container_content_item_subtitle']}>{item.role}</h3>

                                <h3 className={`${style['team__container_content_item_desc']} ${isDescFull ? style['max-height440'] : ''}`}>{item.desc}</h3>

                                {!isDescFull && <div onClick={descHandler} className={style['team__container_content_item_button']}>
                                    <h2>More</h2>
                                    <img src='../../assets/img/button-more.png' alt='button' />
                                </div>}
                            </div>
                            <img className={style['team__container_content_rectangle']} src='../../assets/img/rectangle-team-item.png' alt='bg' />

                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Team;