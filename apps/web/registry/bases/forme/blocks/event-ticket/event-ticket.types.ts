export interface EventTicketSeat {
  number: string;
  row: string;
  section: string;
}

export interface EventTicketSocialLink {
  platform: string;
  url: string;
}

export interface EventTicketData {
  accentColor?: string;
  address: string;
  doorsOpen?: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  logoUrl?: string;
  organizer?: string;
  qrCodeUrl?: string;
  seat?: EventTicketSeat;
  socialLinks?: EventTicketSocialLink[];
  terms?: string;
  ticketNumber: string;
  ticketType: string;
  venue: string;
}
