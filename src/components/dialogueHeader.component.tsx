import { Box, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';

interface DialogHeaderProps {
    title: string;
    handleClose?: () => void;
    handleFavorite?: () => void;
}
export default function DialogHeader(props: DialogHeaderProps) {
    return (
        <React.Fragment>
            <DialogTitle
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'start',
                    }}>
                    <div>{props.title}</div>
                    <IconButton
                        aria-label="favorite"
                        onClick={props.handleFavorite}>
                        <FavoriteIcon />
                    </IconButton>
                </Box>
                <IconButton onClick={props.handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
        </React.Fragment>
    );
}
