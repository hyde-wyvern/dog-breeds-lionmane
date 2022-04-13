import { Dialog, DialogContent } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { SubBreed } from '../types/breed';
import DialogHeader from './dialogueHeader.component';
import Gallery from './gallery.component';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface SubBreedModalProps {
    open: boolean;
    subBreed: SubBreed;
}

export default function SubBreedModal(props: SubBreedModalProps) {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Dialog open={props.open} TransitionComponent={Transition}>
                <DialogHeader
                    title={props.subBreed.name}
                    handleClose={() => {
                        navigate('?');
                    }}
                />
                <DialogContent>
                    <Gallery
                        width={500}
                        height={500}
                        imageCollection={props.subBreed.images}
                    />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
