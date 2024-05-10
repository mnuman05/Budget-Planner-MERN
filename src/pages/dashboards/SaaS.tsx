import { Box, Grid, useTheme } from "@mui/material";
import axios from "axios";
import Analytics from "components/Dashboards/saas/Analytics";
import SaaSCard from "components/Dashboards/saas/Card";
import Footer from "components/Dashboards/saas/Footer";
import RecentOrders from "components/Dashboards/saas/RecentOrders";
import TopSelling from "components/Dashboards/saas/TopSelling";
import TotalSpent from "components/Dashboards/saas/TotalSpent";
import useTitle from "hooks/useTitle";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import WindowsLogoIcon from "icons/WindowsLogoIcon";
import { FC, useEffect, useState } from "react";

const SaaS: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [stats, setStats] = useState<any>([]);
  // change navbar title
  useTitle("Budget Planner");

  const theme = useTheme();

  const cardList = [
    {
      price: 574,
      Icon: BucketIcon,
      title: "All Spending",
      color: theme.palette.primary.main,
    },
    {
      price: 521,
      title: "Earnings",
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
    },
    {
      price: 684,
      Icon: WindowsLogoIcon,
      title: "Weekly revenue",
      color: theme.palette.primary.red,
    },
    {
      price: 321,
      Icon: PeopleIcon,
      title: "New Clients",
      color: theme.palette.primary.yellow,
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats");
        // const { totalTransactions, totalBanks, totalUsers }: any = response.data;
        setStats(response.data);

      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  console.log("stats-->", stats);
  

  return isLoading ? (
    <>"Loading"</>
  ) : (
    <Box pt={2} pb={4}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid item lg={3} xs={6}>
          <SaaSCard
            title={"Total Transaction"}
            Icon={EarningIcon}
            color={theme.palette.primary.purple}
            price={stats.totalTransactions}
          />
        </Grid>

        <Grid item lg={3} xs={6}>
          <SaaSCard
            title={"Total Banks"}
            Icon={BucketIcon}
            color={theme.palette.primary.main}
            price={stats.totalBanks}
          />
        </Grid>

        <Grid item lg={3} xs={6}>
          <SaaSCard
            title={"Total Users"}
            Icon={PeopleIcon}
            color={theme.palette.primary.yellow}
            price={stats.totalUsers}
          />
        </Grid>
      </Grid>

      {/* <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>

        <Grid item lg={8} md={7} xs={12}>
          <RecentOrders />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <TopSelling />
        </Grid>

        <Grid item xs={12}>
          <Footer imageLink="/static/illustration/sass-dashboard.svg" />
        </Grid>
      </Grid> */}
    </Box>
  );
};
export default SaaS;
