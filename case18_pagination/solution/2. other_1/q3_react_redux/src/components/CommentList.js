import React from "react";
import styled from "styled-components";

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

function CommentList({ data }) {
  return data.map((comment, index) => {
    /**
     * [!] React Component에서 `key` 값은 `index`로 바로 적용하지 않고, 유니크한 값으로 지정하는게 좋습니다.
     * 컴포넌트가 랜더링될때 같은 레벨의 형제(siblings) 컴포넌트와 중복된 `key` 값을 갖게되면 불필요한 랜더링이 발생할 수 있습니다..
     */
    const key = `comment_` + index;
    const {
      author,
      profile_url,
      createdAt,
      content
    } = comment;
    return (
      <Comment key={key}>
        <img src={profile_url} alt="" />
        {author}
        <CreatedAt>{createdAt}</CreatedAt>
        <Content>{content}</Content>
        <hr />
      </Comment>
    )
  });
}

export default CommentList;
