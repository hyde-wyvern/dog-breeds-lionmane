import {
    Card,
    CardContent,
    CardMedia,
    Chip,
    Typography,
    CardActions,
    Button,
    IconButton,
} from '@mui/material';
import { setFavorite } from '../features/api/breeds.slice';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubBreed } from '../types/breed';
import { AppDispatch, RootState } from '../app/store';
import { useEffect, useState } from 'react';

interface ElementCardProps {
    imageUrl: string;
    title: string;
    alt: string;
    displayChip: boolean;
    route: string;
    chipValue?: string;
    icon?: React.ReactElement;
}

export default function ElementCard(props: ElementCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const virtualSubBreed: SubBreed = {
        name: props.title,
        images: [props.imageUrl],
    };
    const favorite: SubBreed = useSelector(
        (state: RootState) => state.breeds.favorite
    );
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (favorite !== undefined) {
            if (favorite.name === props.title) setIsFavorite(true);
            else setFavorite(false);
        } else {
            setIsFavorite(false);
        }
    }, [favorite, props.title]);

    return (
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '100%',
                minHeight: '100px',
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                    component="img"
                    sx={{
                        height: 100,
                        width: 100,
                    }}
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
            </Box>
            <CardActions>
                <Button
                    onClick={() => {
                        navigate(`${props.route}${props.title}`, {
                            replace: true,
                        });
                    }}
                    size="small"
                    color="primary">
                    read more
                </Button>
                <IconButton
                    aria-label="favorite"
                    onClick={() => {
                        dispatch(
                            setFavorite({
                                favorite: virtualSubBreed,
                            })
                        );
                    }}>
                    {isFavorite === true ? (
                        <FavoriteIcon />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
            </CardActions>
        </Card>
    );
}
