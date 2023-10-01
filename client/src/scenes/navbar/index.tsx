import {useState} from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import FlexBetween from '@/components/FlexBetween'
import DiamondIcon from '@mui/icons-material/Diamond';

type Props = {}

const Navbar = (props: Props) => {
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem">
        <FlexBetween gap="0.75rem">
            <DiamondIcon sx={{fontSize: "28px"}}/>
            <Typography variant='h4' fontSize='16px' color={'black'}>PriceWise-ML</Typography>
        </FlexBetween>
        <FlexBetween gap="2rem">
            <Box sx={{"&:hover": {color: 'blue'}}}>
                <Link to='/' onClick={() => setSelected("dashboard")} style={{
                    color: selected === "dashboard" ? "inherit" : 'black', textDecoration: "inherit"
                }}>Dashboard
                </Link>
            </Box>
            <Box sx={{"&:hover": {color: 'blue'}}}>
                <Link to='/predictions' onClick={() => setSelected("predictions")} style={{
                    color: selected === "predictions" ? "inherit" : 'black', textDecoration: "inherit"
                }}>Predictions
                </Link>
            </Box>
        </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar
