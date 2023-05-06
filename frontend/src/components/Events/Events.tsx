import { useEffect } from "react";
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
} from "@mui/material";
import { Event } from "@mui/icons-material";
import dayjs from "dayjs";

import { MainLayout } from "../../layouts";
import { useAuthentication } from "../../hooks";
import { useEventsQuery } from "../../services";

export const Events = () => {
  const { data, isLoading, isSuccess, refetch } = useEventsQuery();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  console.log(data?.data.items);

  return (
    <MainLayout>
      <Typography sx={{ mb: 1 }} variant="h6">
        Upcoming Events
      </Typography>

      <Divider />

      {isLoading && (
        <Stack sx={{ mt: 1 }}>
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
        <List sx={{ mt: 1 }}>
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
    </MainLayout>
  );
};
