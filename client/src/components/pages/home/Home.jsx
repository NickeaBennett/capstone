import { useState, useEffect } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Sidebar from "../../layout/sidebar/Sidebar";
import Feed from "../../feed/Feed";
import Rightbar from "../../layout/rightbar/Rightbar";
import Add from "../../post/CreatePost";

function Home() {
  const [mode, setMode] = useState("light");
  const [user, setUser] = useState(null);

  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode} />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default Home;
