import { ImageListItem } from '@mui/material';
import React from 'react';

interface GalleryNavigationButtonProps {
    imageUrl: string;
    isSelected: boolean;
    handleClick: () => void;
}
export default function GalleryNavigationButton(
    props: GalleryNavigationButtonProps
) {
    return (
        <ImageListItem>
            <img
                style={{
                    opacity: `${props.isSelected ? 0.5 : 1}`,
                }}
                src={props.imageUrl}
                alt=""
                onClick={() => {
                    !props.isSelected && props.handleClick();
                }}
            />
        </ImageListItem>
    );
}
