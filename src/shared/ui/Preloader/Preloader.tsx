import styles from './preloader.module.scss';
import Logo from '@/shared/assets/favicon.svg?component';

export const Preloader = () => {
    return (
        <div className={styles.spin}>
            <Logo width={500} height={500} />
        </div>
    );
};
