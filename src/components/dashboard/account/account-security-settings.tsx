import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { truncate, update } from "lodash";
import { FC, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "src/hooks/use-auth";
import { useEntity } from "src/hooks/use-entity";
import { Scrollbar } from "../../scrollbar";

export const AccountSecuritySettings: FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { updateEntity } = useEntity("user");
  const { find, entities } = useEntity("session");
  const { user } = useAuth();
  const [password, setPassword] = useState("asdasdasd");

  const handleEdit = async (): Promise<void> => {
    if (isEditing) {
      await updateEntity(user?._id, { password });
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    find({ user: user?._id }, {});
  }, [user]);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Change password</Typography>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  disabled={!isEditing}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    ...(!isEditing && {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dotted",
                      },
                    }),
                  }}
                />
                <Button onClick={handleEdit}>
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6">Login history</Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
            Your recent login activity:
          </Typography>
        </CardContent>
        <Scrollbar>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>Login type</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Client</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entities?.data?.map(
                (data: {
                  ipAddress: string;
                  loginType: string;
                  userAgent: string;
                  _id: string;
                  createdAt: string;
                }) => {
                  return (
                    <TableRow key={data._id}>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {data.loginType}
                        </Typography>
                        <Typography color="body2" variant="body2">
                          on{" "}
                          {format(
                            new Date(data.createdAt),
                            "dd-MM-yyyy' 'hh:mm a"
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>{data.ipAddress}</TableCell>
                      <TableCell>
                        {truncate(data.userAgent, {
                          length: 50,
                        })}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
    </>
  );
};
