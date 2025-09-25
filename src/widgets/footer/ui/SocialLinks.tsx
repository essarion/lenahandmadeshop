import Image from "next/image";
import vk from "@/shared/assets/vk-logo.svg";
import tg from "@/shared/assets/telegram-svgrepo-com.svg";
import inst from "@/shared/assets/instagram-sign-logo.svg";
import styles from "./footer.module.scss";

export const SocialLinks: React.FC = () => {
    return (
        <nav aria-label="Социальные сети" className={styles.socialLinksBlock}>
            <p>Мы в соц сетях:</p>

            <div className={styles.imagesLinks}>
                <a
                    href="https://t.me/redbud_candles"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Мы в Telegram"
                >
                    <Image
                        src={tg}
                        alt="Мы в Telegram"
                        width={30}
                        height={30}
                        loading="lazy"
                    />
                </a>

                <a
                    href="https://vk.com/redbud_candles"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Мы в VK"
                >
                    <Image
                        src={vk}
                        alt="Мы в VK"
                        width={30}
                        height={30}
                        loading="lazy"
                    />
                </a>

                <a
                    href="https://www.instagram.com/redbud_candles"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Мы в Instagram"
                >
                    <Image
                        src={inst}
                        alt="Мы в Instagram"
                        width={30}
                        height={30}
                        loading="lazy"
                    />
                </a>
            </div>
        </nav>
    );
};
