import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import parse from "html-react-parser";
import Divider from "@mui/material/Divider";

const DescriptionCard = ({ listing }) => {
  return (
    <Card>
      <CardHeader title={`About ${listing?.title}`} /> <Divider />
      <CardContent>{parse(listing?.description)}</CardContent>
    </Card>
  );
};

export default DescriptionCard;
