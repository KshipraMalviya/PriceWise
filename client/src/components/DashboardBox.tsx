import {Box} from "@mui/material"
import { grey } from "@mui/material/colors";
import {styled} from "@mui/system"

const DashboardBox = styled(Box)(({theme}) => ({
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0.15rem 0.15rem 0.15rem 0.15rem #d6d6d6",
    overflow: "hidden"
}))

export default DashboardBox;