import styled from '@emotion/styled';
import React from 'react';

const ScrollableContainerStyled = styled.div`
    overflow-y: auto;
    justify-self: stretch;
    padding-bottom: 25px;
    padding-top: 10px;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`;

export default function ScrollableContainer(props: {
    children: React.ReactElement;
}) {
    return (
        <ScrollableContainerStyled>{props.children}</ScrollableContainerStyled>
    );
}
