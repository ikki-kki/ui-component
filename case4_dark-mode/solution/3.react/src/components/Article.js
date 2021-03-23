import styled from 'styled-components';

const Article = styled.article`
  width: 960px;
  margin: 50px auto 0;
  font-size: 1.5em;
  color: ${({ theme }) => theme.articleColor};
`;

export default Article;
