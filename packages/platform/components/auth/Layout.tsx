import { FC } from "react"
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import WavesDown from "../common/WavesDown";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://demandcluster.com">
                Demandcluster
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Layout: FC = ({ children }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            flex={1}
            position="relative"
            sx={{
                background: `linear-gradient(90deg,#274093,#45c1f1)`
            }}>
            <Box
                width="100%"
                flex={1}
            >
                {children}
            </Box>
            <WavesDown />
            <Box bgcolor={"common.white"}>
                <Copyright sx={{ my: 4 }} />
            </Box>
        </Box>
    );
}

export default Layout;