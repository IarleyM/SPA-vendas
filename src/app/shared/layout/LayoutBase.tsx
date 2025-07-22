import { Box, Input, Typography } from "@mui/material";

interface ILayoutBaseProps {
    Title: string,
    children?: React.ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ children, Title }) => {
    return (
        <Box>
            <Box height="100%">
                <Typography variant="h5">
                    {Title}
                </Typography>

                {children}
            </Box>
        </Box>
    )
}