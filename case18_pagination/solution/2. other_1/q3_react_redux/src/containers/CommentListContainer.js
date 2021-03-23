import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentList from "../components/CommentList";

function CommentListContainer() {
  /**
   * [!] 불필요한 상태값을 모두 불러들이는 경우 상태값 변화에 따라 불필요하게 컴포넌트 랜더링 로직이 실행될 수 있습니다.
   * 필요한 속성만 `useSelector`를 이용하여 불러 사용하는 습관을 만들면 좋습니다.
   */
  const { commentItems, currentPageIndex, maxPageItemCount } = useSelector(({ comments }) => {
    const { commentItems, currentPageIndex, maxPageItemCount } = comments;
    return {
      commentItems, currentPageIndex, maxPageItemCount
    };
  });

  const data = useMemo(() => {
    const startIndex = currentPageIndex * maxPageItemCount;
    return commentItems.slice(startIndex, startIndex + maxPageItemCount);
  }, [commentItems, currentPageIndex, maxPageItemCount]);

  return <CommentList data={data} />;
}

export default CommentListContainer;
