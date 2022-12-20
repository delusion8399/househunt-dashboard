import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import DescriptionCard from "./description-card";
import MoreAboutProjectCard from "./more-about-project-card";
import OverviewCard from "./overview-card";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PropertyDetailsTabs({ listing }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!listing) return <Box>Loading..</Box>;

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview/Home" {...a11yProps(0)} />
          <Tab label="Description" {...a11yProps(1)} />
          <Tab label="More About Project" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverviewCard listing={listing} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DescriptionCard listing={listing} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MoreAboutProjectCard listing={listing} />
      </TabPanel>
    </Box>
  );
}
