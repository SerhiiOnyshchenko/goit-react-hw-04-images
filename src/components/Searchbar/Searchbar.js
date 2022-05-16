import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
   const [value, setValue] = useState('');

   const onFormSubmit = e => {
      e.preventDefault();
      onSubmit(value);
   };

   return (
      <header className={s.Searchbar}>
         <form className={s.SearchForm} onSubmit={onFormSubmit}>
            <button type="submit" className={s.SearchFormButton}></button>
            <label className={s.SearchFormButtonLabel}></label>
            <input
               className={s.SearchFormInput}
               type="text"
               autoComplete="off"
               autoFocus={true}
               value={value}
               onChange={e => setValue(e.target.value)}
               placeholder="Search images and photos"
            />
         </form>
      </header>
   );
}

Searchbar.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};
