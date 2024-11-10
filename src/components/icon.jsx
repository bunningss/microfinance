import {
  ChevronDown,
  ChevronUp,
  Eye,
  HandCoins,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";

const Icons = {
  arrowUp: ChevronUp,
  arrowDown: ChevronDown,
  view: Eye,
  user: User,
  members: Users,
  dashboard: LayoutDashboard,
  expense: HandCoins,
};

export function Icon({
  size = 14,
  icon = "",
  iconColor,
  strokeWidth = 2,
  className,
}) {
  const CurrentIcon = Icons[icon];

  if (!CurrentIcon) return null;

  return (
    <CurrentIcon
      className={className}
      size={size}
      color={iconColor}
      height={size}
      width={size}
      strokeWidth={strokeWidth}
    />
  );
}
