import React from "react";
import { ImageCard } from "../ImageCard/ImageCard";
import { Images } from "../../types";
import css from "./ImageGallery.module.css";

type ImageGalleryProps = {
  items: Images[];
  onImgClick: (url: string, like: number, nameUser: string) => void;
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  items,
  onImgClick,
}) => {
  return (
    <div>
      <ul className={css.list}>
        {items.map((item) => (
          <li className={css.item} key={item.id}>
            <ImageCard onImgClick={onImgClick} item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
