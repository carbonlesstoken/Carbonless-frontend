import {
    FunctionComponent, h
} from 'preact';
import styles from './style.scss';

const PopupPreloader: FunctionComponent = () => (
    <div className={styles.preloader}>
        <div className={styles.preloader__iconWrapper}>
            <img
                src={'../../assets/img/pending.svg'}
                alt='loading'
                className={styles.preloader__icon}
            />
        </div>
    </div>
);

export default PopupPreloader;