import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { CLIENT_ID, CLIENT_SECRET, DOMAIN } from "./config";
import axios from "axios";
import { useState } from "react";

interface User {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialize, setInitialize] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      setInitialize(true);
      setError("");

      const token: any = localStorage.getItem("token");
      const tokenSerialize = JSON.parse(token);
      console.log("TOKEN ", tokenSerialize);

      const config = {
        headers: { Authorization: `Bearer ${tokenSerialize.access_token}` },
      };

      const response = await axios.get(DOMAIN + "users/", config);
      setUsers(response.data);

      console.log("RESPONSE ", response);
    } catch (error: any) {
      setError(error.response.data.detail);
      console.log("ERROR ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button sx={{ mt: 4 }} variant="contained" onClick={getUsers}>
        Fetch Users
      </Button>

      <div style={{ marginTop: 32 }}>
        {loading && <CircularProgress />}

        {!!error && (
          <Alert sx={{ width: 420 }} severity="error">
            {error}
          </Alert>
        )}

        {!!users.length && (
          <Stack sx={{ textAlign: "left" }} spacing={2}>
            {users.map((user) => (
              <Card>
                <CardContent>
                  <div>Username: {user.username}</div>
                  <div>Email: {user.email}</div>
                </CardContent>
              </Card>
            ))}
            {/* <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card> */}
          </Stack>
        )}

        {initialize && !users.length && <div>You have not users yet.</div>}

        {!initialize && !users.length && <div>Please fetch the users.</div>}
      </div>
    </div>
  );
};

export default Users;
