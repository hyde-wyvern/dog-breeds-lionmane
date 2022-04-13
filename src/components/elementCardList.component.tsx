import { Stack } from '@mui/material';
import React, { ReactElement } from 'react';
import { Breed, SubBreed, FlattenUnion } from '../types/breed';
import ElementCard from './elementCard.component';

interface ElementCardListProps {
    collection: FlattenUnion<Breed | SubBreed>[];
    displayChip: boolean;
    route: string;
    icon?: ReactElement;
}

export default function ElementCardList(props: ElementCardListProps) {
    const cardList = props.collection.map(
        (element: FlattenUnion<Breed | SubBreed>, index: number) => (
            <ElementCard
                key={index}
                imageUrl={element.images[0]}
                title={element.name}
                alt={`${element.name} dog`}
                displayChip={props.displayChip}
                route={`${props.route}`}
                chipValue={`${
                    element.subBreeds !== undefined
                        ? `Sub-breeds: ${element.subBreeds.length}`
                        : 'hello'
                }`}
                icon={props.icon}
            />
        )
    );

    return (
        <React.Fragment>
            {cardList.length > 0 ? (
                <Stack spacing={1}>{cardList}</Stack>
            ) : (
                <div>Nothing to see here...</div>
            )}
        </React.Fragment>
    );
}
