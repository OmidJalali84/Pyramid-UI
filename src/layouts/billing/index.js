/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import { Card, Stack, Grid } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import colors from "assets/theme/base/colors";

// Billing page components
import CreditBalance from "./components/CreditBalance";
import GreenLightning from "assets/images/shapes/green-lightning.svg";
import CircularProgress from "@mui/material/CircularProgress";
import VuiTypography from "components/VuiTypography";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";

import WhiteLightning from "assets/images/shapes/white-lightning.svg";
import linearGradient from "assets/theme/functions/linearGradient";
import carProfile from "assets/images/shapes/car-profile.svg";

function StackDashboard() {
  const { gradients, info } = colors;

  const { cardContent } = gradients;

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Stack
        spacing="24px"
        background="#fff"
        justifyContent={"space-between"}
        sx={({ breakpoints }) => ({
          [breakpoints.up("sm")]: {
            flexDirection: "row",
            gap: "24px",
          },
          [breakpoints.up("md")]: {
            flexDirection: "culomn",
            gap: "24px",
          },
          [breakpoints.only("xl")]: {
            flexDirection: "culomn",
            gap: "24px",
          },
        })}
      >
        {/* <Grid width={"50%"}> */}
        <CreditBalance width={"50%"} title={"Staked Amount"} buttonTitle="Stake More" />
        {/* </Grid> */}
        <Grid sx={{ display: "flex", justifyContent: "center", width: "50%" }}>
          <VuiBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={({ breakpoints }) => ({
              [breakpoints.only("sm")]: {
                alignItems: "center",
              },
            })}
            alignItems="center"
          >
            <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress variant="determinate" value={60} size={170} color="info" />
              <VuiBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <VuiTypography color="white" variant="h2" mt="6px" fontWeight="bold" mb="4px">
                  68%
                </VuiTypography>
                <VuiTypography color="text" variant="caption">
                  Current Load
                </VuiTypography>
              </VuiBox>
            </VuiBox>
            <VuiBox
              display="flex"
              justifyContent="center"
              flexDirection="column"
              sx={{ textAlign: "center" }}
            >
              <VuiTypography color="white" variant="lg" fontWeight="bold" mb="2px" mt="18px">
                0h 58 min
              </VuiTypography>
              <VuiTypography color="text" variant="button" fontWeight="regular">
                Time to wihdraw
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        </Grid>
      </Stack>

      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white" mb="20px">
              Positions
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            <Grid
              container
              sx={({ breakpoints }) => ({
                spacing: "24px",
                display: "flex",
                justifyContent: "space-between",
                [breakpoints.only("sm")]: {
                  gap: "0px",
                  rowGap: "24px",
                },
                [breakpoints.up("md")]: {
                  gap: "24px",
                  ml: "50px !important",
                },
                [breakpoints.only("xl")]: {
                  gap: "12px",
                  mx: "auto !important",
                },
              })}
            >
              <SatisfactionRate amount={100} percentage={20} />
              <SatisfactionRate amount={50} percentage={80} />
              <SatisfactionRate amount={1000} percentage={10} />
            </Grid>{" "}
          </VuiBox>
        </Card>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default StackDashboard;
