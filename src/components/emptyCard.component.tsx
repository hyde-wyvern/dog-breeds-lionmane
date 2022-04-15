import styled from '@emotion/styled';
import { Box, Card, Typography } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import React from 'react';

const EmptyCardStyled = styled(Card)`
    background-color: #ffffff00;
    display: flex;
    max-width: 100%;
    min-height: 100px;
    box-shadow: 0px 0px 0px 0px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='lightsteelblue' stroke-width='3' stroke-dasharray='16%2c 4' stroke-dashoffset='7' stroke-linecap='butt'/%3e%3c/svg%3e");
`;

interface EmptyCardProps {
    message: string;
}

export default function EmptyCard(props: EmptyCardProps) {
    return (
        <EmptyCardStyled>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '25px',
                    maxHeight: '100px',
                    color: 'lightsteelblue',
                }}>
                <ErrorOutlineOutlinedIcon fontSize="large" />
                <Typography sx={{ marginLeft: '25px' }}>
                    {props.message}
                </Typography>
            </Box>
        </EmptyCardStyled>
    );
}
