import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentList from "../components/CommentList";
import { getComments } from "../store/modules/comments";

function CommentListContainer() {
  const { data } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    /* do something here */
  }, [dispatch]);

  return <CommentList data={data} />;
}

export default CommentListContainer;
