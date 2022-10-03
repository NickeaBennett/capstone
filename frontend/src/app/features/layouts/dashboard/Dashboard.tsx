import { Box, Stack } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import Feed from "../../feed/Feed"
import RightBar from "../rightbar/RightBar"
import SideBar from "../sidebar/SideBar"


function Dashboard() {
  const currentUser = useSelector((state: RootState) => state.session.currentUser)
  const accessToken = useSelector((state: RootState) => state.session.accessToken)
  const refreshToken = useSelector((state: RootState) => state.session.refreshToken)



  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar />
        <Feed />
        <RightBar />
      </Stack>
      <ul>
        <li>Current User
          <ul>
            <li>Id: {currentUser?.id}</li>
            <li>Email: {currentUser?.email}</li>
            <li>Role: {currentUser?.role}</li>
            <li>Created At: {currentUser?.createdAt}</li>
          </ul>
        </li>
        <li>Access Token: {accessToken}</li>
        <li>Refresh Token: {refreshToken}</li>
      </ul>
    </Box >
  )
}

export default Dashboard