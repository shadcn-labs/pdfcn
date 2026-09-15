import { Document, Page, StyleSheet, View } from "@formepdf/react";

import { Section } from "@/registry/bases/forme/components/section/section";
import { Text } from "@/registry/bases/forme/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/forme/components/theme-provider";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { EventAgendaProps, Session } from "./event-agenda.types";
import { sampleEventAgendaData } from "./event-agenda.types";

interface TimeSlotGroup {
  sessions: Session[];
  time: string;
}

const groupSessionsByTime = (sessions: Session[]): TimeSlotGroup[] => {
  const groups: TimeSlotGroup[] = [];
  const map = new Map<string, Session[]>();

  for (const session of sessions) {
    const existing = map.get(session.time);
    if (existing) {
      existing.push(session);
    } else {
      const list = [session];
      map.set(session.time, list);
      groups.push({ sessions: list, time: session.time });
    }
  }

  return groups;
};

export const EventAgendaContent = ({ data }: { data: EventAgendaProps }) => {
  const theme = usePdfcnTheme();
  const accent = data.accentColor ?? theme.colors.primary;

  const trackColorMap = new Map<string, string>();
  if (data.tracks) {
    for (const track of data.tracks) {
      trackColorMap.set(track.name.toLowerCase(), track.color);
    }
  }

  const styles = StyleSheet.create({
    breakBadge: {
      backgroundColor: theme.colors.muted,
      borderColor: theme.colors.border,
      borderRadius: 4,
      borderStyle: "solid",
      borderWidth: 1,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    breakCard: {
      backgroundColor: theme.colors.muted,
      borderColor: theme.colors.border,
      borderRadius: 6,
      borderStyle: "dashed",
      borderWidth: 1,
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    dayBanner: {
      alignItems: "center",
      backgroundColor: theme.colors.muted,
      borderColor: theme.colors.border,
      borderRadius: 6,
      borderStyle: "solid",
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      marginTop: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    footerContainer: {
      borderTopColor: theme.colors.border,
      borderTopStyle: "solid",
      borderTopWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: "auto",
      paddingTop: 8,
    },
    headerContainer: {
      borderBottomColor: theme.colors.border,
      borderBottomStyle: "solid",
      borderBottomWidth: 1.5,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: 10,
    },
    legendContainer: {
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginBottom: 8,
    },
    legendDot: {
      borderRadius: 3,
      height: 7,
      marginRight: 4,
      width: 7,
    },
    legendItem: {
      alignItems: "center",
      backgroundColor: theme.colors.muted,
      borderColor: theme.colors.border,
      borderRadius: 4,
      borderStyle: "solid",
      borderWidth: 1,
      flexDirection: "row",
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    pageContent: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    roomBadge: {
      backgroundColor: theme.colors.muted,
      borderColor: theme.colors.border,
      borderRadius: 3,
      borderStyle: "solid",
      borderWidth: 1,
      paddingHorizontal: 5,
      paddingVertical: 1,
    },
    sessionCard: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderRadius: 6,
      borderStyle: "solid",
      borderWidth: 1,
      flex: 1,
      flexDirection: "column",
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    sessionsRow: {
      flex: 1,
      flexDirection: "row",
      gap: 8,
    },
    timeBox: {
      alignItems: "flex-start",
      flexDirection: "column",
      paddingTop: 2,
      width: 78,
    },
    timeSlotRow: {
      flexDirection: "row",
      marginBottom: 8,
    },
    trackBadge: {
      borderRadius: 3,
      paddingHorizontal: 6,
      paddingVertical: 1,
    },
  });

  return (
    <Document title={`${data.eventName} - Agenda`}>
      {data.days.map((day, dayIndex) => {
        const timeSlots = groupSessionsByTime(day.sessions);

        return (
          <Page
            key={day.label}
            size="A4"
            margin={{ bottom: 32, left: 32, right: 32, top: 32 }}
          >
            <View style={styles.pageContent as never}>
              {/* Header */}
              <View style={styles.headerContainer as never}>
                <View style={{ flex: 1, paddingRight: 16 } as never}>
                  <Text
                    style={{
                      color: accent,
                      fontSize: 8.5,
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                      marginBottom: 2,
                      textTransform: "uppercase",
                    }}
                    noMargin
                  >
                    Event Agenda
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                    noMargin
                  >
                    {data.eventName}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.mutedForeground,
                      fontSize: 8.5,
                    }}
                    noMargin
                  >
                    {data.date}
                    {data.endDate ? ` – ${data.endDate}` : ""} • {data.venue}
                  </Text>
                </View>

                <View
                  style={
                    {
                      alignItems: "flex-end",
                      justifyContent: "center",
                    } as never
                  }
                >
                  <View
                    style={
                      {
                        backgroundColor: accent,
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      } as never
                    }
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 10,
                        fontWeight: "bold",
                        letterSpacing: 0.8,
                        textTransform: "uppercase",
                      }}
                      noMargin
                    >
                      AGENDA
                    </Text>
                  </View>
                </View>
              </View>

              {/* Day Title Banner */}
              <View style={styles.dayBanner as never}>
                <View
                  style={
                    {
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 6,
                    } as never
                  }
                >
                  <Text style={{ fontSize: 11, fontWeight: "bold" }} noMargin>
                    {day.label}
                  </Text>
                  <Text
                    style={{ color: theme.colors.mutedForeground, fontSize: 9 }}
                    noMargin
                  >
                    — {day.date}
                  </Text>
                </View>

                <Text
                  style={{
                    color: theme.colors.mutedForeground,
                    fontSize: 8.5,
                    fontWeight: 600,
                  }}
                  noMargin
                >
                  Day {dayIndex + 1} of {data.days.length}
                </Text>
              </View>

              {/* Track Legend (if available) */}
              {data.tracks && data.tracks.length > 0 && (
                <View style={styles.legendContainer as never}>
                  <Text
                    style={{
                      color: theme.colors.mutedForeground,
                      fontSize: 7.5,
                      fontWeight: "bold",
                      letterSpacing: 0.5,
                      marginRight: 4,
                      textTransform: "uppercase",
                    }}
                    noMargin
                  >
                    Tracks:
                  </Text>
                  {data.tracks.map((track) => (
                    <View key={track.name} style={styles.legendItem as never}>
                      <View
                        style={
                          [
                            styles.legendDot,
                            { backgroundColor: track.color },
                          ] as never
                        }
                      />
                      <Text style={{ fontSize: 7.5, fontWeight: 600 }} noMargin>
                        {track.name}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Sessions Time Grid */}
              <Section style={{ marginTop: 2 }}>
                {timeSlots.map((slot) => {
                  const isSingleBreak =
                    slot.sessions.length === 1 && slot.sessions[0].isBreak;

                  return (
                    <View key={slot.time} style={styles.timeSlotRow as never}>
                      {/* Time Column */}
                      <View style={styles.timeBox as never}>
                        <Text
                          style={{
                            color: theme.colors.foreground,
                            fontSize: 9,
                            fontWeight: "bold",
                          }}
                          noMargin
                        >
                          {slot.time}
                        </Text>
                        {slot.sessions[0].endTime && (
                          <Text
                            style={{
                              color: theme.colors.mutedForeground,
                              fontSize: 7.5,
                            }}
                            noMargin
                          >
                            to {slot.sessions[0].endTime}
                          </Text>
                        )}
                      </View>

                      {/* Content Column */}
                      {isSingleBreak ? (
                        <View style={styles.breakCard as never}>
                          <View
                            style={
                              {
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              } as never
                            }
                          >
                            <Text
                              style={{
                                color: theme.colors.foreground,
                                fontSize: 9.5,
                                fontWeight: "bold",
                              }}
                              noMargin
                            >
                              {slot.sessions[0].title}
                            </Text>
                            <View style={styles.breakBadge as never}>
                              <Text
                                style={{
                                  color: theme.colors.mutedForeground,
                                  fontSize: 7,
                                  fontWeight: "bold",
                                  letterSpacing: 0.5,
                                  textTransform: "uppercase",
                                }}
                                noMargin
                              >
                                Break
                              </Text>
                            </View>
                          </View>
                          {slot.sessions[0].description && (
                            <Text
                              style={{
                                color: theme.colors.mutedForeground,
                                fontSize: 7.5,
                                marginTop: 2,
                              }}
                              noMargin
                            >
                              {slot.sessions[0].description}
                            </Text>
                          )}
                        </View>
                      ) : (
                        <View style={styles.sessionsRow as never}>
                          {slot.sessions.map((session, sIndex) => {
                            const trackColor = session.track
                              ? trackColorMap.get(session.track.toLowerCase())
                              : undefined;

                            return (
                              <View
                                key={`${session.title}-${sIndex}`}
                                style={
                                  [
                                    styles.sessionCard,
                                    trackColor
                                      ? {
                                          borderLeftColor: trackColor,
                                          borderLeftWidth: 3,
                                        }
                                      : {},
                                  ] as never
                                }
                              >
                                {/* Track & Room Metadata */}
                                <View
                                  style={
                                    {
                                      alignItems: "center",
                                      flexDirection: "row",
                                      gap: 4,
                                      marginBottom: 3,
                                    } as never
                                  }
                                >
                                  {session.track && (
                                    <View
                                      style={
                                        [
                                          styles.trackBadge,
                                          {
                                            backgroundColor: trackColor
                                              ? `${trackColor}1A`
                                              : theme.colors.muted,
                                          },
                                        ] as never
                                      }
                                    >
                                      <Text
                                        style={{
                                          color:
                                            trackColor ??
                                            theme.colors.foreground,
                                          fontSize: 7,
                                          fontWeight: "bold",
                                        }}
                                        noMargin
                                      >
                                        {session.track}
                                      </Text>
                                    </View>
                                  )}
                                  {session.room && (
                                    <View style={styles.roomBadge as never}>
                                      <Text
                                        style={{
                                          color: theme.colors.mutedForeground,
                                          fontSize: 7,
                                          fontWeight: 600,
                                        }}
                                        noMargin
                                      >
                                        {session.room}
                                      </Text>
                                    </View>
                                  )}
                                </View>

                                {/* Title */}
                                <Text
                                  style={{
                                    fontSize: 9,
                                    fontWeight: "bold",
                                    lineHeight: 1.25,
                                  }}
                                  noMargin
                                >
                                  {session.title}
                                </Text>

                                {/* Speaker */}
                                {session.speaker && (
                                  <Text
                                    style={{
                                      color: accent,
                                      fontSize: 7.8,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                    noMargin
                                  >
                                    {session.speaker}
                                  </Text>
                                )}

                                {/* Description */}
                                {session.description && (
                                  <Text
                                    style={{
                                      color: theme.colors.mutedForeground,
                                      fontSize: 7.2,
                                      lineHeight: 1.2,
                                      marginTop: 2,
                                    }}
                                    noMargin
                                  >
                                    {session.description}
                                  </Text>
                                )}
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
                  );
                })}
              </Section>

              {/* Footer */}
              <View style={styles.footerContainer as never}>
                <View style={{ flexDirection: "column", gap: 1 } as never}>
                  {data.wifiInfo && (
                    <Text
                      style={{
                        color: theme.colors.mutedForeground,
                        fontSize: 7.5,
                        fontWeight: 600,
                      }}
                      noMargin
                    >
                      Wi-Fi: {data.wifiInfo}
                    </Text>
                  )}
                  {data.emergencyContact && (
                    <Text
                      style={{
                        color: theme.colors.mutedForeground,
                        fontSize: 7.2,
                      }}
                      noMargin
                    >
                      {data.emergencyContact}
                    </Text>
                  )}
                </View>

                <View style={{ alignItems: "flex-end" } as never}>
                  <Text
                    style={{
                      color: theme.colors.mutedForeground,
                      fontSize: 7.5,
                      fontWeight: 600,
                    }}
                    noMargin
                  >
                    Page {dayIndex + 1} of {data.days.length}
                  </Text>
                </View>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export const EventAgendaDocument = ({
  theme,
  data = sampleEventAgendaData,
}: {
  theme?: PdfcnTheme;
  data?: EventAgendaProps;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <EventAgendaContent data={data} />
  </PdfcnThemeProvider>
);

export { EventAgendaDocument as EventAgenda };
