import React from "react";
import PageList from "../components/PageList";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../store/modules/comments";

function PageListContainer() {
  const { comments, limit, current_page } = useSelector(
    (state) => state.comments
  );
  const dispatch = useDispatch();

  const total_page = Math.ceil(comments.length / limit);

  const onGetComments = ({ page }) => {
    /* do something here */
  };

  return (
    <PageList
      total_page={total_page}
      onGetComments={onGetComments}
      current_page={current_page}
    />
  )

  
}

export default PageListContainer;
