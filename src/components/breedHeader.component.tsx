import { Card, CardContent, Chip, Typography } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';
import PetsIcon from '@mui/icons-material/Pets';

interface BreedHeaderProps {
    title: string;
    imageUrl: string;
    displayChip: boolean;
    chipCount: number;
}

interface HeaderCardProps {
    url: string;
}

const HeaderCard = styled(Card)<HeaderCardProps>`
    max-width: 100;
    background-image: url(${(props) => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const HeaderTitle = styled(Typography)`
    font-size: 24pt;
    font-weight: 500;
    color: #ffff;
`;

const HeaderChip = styled(Chip)`
    background-color: #000000;
    color: #ffff;
    font-weight: 400;
`;
const HeaderOverlay = styled(CardContent)`
    background-color: #00000060;
    color: #ffff;
    min-height: 200px;
`;
export default function BreedHeader(props: BreedHeaderProps) {
    return (
        <React.Fragment>
            <HeaderCard url={props.imageUrl}>
                <HeaderOverlay>
                    <HeaderTitle>{props.title.toUpperCase()}</HeaderTitle>
                    {props.displayChip && (
                        <HeaderChip
                            label={`Sub-breeds: ${props.chipCount}`}
                            icon={<PetsIcon sx={{ fontSize: '12pt' }} />}
                        />
                    )}
                </HeaderOverlay>
            </HeaderCard>
        </React.Fragment>
    );
}
