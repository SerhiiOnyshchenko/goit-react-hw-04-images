import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ onClose, url, alt }) {
   const modalRoot = useRef(document.querySelector('#modal-root'));

   useEffect(() => {
      const handelKeyUp = e => {
         if (e.code === 'Escape') {
            addCloseClass();
            setTimeout(() => {
               onClose();
            }, 1000);
         }
      };
      window.addEventListener('keydown', handelKeyUp);
      return () => {
         window.removeEventListener('keydown', handelKeyUp);
      };
   }, [onClose]);

   const handleBackdropClick = e => {
      if (e.target === e.currentTarget) {
         addCloseClass();
         setTimeout(() => {
            onClose();
         }, 1000);
      }
   };
   const addCloseClass = () => {
      const Overlay = document.querySelector('#CloseAnimateOverlay');
      const Modal = document.querySelector('#CloseAnimateModal');
      Overlay.classList.add(`${s.CloseAnimate}`);
      Modal.classList.add(`${s.CloseAnimateModal}`);
   };
   return createPortal(
      <div
         id="CloseAnimateOverlay"
         className={s.Overlay}
         onClick={handleBackdropClick}
      >
         <div id="CloseAnimateModal" className={s.Modal}>
            <img src={url} alt={alt} />
         </div>
      </div>,
      modalRoot.current
   );
}

Modal.propTypes = {
   url: PropTypes.string.isRequired,
   alt: PropTypes.string.isRequired,
   onClose: PropTypes.func.isRequired,
};
