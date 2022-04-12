import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

interface BreedCardProps {
    name: string;
    subBreeds: number;
    imageUrl?: string;
}

export default function BreedCard(props: BreedCardProps) {
    return (
        <Card sx={{ display: 'flex', height: 100 }}>
            <CardMedia
                component="img"
                sx={{ width: 100, height: 100 }}
                image={props.imageUrl}
                alt={`${props.name} dog`}
            />
            <CardContent>
                <Typography variant="subtitle1">{props.name}</Typography>
                <Chip
                    icon={<PetsIcon />}
                    label={`Sub-breeds: ${props.subBreeds}`}></Chip>
            </CardContent>
        </Card>
    );
}
