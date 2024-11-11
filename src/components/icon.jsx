import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  HandCoins,
  LayoutDashboard,
  Menu,
  Plus,
  User,
  Users,
  X,
} from "lucide-react";

const Icons = {
  arrowUp: ChevronUp,
  arrowDown: ChevronDown,
  view: Eye,
  user: User,
  members: Users,
  dashboard: LayoutDashboard,
  expense: HandCoins,
  menu: Menu,
  close: X,
  plus: Plus,
  edit: Edit,
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
