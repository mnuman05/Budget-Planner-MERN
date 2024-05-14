import { Box, Grid, useTheme } from "@mui/material";
import { client } from "client";
import SaaSCard from "components/Dashboards/saas/Card";
import useTitle from "hooks/useTitle";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import { FC, useEffect, useState } from "react";

const SaaS: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [stats, setStats] = useState<any>([]);
  // change navbar title
  useTitle("Budget Planner");

  const theme = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await client.get("stats");
        setStats(response);

      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);
  
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
    </Box>
  );
};
export default SaaS;
