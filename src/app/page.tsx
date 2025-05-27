import AuthLayout from "./auth/layout";
import Auth from "./auth/page";

export default function Home() {
  return (
    <>
      <AuthLayout children={<Auth />} />
    </>
  );
}
