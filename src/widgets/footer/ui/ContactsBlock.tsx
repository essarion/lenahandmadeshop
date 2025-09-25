interface ContactBlockProps {
    className: string;
}

export const ContactBlock: React.FC<ContactBlockProps> = ({ className }) => {

    return (
        <address
            className={className}
        >
            <p>+7(995) 625-68-59</p>
            <p>redbud.ru@yandex.ru</p>
        </address>
    )
};