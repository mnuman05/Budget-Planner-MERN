import {
  Box,
  Drawer,
  List,
  ListItemButton,
  styled,
  Tooltip,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollBar from "simplebar-react";
import topMenuList from "./topMenuList";

interface SideNavBarProps {
  showMobileSideBar: boolean;
  closeMobileSideBar: () => void;
}

const MainMenu = styled(Box)(({ theme }) => ({
  left: 0,
  width: 80,
  height: "100%",
  position: "fixed",
  boxShadow: theme.shadows[2],
  transition: "left 0.3s ease",
  zIndex: theme.zIndex.drawer + 11,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: { left: -80 },
  "& .simplebar-track.simplebar-vertical": { width: 7 },
  "& .simplebar-scrollbar:before": {
    background: theme.palette.text.primary,
  },
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  marginBottom: "1rem",
  justifyContent: "center",
  "&:hover": { backgroundColor: "transparent" },
}));

const DashboardSideBar: FC<SideNavBarProps> = ({
  showMobileSideBar,
  closeMobileSideBar,
}) => {
  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");

  const handleActiveMainMenu = (menuItem: any) => () => {
    setActive(menuItem.title);

    navigate(menuItem.path);
    closeMobileSideBar();
  };

  const mainSideBarContent = (
    <List sx={{ height: "100%" }}>
      <StyledListItemButton disableRipple>
        <img src="/static/logo/logo.svg" alt="UKO Logo" width={31} />
      </StyledListItemButton>

      <ScrollBar style={{ maxHeight: "calc(100% - 50px)" }}>
        {topMenuList.map((nav, index) => (
          <Tooltip title={nav.title} placement="right" key={index}>
            <StyledListItemButton
              disableRipple
              onClick={handleActiveMainMenu(nav)}
            >
              <nav.Icon
                sx={{
                  color:
                    active === nav.title ? "primary.main" : "secondary.400",
                }}
              />
            </StyledListItemButton>
          </Tooltip>
        ))}
      </ScrollBar>
    </List>
  );

  const drawerSideBarContent = (
    <List sx={{ height: "100%" }}>
      <StyledListItemButton disableRipple>
        <img src="/static/logo/logo.svg" alt="UKO Logo" width={31} />
      </StyledListItemButton>

      <ScrollBar style={{ maxHeight: "calc(100% - 50px)" }}>
        {topMenuList.map((nav, index) => (
          <Tooltip title={nav.title} placement="right" key={index}>
            <StyledListItemButton
              disableRipple
              onClick={handleActiveMainMenu(nav)}
            >
              <nav.Icon
                sx={{
                  color:
                    active === nav.title ? "primary.main" : "secondary.400",
                }}
              />
              <div className="" style={{ marginLeft: '15px' }}>{nav.title}</div>
            </StyledListItemButton>
          </Tooltip>
        ))}
      </ScrollBar>
    </List>
  );


  if (showMobileSideBar) {
      return (
        <Drawer
          anchor="left"
          open={showMobileSideBar}
          onClose={closeMobileSideBar}
          PaperProps={{ sx: { width: 150 } }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              width: "inherit",
              position: "fixed",
              overflow: "hidden",
              flexDirection: "column"
            }}
          >
            {drawerSideBarContent}
          </Box>
        </Drawer>
      );
  }

  return <MainMenu>{mainSideBarContent}</MainMenu>;
};

export default DashboardSideBar;
