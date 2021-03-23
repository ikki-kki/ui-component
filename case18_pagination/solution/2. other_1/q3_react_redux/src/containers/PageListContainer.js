import React, { useMemo } from "react";
import PaginationButtons from "../components/PageList";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  setCurrentPageIndex
} from "../store/modules/comments";

function PaginationContainer() {

  const {
    commentItems,
    maxPageItemCount,
    currentPageIndex } = useSelector(
      (state) => state.comments
    );
  const dispatch = useDispatch();
  const boundActionCreators = bindActionCreators({ setCurrentPageIndex }, dispatch);

  /**
   * 페이지 갯수
   */
  const buttonCount = useMemo(() => {
    return Math.ceil(commentItems.length / maxPageItemCount);
  }, [maxPageItemCount, commentItems]);

  /**
   * 현재 활성된 페이지
   */
  const activeIndex = useMemo(() => currentPageIndex, [currentPageIndex]);

  const handleClickPaginationButton = (_, index) => {
    boundActionCreators.setCurrentPageIndex(index);
  }

  return (
    <PaginationButtons
      buttonCount={buttonCount}
      activeIndex={activeIndex}
      onClick={handleClickPaginationButton}
    />
  );
}

export default PaginationContainer;
