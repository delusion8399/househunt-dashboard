import { Stack, Card } from "@mui/material";
import { Box } from "@mui/system";
import FsLightbox from "fslightbox-react";
import { useState } from "react";
const PropertyLightBox = ({ images = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Card sx={{ my: 3 }}>
        <Stack>
          {images?.length > 0 && (
            <img
              src={`http://${images[0].url}`}
              alt={images[0].name}
              onClick={() => setIsOpen(!isOpen)}
              style={{ maxHeight: 700, borderRadius: 10 }}
            />
          )}
        </Stack>
      </Card>

      <FsLightbox
        toggler={isOpen}
        sources={images?.map((image) => `http://${image.url}`)}
      />
    </Box>
  );
};

export default PropertyLightBox;
