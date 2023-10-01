import { Box, useMediaQuery } from '@mui/material'
import Row1 from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'

const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d i f"
    "d i f"
    "d i h"
    "g i h"
    "g j h"
    "g j h"
    "g j h"
    "g j h"
    "g j h"
    "g j h"
    "g j h"
`
// i j
const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "f"
    "f"
    "f"
    "i"
    "i"
    "i"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "j"
    "j"
    "j"
`

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1200px)')
  return (
    <Box width='100%' height='100%' display='grid' gap='1.5rem'
    sx={
        isAboveMediumScreens ? {
        gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
        gridTemplateRows: "repeat(9, minmax(60px, 1fr))",
        gridTemplateAreas: gridTemplateLargeScreens,
    } : {
        gridAutoColumns: "1fr",
        gridAutoRows: "80px",
        gridTemplateAreas: gridTemplateSmallScreens,
    }
}
    >
      <Row1 />
      <Row2 />
      <Row3 />
      </Box>
  )
}

export default Dashboard