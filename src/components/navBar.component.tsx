import { AppBar, Box, SvgIcon, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppLogo from '../resources/dog';

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <div>
            <AppBar position="static" sx={{ height: '6%' }}>
                <Toolbar>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: '150px',
                            userSelect: 'none',
                        }}
                        onClick={() =>
                            navigate(`/`, {
                                replace: true,
                            })
                        }>
                        <SvgIcon component={AppLogo} />
                        <Typography variant="h6"> Dog.io </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}
