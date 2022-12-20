import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
const MoreAboutProjectCard = ({ listing }) => {
  return (
    <Card>
      <CardHeader title="Project Details" />
      <Divider />
      <PropertyList>
        {listing?.placeDescription?.map((desc) => {
          return (
            <PropertyListItem
              align="horizontal"
              label={desc.label}
              divider
              key={desc._id}
              value={desc.value}
            />
          );
        })}
      </PropertyList>
    </Card>
  );
};

export default MoreAboutProjectCard;
