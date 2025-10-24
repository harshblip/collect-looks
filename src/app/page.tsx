import AuthLayout from "./auth/layout";
import Auth from "./auth/page";

export const metadata = {
  title: "Bienvenue à Collect",
  description: "Get started with all the elegance and fumn"
}

export default function Home() {
  return (
    <>
      <AuthLayout children={<Auth />} />
    </>
  );
}
