import "./assets/css/styles.css";
import { Home } from "./templates/home.ts";

const trackingUrl = import.meta.env.VITE_TRACKING_URL || "";
const ackeeDomainId = import.meta.env.VITE_ACKEE_DOMAIN_ID || "";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = Home({
  trackingUrl,
  ackeeDomainId,
});
