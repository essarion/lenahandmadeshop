import { useEffect, useRef } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";



const ServiceCard = ({ modalClose, children }) => {


    const ref = useRef()
    useEffect(() => {
        ref.current?.focus()
        function escFunction(event) {
            if (event.key === 'Escape') {
                modalClose()
            }
        }
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', escFunction);

        return () => {
            document.removeEventListener('keydown', escFunction);
            document.body.style.overflow = '';
        }
    }, [modalClose])


    return createPortal(
        <div className={classNames('modal')}
            onClick={modalClose}>
            <div className={classNames('modal__modal-space')}
                onClick={(e) => e.stopPropagation()}>
                {children}
                <button onClick={modalClose} ref={ref}
                    className={classNames('modal__modal-space__button')}>Закрыть</button>

            </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default ServiceCard