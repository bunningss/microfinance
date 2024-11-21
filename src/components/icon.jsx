import {
  ArrowLeft,
  CalendarArrowDown,
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  HandCoins,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Plus,
  Save,
  Search,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

const Icons = {
  arrowUp: ChevronUp,
  arrowDown: ChevronDown,
  arrowLeft: ArrowLeft,
  view: Eye,
  user: User,
  members: Users,
  dashboard: LayoutDashboard,
  expense: HandCoins,
  menu: Menu,
  close: X,
  plus: Plus,
  edit: Edit,
  money: Wallet,
  search: Search,
  login: LogIn,
  logout: LogOut,
  installment: CalendarArrowDown,
  save: Save,
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
