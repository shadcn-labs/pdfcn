import type { ComponentType } from "react";

import forme_alert from "@/examples/forme/alert";
import forme_badge from "@/examples/forme/badge";
import forme_card from "@/examples/forme/card";
import forme_data_table from "@/examples/forme/data-table";
import forme_data_table_headless from "@/examples/forme/data-table-headless";
import forme_divider from "@/examples/forme/divider";
import forme_event_agenda from "@/examples/forme/event-agenda";
import forme_event_ticket from "@/examples/forme/event-ticket";
import forme_form from "@/examples/forme/form";
import forme_gift_certificate from "@/examples/forme/gift-certificate";
import forme_graph from "@/examples/forme/graph";
import forme_heading from "@/examples/forme/heading";
import forme_invoice_classic from "@/examples/forme/invoice-classic";
import forme_invoice_consultant from "@/examples/forme/invoice-consultant";
import forme_invoice_corporate from "@/examples/forme/invoice-corporate";
import forme_invoice_creative from "@/examples/forme/invoice-creative";
import forme_invoice_minimal from "@/examples/forme/invoice-minimal";
import forme_invoice_modern from "@/examples/forme/invoice-modern";
import forme_keep_together from "@/examples/forme/keep-together";
import forme_key_value from "@/examples/forme/key-value";
import forme_lesson_plan from "@/examples/forme/lesson-plan";
import forme_link from "@/examples/forme/link";
import forme_list from "@/examples/forme/list";
import forme_medical_intake_form from "@/examples/forme/medical-intake-form";
import forme_meeting_minutes from "@/examples/forme/meeting-minutes";
import forme_packing_slip from "@/examples/forme/packing-slip";
import forme_page_break from "@/examples/forme/page-break";
import forme_page_footer from "@/examples/forme/page-footer";
import forme_page_header from "@/examples/forme/page-header";
import forme_page_number from "@/examples/forme/page-number";
import forme_pdf_image from "@/examples/forme/pdf-image";
import forme_press_release from "@/examples/forme/press-release";
import forme_qrcode from "@/examples/forme/qrcode";
import forme_report_financial from "@/examples/forme/report-financial";
import forme_report_marketing from "@/examples/forme/report-marketing";
import forme_report_operations from "@/examples/forme/report-operations";
import forme_report_security from "@/examples/forme/report-security";
import forme_section from "@/examples/forme/section";
import forme_shipping_label from "@/examples/forme/shipping-label";
import forme_signature from "@/examples/forme/signature";
import forme_stack from "@/examples/forme/stack";
import forme_table from "@/examples/forme/table";
import forme_text from "@/examples/forme/text";
import forme_watermark from "@/examples/forme/watermark";
import forme_work_order from "@/examples/forme/work-order";
import takumi_alert from "@/examples/takumi/alert";
import takumi_badge from "@/examples/takumi/badge";
import takumi_card from "@/examples/takumi/card";
import takumi_data_table from "@/examples/takumi/data-table";
import takumi_data_table_headless from "@/examples/takumi/data-table-headless";
import takumi_divider from "@/examples/takumi/divider";
import takumi_event_agenda from "@/examples/takumi/event-agenda";
import takumi_event_ticket from "@/examples/takumi/event-ticket";
import takumi_form from "@/examples/takumi/form";
import takumi_gift_certificate from "@/examples/takumi/gift-certificate";
import takumi_graph from "@/examples/takumi/graph";
import takumi_heading from "@/examples/takumi/heading";
import takumi_invoice_classic from "@/examples/takumi/invoice-classic";
import takumi_invoice_consultant from "@/examples/takumi/invoice-consultant";
import takumi_invoice_corporate from "@/examples/takumi/invoice-corporate";
import takumi_invoice_creative from "@/examples/takumi/invoice-creative";
import takumi_invoice_minimal from "@/examples/takumi/invoice-minimal";
import takumi_invoice_modern from "@/examples/takumi/invoice-modern";
import takumi_keep_together from "@/examples/takumi/keep-together";
import takumi_key_value from "@/examples/takumi/key-value";
import takumi_lesson_plan from "@/examples/takumi/lesson-plan";
import takumi_link from "@/examples/takumi/link";
import takumi_list from "@/examples/takumi/list";
import takumi_medical_intake_form from "@/examples/takumi/medical-intake-form";
import takumi_meeting_minutes from "@/examples/takumi/meeting-minutes";
import takumi_packing_slip from "@/examples/takumi/packing-slip";
import takumi_page_break from "@/examples/takumi/page-break";
import takumi_page_footer from "@/examples/takumi/page-footer";
import takumi_page_header from "@/examples/takumi/page-header";
import takumi_page_number from "@/examples/takumi/page-number";
import takumi_pdf_image from "@/examples/takumi/pdf-image";
import takumi_press_release from "@/examples/takumi/press-release";
import takumi_qrcode from "@/examples/takumi/qrcode";
import takumi_report_financial from "@/examples/takumi/report-financial";
import takumi_report_marketing from "@/examples/takumi/report-marketing";
import takumi_report_operations from "@/examples/takumi/report-operations";
import takumi_report_security from "@/examples/takumi/report-security";
import takumi_section from "@/examples/takumi/section";
import takumi_shipping_label from "@/examples/takumi/shipping-label";
import takumi_signature from "@/examples/takumi/signature";
import takumi_stack from "@/examples/takumi/stack";
import takumi_table from "@/examples/takumi/table";
import takumi_text from "@/examples/takumi/text";
import takumi_watermark from "@/examples/takumi/watermark";
import takumi_work_order from "@/examples/takumi/work-order";
import type { BaseName } from "@/registry/bases";

type DemoMap = Record<string, ComponentType>;

export const demos: Record<BaseName, DemoMap> = {
  forme: {
    alert: forme_alert,
    badge: forme_badge,
    card: forme_card,
    "data-table": forme_data_table,
    "data-table-headless": forme_data_table_headless,
    divider: forme_divider,
    "event-agenda": forme_event_agenda,
    "event-ticket": forme_event_ticket,
    form: forme_form,
    "gift-certificate": forme_gift_certificate,
    graph: forme_graph,
    heading: forme_heading,
    "invoice-classic": forme_invoice_classic,
    "invoice-consultant": forme_invoice_consultant,
    "invoice-corporate": forme_invoice_corporate,
    "invoice-creative": forme_invoice_creative,
    "invoice-minimal": forme_invoice_minimal,
    "invoice-modern": forme_invoice_modern,
    "keep-together": forme_keep_together,
    "key-value": forme_key_value,
    "lesson-plan": forme_lesson_plan,
    link: forme_link,
    list: forme_list,
    "medical-intake-form": forme_medical_intake_form,
    "meeting-minutes": forme_meeting_minutes,
    "packing-slip": forme_packing_slip,
    "page-break": forme_page_break,
    "page-footer": forme_page_footer,
    "page-header": forme_page_header,
    "page-number": forme_page_number,
    "pdf-image": forme_pdf_image,
    "press-release": forme_press_release,
    qrcode: forme_qrcode,
    "report-financial": forme_report_financial,
    "report-marketing": forme_report_marketing,
    "report-operations": forme_report_operations,
    "report-security": forme_report_security,
    section: forme_section,
    "shipping-label": forme_shipping_label,
    signature: forme_signature,
    stack: forme_stack,
    table: forme_table,
    text: forme_text,
    watermark: forme_watermark,
    "work-order": forme_work_order,
  },
  takumi: {
    alert: takumi_alert,
    badge: takumi_badge,
    card: takumi_card,
    "data-table": takumi_data_table,
    "data-table-headless": takumi_data_table_headless,
    divider: takumi_divider,
    "event-agenda": takumi_event_agenda,
    "event-ticket": takumi_event_ticket,
    form: takumi_form,
    "gift-certificate": takumi_gift_certificate,
    graph: takumi_graph,
    heading: takumi_heading,
    "invoice-classic": takumi_invoice_classic,
    "invoice-consultant": takumi_invoice_consultant,
    "invoice-corporate": takumi_invoice_corporate,
    "invoice-creative": takumi_invoice_creative,
    "invoice-minimal": takumi_invoice_minimal,
    "invoice-modern": takumi_invoice_modern,
    "keep-together": takumi_keep_together,
    "key-value": takumi_key_value,
    "lesson-plan": takumi_lesson_plan,
    link: takumi_link,
    list: takumi_list,
    "medical-intake-form": takumi_medical_intake_form,
    "meeting-minutes": takumi_meeting_minutes,
    "packing-slip": takumi_packing_slip,
    "page-break": takumi_page_break,
    "page-footer": takumi_page_footer,
    "page-header": takumi_page_header,
    "page-number": takumi_page_number,
    "pdf-image": takumi_pdf_image,
    "press-release": takumi_press_release,
    qrcode: takumi_qrcode,
    "report-financial": takumi_report_financial,
    "report-marketing": takumi_report_marketing,
    "report-operations": takumi_report_operations,
    "report-security": takumi_report_security,
    section: takumi_section,
    "shipping-label": takumi_shipping_label,
    signature: takumi_signature,
    stack: takumi_stack,
    table: takumi_table,
    text: takumi_text,
    watermark: takumi_watermark,
    "work-order": takumi_work_order,
  },
};

export type DemoName = string;
