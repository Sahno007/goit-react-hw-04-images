import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import fetchPixabay from 'services/pixabay';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedIMG, setSelectedIMG] = useState(false);
  const [isVisibleBtn, setIsVisibleBtn] = useState(true);

  const fetchData = async () => {
    if (!searchText) {
      return;
    }

    setIsLoading(true);

    try {
      const resp = await fetchPixabay(searchText, currentPage);

      if (!resp.ok) {
        setError('Sorry, something not good');
        throw new Error();
      }

      const data = await resp.json();

      if (data.totalHits === 0) {
        setError('Sorry, nothing');
        throw new Error();
      } else {
        setTotalHits(data.totalHits);
        setItems(prevItems => [...prevItems, ...data.hits]);
        setIsVisibleBtn(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchText, currentPage]);

  const handlerImageClick = ({
    target: {
      dataset: { original },
    },
  }) => {
    setSelectedIMG(original);
    setIsShowModal(true);
  };

  const handlerCloseModal = () => {
    setIsShowModal(false);
  };

  const handlerLoadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const handlerSubmit = value => {
    setSearchText(value);
    setCurrentPage(1);
    setItems([]);
    setError('');
    setIsVisibleBtn(false);
  };

  return (
    <>
      <SearchBar handlerSubmit={handlerSubmit} />
      {isShowModal && (
        <Modal
          handlerCloseModal={handlerCloseModal}
          selectedIMG={selectedIMG}
        />
      )}
      {items.length > 0 && (
        <ImageGallery items={items} handlerImageClick={handlerImageClick} />
      )}
      {isLoading && <Loader />}
      {isVisibleBtn && totalHits > items.length && (
        <Button handlerLoadMore={handlerLoadMore} />
      )}
      {error && <p className="error">{error}</p>}
    </>
  );
};
