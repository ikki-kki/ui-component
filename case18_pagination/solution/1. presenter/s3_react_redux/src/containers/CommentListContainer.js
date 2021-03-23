import React , { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import CommentList from '../components/CommentList';
import { getComments } from '../store/modules/comments';


function CommentListContainer(){

  const { data } = useSelector( state => state.comments );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( getComments({  page : 1 }) );
  }, [dispatch]);


    return (
      <CommentList data={data} />
    )

}

export default CommentListContainer;