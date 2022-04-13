import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import React from 'react';

interface ElementCardProps {
    imageUrl: string;
    title: string;
    alt: string;
    displayChip: boolean;
    chipValue?: string;
    icon?: React.ReactElement;
}

export default function ElementCard(props: ElementCardProps) {
    return (
        <Card sx={{ display: 'flex', height: 100 }}>
            <CardMedia
                component="img"
                sx={{ width: 100, height: 100 }}
                image={props.imageUrl}
                alt={props.alt}
            />
            <CardContent>
                <Typography variant="subtitle1">{props.title}</Typography>
                {props.displayChip && (
                    <Chip
                        icon={props.icon || <BrokenImageIcon />}
                        label={props.chipValue || 'undefined'}></Chip>
                )}
            </CardContent>
        </Card>
    );
}
