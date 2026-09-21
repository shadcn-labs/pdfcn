import { ArrowRightIcon } from "lucide-react";
import { useIntlayer } from "next-intlayer";

import { Link } from "@/components/link";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";

export const Announcement = () => {
  const content = useIntlayer("announcement");

  return (
    <Badge asChild variant="secondary" className="rounded-full">
      <Link href={ROUTES.THEME_BUILDER}>
        {content.newThemeBuilder} <ArrowRightIcon />
      </Link>
    </Badge>
  );
};
