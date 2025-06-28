// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list"; // ✅ Add this line
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "@fullcalendar/core";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { tokens, useMode } from "./theme";

const Calendars = () => {
  const [theme] = useMode(); // فقط لاستخراج الألوان
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);


   useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    setCurrentEvents(savedEvents);
  }, []);

  // 🟢 تحديث الأحداث فـ state و localStorage
  const updateEvents = (events) => {
    setCurrentEvents(events);
    localStorage.setItem(
      "calendarEvents",
      JSON.stringify(
        events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          allDay: event.allDay,
        }))
      )
    );
  };

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(`Are you sure you want to delete the event "${selected.event.title}"?`)
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
                {/* ✅ قائمة الأحداث الجانبية */}

        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[500]}
          color={colors.grey[100]}
          p="15px"
          borderRadius="8px"
          boxShadow={3}
        >
          <Typography variant="h5" >
            Events
          </Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[600],
                  color: colors.grey[100],
                  margin: "10px 0",
                  borderRadius: "6px",
                  padding: "8px 12px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography variant="body2" color={colors.grey[100]}>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* ✅ التقويم الرئيسي */}

        <Box
          flex="1 1 100%"
          ml="15px"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          padding="10px"
          boxShadow={3}
        >
          <FullCalendar
            height="75vh"
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]} // ✅ listPlugin included
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
                        events={currentEvents} // 🔁 تحميل الأحداث من state

                   eventsSet={(events) => {
              // نعطي شكل موحد للأحداث لنتجنب التحديث اللانهائي
              const normalizedEvents = events.map((e) => ({
                id: e.id,
                title: e.title,
                start: e.startStr,
                end: e.endStr,
                allDay: e.allDay,
              }));

              const currentNormalized = currentEvents.map((e) => ({
                id: e.id,
                title: e.title,
                start: e.start,
                end: e.end,
                allDay: e.allDay,
              }));

              if (JSON.stringify(normalizedEvents) !== JSON.stringify(currentNormalized)) {
                updateEvents(normalizedEvents);
              }
            }}
            eventColor={colors.primary[300]}
            // initialEvents={
            //     [
            //         {id:'1234',title:"All-day event", date:"2025-06-04"},
            //         {id:'4321',title:"Timed event", date:"2025-06-28"},
            //     ]

            // }

          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendars;
