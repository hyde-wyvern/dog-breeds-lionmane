import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface SectionHeaderProps {
    title: string;
    icon?: React.ReactElement;
}

const StyledTitle = styled(Box)`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    margin: 10px 0px 15px 0px;
    color: #1a3669;
`;

export default function SectionHeader(props: SectionHeaderProps) {
    return (
        <StyledTitle>
            {props.icon}
            <Typography sx={{ fontWeight: '500', fontSize: '16pt' }}>
                {props.title}
            </Typography>
        </StyledTitle>
    );
}
