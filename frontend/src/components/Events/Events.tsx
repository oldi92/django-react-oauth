import { useEffect, useMemo } from "react";
import {
  Avatar,
  Divider,
  List,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Skeleton,
  IconButton,
  Button,
} from "@mui/material";
import { Delete, Event } from "@mui/icons-material";
import dayjs from "dayjs";

import { MainLayout } from "../../layouts";
import { useAuthentication } from "../../hooks";
import {
  useEventsQuery,
  useSocialAccountDisconnectMutation,
  useSocialAccountsQuery,
} from "../../services";
import { ReactComponent as GoogleCalendarIcon } from "../../assets/google-calendar.svg";
import styled from "@emotion/styled";
import { GoogleLogin } from "../GoogleLogin";
import axios from "axios";

const Container = styled.div`
  max-width: 700px;
  margin-top: 0.5rem;
`;

export const Events = () => {
  const { data, isLoading, isSuccess, error, refetch } = useEventsQuery();
  const { data: socialAccountsData } = useSocialAccountsQuery();
  const { mutate: socialAccountDisconnect } =
    useSocialAccountDisconnectMutation();
  const { isAuthenticated } = useAuthentication();
  const hasNoSocialAccount = useMemo(
    () => !!error?.response?.data.no_social_account,
    [error?.response?.data.no_social_account]
  );
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const createCalendar = (code: string) => {
    axios
      .post("http://localhost:8000/events/social-calendar/", { code })
      .then((res) => console.log("RES ", res))
      .catch((err) => console.log(err));
  };

  return (
    <MainLayout>
      <Typography sx={{ mb: 1 }} variant="h6">
        Upcoming Events
      </Typography>

      <Divider />

      <Stack sx={{ m: "1rem 0" }}>
        <Typography sx={{ mb: 3 }} variant="h6">
          Socials Accounts
        </Typography>

        {socialAccountsData?.data?.map((socialAccount: any) => (
          <Stack key={socialAccount.id} direction="row">
            <Box flex={1} sx={{ mr: 2 }}>
              {socialAccount.provider === "google" && <GoogleCalendarIcon />}
            </Box>

            <Stack flex={4} spacing={1}>
              <Typography>Google Calendar (connected)</Typography>

              <Typography variant="body2" color="text.secondary">
                Gmail, G Suite
              </Typography>
            </Stack>

            <Box flex={1} textAlign="end">
              <IconButton
                onClick={() => socialAccountDisconnect(socialAccount.id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Stack>
        ))}
      </Stack>

      <Divider />

      <Container>
        {hasNoSocialAccount && (
          <Card>
            <CardContent>
              <Stack direction="row">
                <Box flex={1} sx={{ mr: 2 }}>
                  <GoogleCalendarIcon />
                </Box>

                <Stack flex={4} spacing={1}>
                  <Typography>Google Calendar</Typography>

                  <Typography variant="body2" color="text.secondary">
                    Gmail, G Suite
                  </Typography>
                </Stack>

                <Box flex={1}>
                  {/* <GoogleLogin variant="calendar" /> */}
                  <GoogleLogin
                    variant="calendar"
                    redirectUri="http://localhost:3000/dashboard"
                    onOauthSuccess={(code) => {
                      createCalendar(code);
                    }}
                  />

                  {/* <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={createSocialCalendar}
                  >
                    Create Calendar
                  </Button> */}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <Stack>
            {[1, 2, 3].map((number) => (
              <Card key={number} sx={{ mb: 2 }}>
                <CardContent>
                  <Stack direction="row">
                    <Box sx={{ mr: 2 }}>
                      <Skeleton variant="circular" width={40} height={40} />
                    </Box>

                    <Stack spacing={1}>
                      <Skeleton width={200} />
                      <Skeleton variant="rounded" width={400} height={100} />
                      <Skeleton width={100} />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {isSuccess && (
          <List>
            {data?.data.items.map((event) => {
              const startDate = dayjs(event.start.dateTime);
              const starTime = startDate.format("MMMM D HH:mm, YYYY");

              return (
                <Card key={event.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Stack direction="row">
                      <Box sx={{ mr: 2 }}>
                        <Avatar>
                          <Event />
                        </Avatar>
                      </Box>

                      <Stack spacing={1}>
                        <Typography>{event.summary}</Typography>

                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {starTime}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </List>
        )}
      </Container>
    </MainLayout>
  );
};
