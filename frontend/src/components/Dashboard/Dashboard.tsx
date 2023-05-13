import { useEffect, useState } from "react";

// dependencies
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { Delete, Event } from "@mui/icons-material";
import dayjs from "dayjs";
import { useAuthentication } from "../../hooks";
import {
  useDeleteGoogleCalendar,
  useEventsQuery,
  useGoogleCalendar,
} from "../../services";
import styled from "@emotion/styled";
import axios from "axios";

// components
import { GoogleLogin } from "../GoogleLogin";
import { MainLayout } from "../../layouts";
import { ReactComponent as GoogleCalendarOldIcon } from "../../assets/google-calendar-old.svg";
import { ReactComponent as GoogleCalendarIcon } from "../../assets/google-calendar.svg";

const Container = styled.div`
  max-width: 700px;
  margin-top: 0.5rem;
`;

const Live = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: green;
  display: inline-block;
  margin-left: 8px;
`;

export const Dashboard = () => {
  const { isAuthenticated, user } = useAuthentication();
  const { data, isLoading, isSuccess, refetch } = useEventsQuery();
  const {
    data: googleCalendarData,
    isError: googleCalendarIsError,
    refetch: googleCalendarRefetch,
  } = useGoogleCalendar(user.pk);
  const {
    mutate: deleteGoogleCalendar,
    isLoading: deleteGoogleCalendarIsLoading,
  } = useDeleteGoogleCalendar();
  const [connectCalendarLoading, setConnectCalendarLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const handleConnectGoogleCalendar = async (code: string) => {
    try {
      setConnectCalendarLoading(true);

      await axios.post("http://localhost:8000/integrations/google-calendar/", {
        code,
      });
      googleCalendarRefetch();
      refetch();
    } catch (error) {
      console.log("ERROR ", error);
    } finally {
      setConnectCalendarLoading(false);
    }
  };

  const handleDeleteGoogleCalendar = (googleCalendarId: number) => {
    deleteGoogleCalendar(googleCalendarId, {
      onSuccess: () => googleCalendarRefetch(),
    });
  };

  return (
    <MainLayout>
      <Stack mb={4}>
        <Typography sx={{ mb: 1 }} variant="h6">
          Calendar Connection
        </Typography>

        <Divider />

        <Stack mt={2}>
          {googleCalendarData && !googleCalendarIsError ? (
            <Card>
              <CardContent>
                <Stack direction="row">
                  <Box flex={1} sx={{ mr: 2 }}>
                    <GoogleCalendarIcon />
                  </Box>

                  <Stack flex={4} spacing={1}>
                    <Stack direction="row" alignItems="center">
                      <Typography>Google Calendar</Typography>

                      <Live />
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      Gmail, G Suite (connected)
                    </Typography>
                  </Stack>

                  <Stack
                    flex={1}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Box>
                      {deleteGoogleCalendarIsLoading ? (
                        <CircularProgress size={24} />
                      ) : (
                        <IconButton
                          onClick={() =>
                            handleDeleteGoogleCalendar(
                              googleCalendarData.data.id
                            )
                          }
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Stack direction="row">
                  <Box flex={1} sx={{ mr: 2 }}>
                    <GoogleCalendarOldIcon />
                  </Box>

                  <Stack flex={4} spacing={1}>
                    <Typography>Google Calendar</Typography>

                    <Typography variant="body2" color="text.secondary">
                      Gmail, G Suite
                    </Typography>
                  </Stack>

                  <Box flex={1}>
                    <GoogleLogin
                      variant="calendar"
                      loading={connectCalendarLoading}
                      redirectUri="http://localhost:3000/dashboard"
                      onOauthSuccess={(code) => {
                        handleConnectGoogleCalendar(code);
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Stack>

      <Stack>
        <Typography sx={{ mb: 1 }} variant="h6">
          Upcoming Events
        </Typography>

        <Divider />
      </Stack>

      <Container>
        {!googleCalendarData && (
          <Alert severity="info">
            You don't have connected Google Calendar!
          </Alert>
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
