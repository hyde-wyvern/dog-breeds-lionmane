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
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    return (
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '100%',
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
                <IconButton aria-label="favorite">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
