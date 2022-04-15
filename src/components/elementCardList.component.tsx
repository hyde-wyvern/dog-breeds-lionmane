import { Stack } from '@mui/material';
import React, { ReactElement } from 'react';
import { Breed, SubBreed, FlattenUnion } from '../types/breed';
import ElementCard from './containers/elementCard.component';
import EmptyCard from './containers/emptyCard.component';

interface ElementCardListProps {
    collection: FlattenUnion<Breed | SubBreed>[];
    displayChip: boolean;
    route: string;
    action: string;
    icon?: ReactElement;
    emptyMessage?: string;
}

export default function ElementCardList(props: ElementCardListProps) {
    const cardCollection = [
        ...new Set(
            props.collection.map(
                (element: FlattenUnion<Breed | SubBreed>, index: number) => (
                    <ElementCard
                        key={element.name}
                        imageUrl={element.images[0]}
                        title={element.name}
                        alt={`${element.name} dog`}
                        displayChip={props.displayChip}
                        route={`${props.route}`}
                        chipValue={`${
                            element.subBreeds !== undefined
                                ? `Sub-breeds: ${element.subBreeds.length}`
                                : 'empty'
                        }`}
                        icon={props.icon}
                        actionButton={true}
                        favorite={true}
                        action={props.action}
                    />
                )
            )
        ),
    ];
    return (
        <React.Fragment>
            {cardCollection.length > 0 ? (
                <Stack spacing={1}>{cardCollection}</Stack>
            ) : (
                <EmptyCard
                    message={
                        props.emptyMessage !== undefined
                            ? props.emptyMessage
                            : 'Nothing to see here'
                    }
                />
            )}
        </React.Fragment>
    );
}
