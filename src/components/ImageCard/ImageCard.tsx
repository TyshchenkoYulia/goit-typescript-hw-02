import React from "react";
import { FcLike } from "react-icons/fc";
import { GrInstagram } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { Images } from "../../types";
import css from "./ImageCard.module.css";

type ImageCardProps = {
  item: Images;
  onImgClick: (url: string, like: number, nameUser: string) => void;
};

export const ImageCard: React.FC<ImageCardProps> = ({
  item: {
    alt_description,
    urls: { small, regular },
    likes,
    user: { name },
  },
  onImgClick,
}) => {
  return (
    <div className={css.container}>
      <div className={css.imgWrapper}>
        <img
          className={css.img}
          src={small}
          alt={alt_description}
          onClick={() => onImgClick(regular, likes, name)}
          width="210"
          height="130"
        />
      </div>
      <div className={css.textWrapper}>
        <GrInstagram className={css.inst} size="20" color="rgb(133, 12, 97)" />
        <ul className={css.list}>
          <li className={css.item}>
            <FaUserAlt color="rgb(51, 49, 49)" size="12" />
            <p className={css.text}>{name}</p>
          </li>
          <li className={css.item}>
            <FcLike size="12" />
            <p className={css.text}>{likes}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
