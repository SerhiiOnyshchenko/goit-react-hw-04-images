import { useState, useEffect } from 'react';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import SearchApi from 'services/Api';
import Notiflix from 'notiflix';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import * as Scroll from 'react-scroll';
import Scrollup from 'components/Scrollup/Scrollup';

export default function App() {
   const [searchName, setSearchName] = useState('');
   const [countPage, setCountPage] = useState(1);
   const [perPage, setPerPage] = useState(12);
   const [imagesList, setImagesList] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [showLoadMore, setShowLoadMore] = useState(false);
   const [loading, setLoading] = useState(false);
   const [openModalItem, setOpenModalItem] = useState({ url: '', alt: '' });
   Notiflix.Notify.init({
      position: 'left-top',
   });
   useEffect(() => {
      if (!searchName) {
         return;
      }
      setShowLoadMore(false);
      setLoading(true);
      SearchApi(searchName, countPage, perPage)
         .then(date => {
            const filterDataHits = date.hits.map(img => {
               return Object.fromEntries(
                  Object.entries(img).filter(([key]) =>
                     ['id', 'tags', 'largeImageURL', 'webformatURL'].includes(
                        key
                     )
                  )
               );
            });
            setImagesList(prev => [...prev, ...filterDataHits]);
            setLoading(false);
            if (date.total !== date.hits.length) {
               setShowLoadMore(true);
            }
            if (countPage === 1) {
               Notiflix.Notify.success(
                  `Hooray! We found ${date.totalHits} images.`
               );
            }
            if (date.total <= countPage * perPage) {
               setShowLoadMore(false);
               Notiflix.Notify.info(
                  "We're sorry, but you've reached the end of search results."
               );
            }
         })
         .catch(onApiError);
   }, [countPage, searchName, perPage]);

   const onApiError = () => {
      Notiflix.Notify.failure(
         'Sorry, there are no images matching your search query. Please try again.'
      );
      setShowLoadMore(false);
      setLoading(false);
   };

   const onSubmit = (name, per) => {
      if (!name) {
         Notiflix.Notify.failure('Please. Enter the name of the picture.');
         setShowLoadMore(false);
      }
      if (searchName === name && countPage === 1 && per === perPage) {
         return;
      }
      setSearchName(name);
      setPerPage(per);
      setCountPage(1);
      setImagesList([]);
   };

   const onloadeMore = () => {
      setCountPage(prev => prev + 1);
      scrollSlowly();
   };

   const scrollSlowly = () => {
      const { height: cardHeight } = document
         .querySelector('#ImageGallery')
         .firstElementChild.getBoundingClientRect();
      Scroll.animateScroll.scrollMore(cardHeight * 2);
   };

   const openModal = (url, alt) => {
      setOpenModalItem({ url, alt });
      setTimeout(() => {
         setShowModal(true);
      }, 100);
   };

   return (
      <div className="App">
         <Searchbar onSubmit={onSubmit} />
         {showModal && (
            <Modal
               url={openModalItem.url}
               alt={openModalItem.alt}
               onClose={() => setShowModal(false)}
            />
         )}
         <ImageGallery params={imagesList} openModal={openModal} />
         {loading && <Loader />}
         {showLoadMore && <Button onClick={onloadeMore} title="Load more" />}
         <Scrollup />
      </div>
   );
}
