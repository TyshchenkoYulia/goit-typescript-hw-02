import { MdOutlineCloudDownload } from "react-icons/md";
import React from "react";
import css from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: () => void;
};

export const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onClick} type="button">
        <MdOutlineCloudDownload size="18" />
        Load more
      </button>
    </div>
  );
};
