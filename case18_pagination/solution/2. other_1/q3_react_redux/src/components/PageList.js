import React, { useCallback } from "react";
import styled from "styled-components";

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const PageButton = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  ${({ active }) =>
    active &&
    `
        background: gray;
        color: #fff;
  `}
  margin-right: 3px;
`;

/**
 * 버튼 컴포넌트를 재사용 가능할 수 있도록  입력되는 데이터 값의 연산을 제거하여 결합도, 복잡도를 낮춤
 */
function PaginationButtons({ buttonCount = 0, onClick, activeIndex = 0 }) {
  if (buttonCount === 0) {
    /**
     * 버튼이 존재하지 않는 경우
     */
    return null;
  }
  const $buttons = Array(buttonCount).fill().map((_, index) => {
    const key = `button_${index}`;
    return (
      <PageButton
        active={index === activeIndex}
        onClick={(e) => onClick(e, index)} key={key}>
        {index + 1}
      </PageButton>
    );
  })

  return <PageListStyle>{$buttons}</PageListStyle>;
}

export default PaginationButtons;
