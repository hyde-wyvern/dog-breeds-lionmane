import styled from '@emotion/styled';
import { AppBar, Box, SvgIcon, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppLogo from '../resources/dog';

const LogoStyled = styled(Box)`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 150px;
    user-select: none;

    &:hover {
        color: lightblue;
    }
`;

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <div>
            <AppBar position="static" sx={{ height: '6%' }}>
                <Toolbar>
                    <LogoStyled
                        onClick={() =>
                            navigate(`/`, {
                                replace: true,
                            })
                        }>
                        <SvgIcon component={AppLogo} />
                        <Typography variant="h6"> Dog.io </Typography>
                    </LogoStyled>
                </Toolbar>
            </AppBar>
        </div>
    );
}
