import React from 'react';
import { useParams } from 'react-router-dom';

export default function SubBreedView() {
    const { breed: targetBreed, subBreed: targetSubBreed } = useParams();
    return (
        <div>
            <span>Breed: {targetBreed}</span>
            <span>Sub-breed: {targetSubBreed}</span>
        </div>
    );
}
