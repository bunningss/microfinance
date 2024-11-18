import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Edit,
  Eye,
  HandCoins,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Plus,
  Search,
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
  money: DollarSign,
  search: Search,
  loan: HandCoins,
  login: LogIn,
  logout: LogOut,
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
