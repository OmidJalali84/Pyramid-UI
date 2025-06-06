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
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import colors from "assets/theme/base/colors";

import CreditBalance from "layouts/billing/components/CreditBalance";

import WhiteLightning from "assets/images/shapes/white-lightning.svg";
import linearGradient from "assets/theme/functions/linearGradient";
import carProfile from "assets/images/shapes/car-profile.svg";
import { IoCash, IoDocumentText } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoLogoBitcoin } from "react-icons/io5";

import LineChart from "examples/Charts/LineCharts/LineChart";
import { lineChartDataProfile1, lineChartDataProfile2 } from "variables/charts";
import { lineChartOptionsProfile2, lineChartOptionsProfile1 } from "variables/charts";

function PlanDashboard() {
  const { columns: prCols, rows: prRows } = projectsTableData;
  const { gradients, info } = colors;
  const { cardContent } = gradients;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack
        spacing="24px"
        background="#fff"
        sx={({ breakpoints }) => ({
          [breakpoints.up("sm")]: {
            flexDirection: "row",
            gap: "24px",
          },
          [breakpoints.up("md")]: {
            flexDirection: "row",
            gap: "24px",
          },
          [breakpoints.only("xl")]: {
            flexDirection: "row",
            gap: "24px",
          },
        })}
      >
        <CreditBalance width={"50%"} title={"Entry Amount"} buttonTitle="Upgrade Plan" />
        <Grid
          container
          sx={({ breakpoints }) => ({
            spacing: "24px",
            [breakpoints.only("sm")]: {
              columnGap: "0px",
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
          <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
            <VuiBox
              display="flex"
              p="18px"
              alignItems="center"
              sx={{
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                borderRadius: "20px",
                minHeight: "110px",
              }}
            >
              <VuiBox display="flex" flexDirection="column" mr="auto">
                <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                  Username
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="h4"
                  fontWeight="bold"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  163W/km
                </VuiTypography>
              </VuiBox>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: info.main,
                  borderRadius: "12px",
                  width: "56px",
                  height: "56px",
                }}
              >
                <IoDocumentText color="white" />
              </VuiBox>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
            <VuiBox
              display="flex"
              p="18px"
              alignItems="center"
              sx={{
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                borderRadius: "20px",
                minHeight: "110px",
              }}
            >
              <VuiBox display="flex" flexDirection="column" mr="auto">
                <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                  Total Reward
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="h4"
                  fontWeight="bold"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  163W/km
                </VuiTypography>
              </VuiBox>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: info.main,
                  borderRadius: "12px",
                  width: "56px",
                  height: "56px",
                }}
              >
                <IoCash color="white" />
              </VuiBox>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
            <VuiBox
              display="flex"
              p="18px"
              alignItems="center"
              sx={{
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                minHeight: "110px",
                borderRadius: "20px",
              }}
            >
              <VuiBox display="flex" flexDirection="column" mr="auto">
                <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                  Token Balance
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="h4"
                  fontWeight="bold"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  76%
                </VuiTypography>
              </VuiBox>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: info.main,
                  borderRadius: "12px",
                  width: "56px",
                  height: "56px",
                }}
              >
                <IoWallet color="white" />
              </VuiBox>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
            <VuiBox
              display="flex"
              p="18px"
              alignItems="center"
              sx={{
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                minHeight: "110px",
                borderRadius: "20px",
              }}
            >
              <VuiBox display="flex" flexDirection="column" mr="auto">
                <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                  Points
                </VuiTypography>
                <VuiTypography
                  color="white"
                  variant="h4"
                  fontWeight="bold"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  76%
                </VuiTypography>
              </VuiBox>
              <VuiBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: info.main,
                  borderRadius: "12px",
                  width: "56px",
                  height: "56px",
                }}
              >
                <IoWallet color="white" />
              </VuiBox>
            </VuiBox>
          </Grid>
        </Grid>
      </Stack>

      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              Projects table
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
            <Table columns={prCols} rows={prRows} />
          </VuiBox>
        </Card>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PlanDashboard;
