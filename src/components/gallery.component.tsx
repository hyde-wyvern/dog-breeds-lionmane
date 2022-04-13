import { Box, ImageList } from '@mui/material';
import React, { useState } from 'react';
import GalleryNavigationButton from './galleryButton.component';

interface GalleryProps {
    width: number;
    height: number;
    imageCollection: string[];
}
export default function Gallery(props: GalleryProps) {
    const [targetImage, setTargetImage] = useState(0);
    const displayHeight: number = Math.floor(props.height * 0.8);
    const navigatorHeight: number = Math.floor(props.height * 0.2);

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: `${props.width}px`,
                    minHeight: `${displayHeight}px`,
                }}>
                <img
                    style={{
                        maxHeight: `${displayHeight}px`,
                        maxWidth: `${props.width}px`,
                    }}
                    src={`${props.imageCollection[targetImage]}?fit=crop&auto=format&dpr=2 2x`}
                    alt=""
                />
            </Box>
            <ImageList
                sx={{
                    width: `${props.width}`,
                    height: `${navigatorHeight}`,
                }}
                variant="quilted"
                cols={3}
                rowHeight={navigatorHeight}>
                {props.imageCollection.map((image: string, index: number) => {
                    const isSelected = index === targetImage ? true : false;
                    return (
                        <GalleryNavigationButton
                            key={index}
                            imageUrl={image}
                            handleClick={() => {
                                setTargetImage(index);
                            }}
                            isSelected={isSelected}
                        />
                    );
                })}
            </ImageList>
        </React.Fragment>
    );
}
