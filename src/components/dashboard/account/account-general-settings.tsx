import { FC, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";
import { useAuth } from "src/hooks/use-auth";
import { useEntity } from "src/hooks/use-entity";
import useImageUpload from "src/hooks/use-image-upload";
import toast from "react-hot-toast";
import environments from "src/environments";

export const AccountGeneralSettings: FC = (props) => {
  const { user } = useAuth();
  const { uploadImages } = useImageUpload("/upload/images");
  const { updateEntity, findOne, entity } = useEntity("user");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [file, setFile] = useState<File[]>([]);
  const [editEmail, setEditEmail] = useState<boolean>(false);

  const baseUrlForAvatar = `${environments.HOST}/public/images/`;

  useEffect(() => {
    findOne(user?._id);
  }, [user]);

  useEffect(() => {
    if (entity) {
      setName(entity?.data?.name);
      setEmail(entity?.data?.email);
      setAvatar(`${baseUrlForAvatar}${entity?.data?.avatar}`);
    }
  }, [entity]);

  const handleImageSelect = async (e: any): Promise<void> => {
    setFile(e.target.files);
    try {
      const response = await uploadImages(e.target.files);

      await updateEntity(user._id, {
        avatar: response.data[0].name,
      });
      toast.success("Avatar updated");
    } catch (error) {
      console.log(error);
      toast.error("Avatar update failed");
    }
  };

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Avatar
                  src={file[0] ? URL.createObjectURL(file[0]) : avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button component="label">
                  Change
                  <input type="file" hidden onChange={handleImageSelect} />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Full Name"
                  value={name}
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  onClick={() => {
                    updateEntity(user._id, {
                      name,
                    });
                  }}
                >
                  Save
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  value={email}
                  disabled={!editEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderStyle: "dashed",
                    },
                  }}
                />
                <Button
                  onClick={async () => {
                    if (editEmail) {
                      setEditEmail(false);
                    } else setEditEmail(true);
                  }}
                >
                  {editEmail ? "Save" : "Edit"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Delete Account</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                Delete your account and all of your source data. This is
                irreversible.
              </Typography>
              <Button color="error" variant="outlined">
                Delete account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
