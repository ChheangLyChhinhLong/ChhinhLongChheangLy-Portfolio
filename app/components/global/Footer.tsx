import NavigationFooter from "../navigation/Footer";
import UnmountStudio from "./Unmount";
import { paywayConfig } from "@/lib/server-env";

export default function Footer() {
  return <UnmountStudio><NavigationFooter payway={paywayConfig} /></UnmountStudio>;
}
