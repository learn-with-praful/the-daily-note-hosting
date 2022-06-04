import { AppBar, Avatar, Container, Toolbar, Typography } from "@mui/material";
import { RootContext } from "Context/TheNoteContext";
import React, { useContext } from "react";
import { getUserInfoFromLocalStorage } from "Utils/Utils";

export default function Header() {
  const { userDetail } = useContext(RootContext);

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography>The Note</Typography>
          <Avatar src={userDetail?.profileObj?.imageUrl} />
          <h5>{userDetail?.profileObj?.name}</h5>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
