import { Document, Page, StyleSheet, View } from "@formepdf/react";

import { PdfImage } from "@/registry/bases/forme/components/pdf-image/pdf-image";
import { PdfQRCode } from "@/registry/bases/forme/components/qrcode/qrcode";
import { Text } from "@/registry/bases/forme/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/forme/components/theme-provider";
import { resolveColor } from "@/registry/bases/forme/lib/resolve-color";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { EventTicketData } from "./event-ticket.types";

// Sample data — replace with your own props or data source
const sampleData: EventTicketData = {
  accentColor: "#52525b",
  address: "123 Main St, Las Vegas, NV",
  doorsOpen: "8:00 AM",
  eventDate: "May 15, 2026",
  eventName: "ShadCN Labs Conf",
  eventTime: "9:00 AM",
  logoUrl: "/favicon.png",
  organizer: "ShadCN Labs",
  seat: { number: "12", row: "3", section: "A" },
  socialLinks: [
    { platform: "X", url: "x.com/shadcn" },
    { platform: "Instagram", url: "instagram.com/shadcn" },
  ],
  terms: "Ticket is non-transferable. All sales final. No re-entry.",
  ticketNumber: "TKT-00142",
  ticketType: "VIP",
  venue: "Convention Center",
};

// Standard event ticket, 7" x 3.5", expressed in PDF points (72 dpi)
const TICKET_SIZE = { height: 252, width: 504 };

const STUB_WIDTH = 120;

const STRIPE_WIDTH = 8;

const NOTCH_RADIUS = 8;

// Forme renders neither dashed borders nor dashed SVG strokes, so the
// perforation is painted as a stack of short dashes along the stub seam.
const PERFORATION_WIDTH = 1.5;

const PERFORATION_DASH = 4;

const PERFORATION_GAP = 3;

const perforationOffsets: number[] = [];
for (
  let offset = 0;
  offset < TICKET_SIZE.height;
  offset += PERFORATION_DASH + PERFORATION_GAP
) {
  perforationOffsets.push(offset);
}

const hexRgb = (color: string): [number, number, number] | null => {
  const hex = color.trim().replace(/^#/, "");

  if (/^[0-9a-f]{3}$/i.test(hex)) {
    return [
      Number.parseInt(hex[0] + hex[0], 16),
      Number.parseInt(hex[1] + hex[1], 16),
      Number.parseInt(hex[2] + hex[2], 16),
    ];
  }

  if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(hex)) {
    return [
      Number.parseInt(hex.slice(0, 2), 16),
      Number.parseInt(hex.slice(2, 4), 16),
      Number.parseInt(hex.slice(4, 6), 16),
    ];
  }

  return null;
};

const inkOnAccent = (accent: string, light: string, dark: string) => {
  const rgb = hexRgb(accent);

  if (!rgb) {
    return dark;
  }

  const [r, g, b] = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.55 ? dark : light;
};

const socialHandle = (url: string) => {
  const clean = url
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");
  const parts = clean.split("/").filter(Boolean);
  const handle = parts.at(-1);

  if (parts.length > 1 && handle) {
    return handle.startsWith("@") ? handle : `@${handle}`;
  }

  return clean;
};

const EventTicketContent = ({ data }: { data: EventTicketData }) => {
  const theme = usePdfcnTheme();
  const paper = theme.colors.background;
  const ink = theme.colors.foreground;
  const quiet = theme.colors.mutedForeground;

  const accent = resolveColor(
    data.accentColor ?? theme.colors.primary,
    theme.colors
  );
  const onAccent = inkOnAccent(accent, paper, ink);

  const styles = StyleSheet.create({
    admit: {
      color: onAccent,
      fontSize: 7,
      fontWeight: "bold",
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    body: {
      flex: 1,
      height: TICKET_SIZE.height,
      justifyContent: "space-between",
      paddingBottom: 16,
      paddingLeft: 20,
      paddingRight: 18,
      paddingTop: 18,
    },
    brand: {
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
      marginBottom: 14,
    },
    fact: {
      flexShrink: 1,
      minWidth: 0,
      paddingRight: 12,
    },
    facts: {
      flexDirection: "row",
    },
    footer: {
      alignItems: "center",
      flexDirection: "row",
      gap: 12,
      marginTop: 10,
    },
    label: {
      color: quiet,
      fontSize: 7,
      fontWeight: "bold",
      letterSpacing: 1.2,
      marginBottom: 3,
      textTransform: "uppercase",
    },
    logo: { borderRadius: 3, height: 14, width: 14 },
    notchBottom: {
      backgroundColor: paper,
      borderRadius: NOTCH_RADIUS,
      bottom: -NOTCH_RADIUS,
      height: NOTCH_RADIUS * 2,
      left: TICKET_SIZE.width - STUB_WIDTH - NOTCH_RADIUS,
      position: "absolute",
      width: NOTCH_RADIUS * 2,
    },
    notchTop: {
      backgroundColor: paper,
      borderRadius: NOTCH_RADIUS,
      height: NOTCH_RADIUS * 2,
      left: TICKET_SIZE.width - STUB_WIDTH - NOTCH_RADIUS,
      position: "absolute",
      top: -NOTCH_RADIUS,
      width: NOTCH_RADIUS * 2,
    },
    organizer: {
      color: quiet,
      // Forme ignores `marginLeft: "auto"`, so the organizer line absorbs the
      // free space and pushes the ticket-type pill to the right edge.
      flexGrow: 1,
      fontSize: 8,
      fontWeight: "bold",
      letterSpacing: 1.1,
      textTransform: "uppercase",
    },
    page: {
      alignItems: "stretch",
      backgroundColor: paper,
      flexDirection: "row",
      height: TICKET_SIZE.height,
      overflow: "hidden",
      position: "relative",
      width: TICKET_SIZE.width,
    },
    perforation: {
      height: TICKET_SIZE.height,
      left: TICKET_SIZE.width - STUB_WIDTH - PERFORATION_WIDTH / 2,
      position: "absolute",
      top: 0,
      width: PERFORATION_WIDTH,
    },
    perforationDash: {
      backgroundColor: paper,
      height: PERFORATION_DASH,
      marginBottom: PERFORATION_GAP,
      width: PERFORATION_WIDTH,
    },
    pill: {
      backgroundColor: accent,
      borderRadius: 9,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    pillText: {
      color: onAccent,
      fontSize: 7,
      fontWeight: "bold",
      letterSpacing: 1.2,
      textTransform: "uppercase",
    },
    qr: {
      backgroundColor: "#ffffff",
      borderRadius: 6,
      padding: 5,
    },
    serial: {
      color: onAccent,
      fontSize: 7,
      fontWeight: "bold",
      letterSpacing: 1.1,
      textTransform: "uppercase",
    },
    socialItem: {
      alignItems: "center",
      flexDirection: "row",
      gap: 4,
    },
    socialLabel: {
      color: quiet,
      fontSize: 6.5,
      fontWeight: "bold",
      letterSpacing: 0.4,
      textTransform: "uppercase",
    },
    socialList: {
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
    },
    socialValue: {
      color: quiet,
      fontSize: 6.5,
    },
    stripe: {
      backgroundColor: accent,
      height: TICKET_SIZE.height,
      width: STRIPE_WIDTH,
    },
    stub: {
      alignItems: "center",
      backgroundColor: accent,
      height: TICKET_SIZE.height,
      justifyContent: "space-between",
      paddingBottom: 14,
      paddingHorizontal: 12,
      paddingTop: 16,
      width: STUB_WIDTH,
    },
    terms: {
      color: quiet,
      flex: 1,
      fontSize: 6.5,
      lineHeight: 1.4,
      paddingRight: 8,
    },
    title: {
      color: ink,
      fontSize: 26,
      fontWeight: "bold",
      letterSpacing: -0.6,
      lineHeight: 1.08,
      marginBottom: 8,
    },
    value: {
      color: ink,
      fontSize: 12,
      fontWeight: "bold",
    },
    venue: {
      color: quiet,
      fontSize: 10,
      lineHeight: 1.4,
    },
  });

  return (
    <Document title={`${data.eventName} ${data.ticketNumber}`}>
      <Page margin={0} size={TICKET_SIZE}>
        <View style={styles.page as never}>
          <View style={styles.stripe} />

          <View style={styles.body}>
            <View>
              <View style={styles.brand}>
                {data.logoUrl && (
                  <PdfImage
                    fit="contain"
                    src={data.logoUrl}
                    style={styles.logo}
                  />
                )}
                <Text noMargin style={styles.organizer}>
                  {data.organizer ?? "Event ticket"}
                </Text>
                <View style={styles.pill}>
                  <Text noMargin style={styles.pillText}>
                    {data.ticketType}
                  </Text>
                </View>
              </View>
              <Text noMargin style={styles.title}>
                {data.eventName}
              </Text>
              <Text noMargin style={styles.venue}>
                {data.venue}
              </Text>
              <Text noMargin style={styles.venue}>
                {data.address}
              </Text>
            </View>

            <View>
              <View style={styles.facts}>
                <View style={styles.fact}>
                  <Text noMargin style={styles.label}>
                    Date
                  </Text>
                  <Text noMargin style={styles.value}>
                    {data.eventDate}
                  </Text>
                </View>
                <View style={styles.fact}>
                  <Text noMargin style={styles.label}>
                    Time
                  </Text>
                  <Text noMargin style={styles.value}>
                    {data.eventTime}
                  </Text>
                </View>
                {data.doorsOpen && (
                  <View style={styles.fact}>
                    <Text noMargin style={styles.label}>
                      Doors
                    </Text>
                    <Text noMargin style={styles.value}>
                      {data.doorsOpen}
                    </Text>
                  </View>
                )}
                {data.seat && (
                  <View style={styles.fact}>
                    <Text noMargin style={styles.label}>
                      Seat
                    </Text>
                    <Text noMargin style={styles.value}>
                      {`${data.seat.section}–${data.seat.row}–${data.seat.number}`}
                    </Text>
                  </View>
                )}
              </View>
              {(data.terms ||
                (data.socialLinks && data.socialLinks.length > 0)) && (
                <View style={styles.footer}>
                  {data.terms && (
                    <Text noMargin style={styles.terms}>
                      {data.terms}
                    </Text>
                  )}
                  {data.socialLinks && data.socialLinks.length > 0 && (
                    <View style={styles.socialList}>
                      {data.socialLinks.map((link) => (
                        <View
                          key={`${link.platform}-${link.url}`}
                          style={styles.socialItem}
                        >
                          <Text noMargin style={styles.socialLabel}>
                            {link.platform}
                          </Text>
                          <Text noMargin style={styles.socialValue}>
                            {socialHandle(link.url)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>

          <View style={styles.stub}>
            <Text noMargin style={styles.admit}>
              Admit one
            </Text>
            <View style={styles.qr}>
              {data.qrCodeUrl ? (
                <PdfImage
                  fit="contain"
                  height={68}
                  src={data.qrCodeUrl}
                  width={68}
                />
              ) : (
                <PdfQRCode
                  backgroundColor="#ffffff"
                  color="#000000"
                  size={68}
                  value={data.ticketNumber}
                />
              )}
            </View>
            <Text noMargin style={styles.serial}>
              {data.ticketNumber}
            </Text>
          </View>

          <View style={styles.perforation}>
            {perforationOffsets.map((offset) => (
              <View
                key={`perforation-${offset}`}
                style={styles.perforationDash}
              />
            ))}
          </View>

          <View style={styles.notchTop} />
          <View style={styles.notchBottom} />
        </View>
      </Page>
    </Document>
  );
};

export const EventTicketDocument = ({
  theme,
  data = sampleData,
}: {
  theme?: PdfcnTheme;
  data?: EventTicketData;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <EventTicketContent data={data} />
  </PdfcnThemeProvider>
);
