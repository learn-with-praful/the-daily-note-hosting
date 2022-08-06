import { AppBar, Avatar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import useStore from "store";
import { getUserInfoFromLocalStorage } from "Utils/Utils";

export default function Header() {
  const userDetail = useStore((state) => state.userDetail);

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
