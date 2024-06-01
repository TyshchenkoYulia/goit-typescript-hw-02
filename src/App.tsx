import { useEffect, useState } from "react";
import { fetchImages } from "./image-api";
import { Images } from "./types";

import { SearchBar } from "./components/SearchBar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Loader } from "./components/Loader/Loader";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";
import { LoadMoreBtn } from "./components/LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "./components/ImageModal/ImageModal";
import { NotFoundError } from "./components/NotFoundError/NotFoundError";

export default function App() {
  const [imgs, setImgs] = useState<Images[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [notFoundError, setNotFoundError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [imgUrl, setImgsUrl] = useState<string[]>([]);

  const [likes, setLikes] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImages = async () => {
      try {
        setError(false);
        setLoading(true);
        setNotFoundError(false);

        const newImgs: Images[] = await fetchImages(page, query);

        if (newImgs.length === 0) {
          setNotFoundError(true);
        }

        setImgs((prevImages) => {
          return [...prevImages, ...newImgs];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const handleSubmit = (query: string): void => {
    setQuery(query);
    setPage(1);
    setImgs([]);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const openModal = (url: string, like: number, nameUser: string): void => {
    setImgsUrl(url);
    setLikes(like);
    setUserName(nameUser);
    toggle();
  };

  const toggle = (): void => {
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
