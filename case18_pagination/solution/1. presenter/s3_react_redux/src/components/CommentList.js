import React from 'react';
import styled from "styled-components";

const Comment = styled.div`
    padding: 7px 10px;
    text-align : left;

	& > img {
        vertical-align : middle;
        margin-right : 10px;
        border-radius: 50%;
        width : 50px;
        height : 50px;
	}
`;


const CreatedAt = styled.div`
    float : right;
    vertical-align : middle;
`;

const Content = styled.div`
    margin : 10px 0;
`;

function CommentList({data}){
    return (
        data.map( (comment, key) => 

        <Comment key={key}>
            
            <img src={comment.profile_url} alt="" />
            
            {comment.author}
            

            <CreatedAt>
                {comment.createdAt}
            </CreatedAt>
            
            <Content>
                {comment.content}
            </Content>
            

            <hr />
        </Comment>
        
        )
    )
}

export default CommentList;