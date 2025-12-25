import { redirect } from "next/navigation";

// This is the "home" page (/).
// But we don't want to show anything here directly.
// Instead, we immediately redirect everyone to the login page
// to start the "secret gift" experience properly.
export default function Home() {
  redirect("/login");
}
