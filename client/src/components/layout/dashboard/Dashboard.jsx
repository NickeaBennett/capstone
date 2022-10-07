import { Box, Stack } from "@mui/material";
// import { useSelector } from "react-redux"
// import { RootState } from "../../../store"
import Feed from "../../feed/Feed";
// import FeedCard from "../../feed/FeedCard"
import RightBar from "../rightbar/RightBar";
import SideBar from "../sidebar/SideBar";

function Dashboard() {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar />
        <Feed />
        <RightBar />
      </Stack>
    </Box>
  );
}

export default Dashboard;
