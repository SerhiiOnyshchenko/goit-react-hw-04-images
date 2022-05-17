import React from 'react';
import './PerPage.css';

export default function PerPage({ onChange }) {
   const toggleClass = e => {
      const value = Number(e.target.innerText);
      onChange(value);
      const listBtns = document.querySelectorAll('.PerBtn');
      for (const btn of listBtns) {
         btn.classList.remove('ActiveBtn');
         if (btn.innerText === e.target.innerText) {
            btn.classList.add('ActiveBtn');
         }
      }
   };
   return (
      <div className="PerBtnBox" onClick={toggleClass}>
         <button type="button" className="PerBtn ActiveBtn">
            12
         </button>
         <button type="button" className="PerBtn">
            20
         </button>
         <button type="button" className="PerBtn">
            50
         </button>
      </div>
   );
}
