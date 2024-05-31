import { useEffect, useState } from "react";
import { fetchImages } from "./image-api";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import NotFoundError from "./components/NotFoundError/NotFoundError";

export default function App() {
  const [imgs, setImgs] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [notFoundError, setNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [imgUrl, setImgsUrl] = useState([]);

  const [likes, setLikes] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImages = async () => {
      try {
        setError(false);
        setLoading(true);
        setNotFoundError(false);

        const newImgs = await fetchImages(page, query);

        if (newImgs.length === 0) {
          setNotFoundError(true);
        }

        setImgs((prevImages) => [...prevImages, ...newImgs]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImgs([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (url, like, nameUser) => {
    setImgsUrl(url);
    setLikes(like);
    setUserName(nameUser);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {imgs.length > 0 && <ImageGallery onImgClick={openModal} items={imgs} />}
      {notFoundError && <NotFoundError />}
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {imgs.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modal && (
        <ImageModal
          image={imgUrl}
          imgModal={modal}
          item={imgs}
          onModalClose={toggle}
          imgLikes={likes}
          user={userName}
        />
      )}
    </div>
  );
}
