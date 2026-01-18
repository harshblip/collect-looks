import { ReactNode } from "react";
import Logo from "../components/ui/primitives/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex lg:flex-row flex-col page-fade">
        <div
          style={{
            backgroundImage: `
        linear-gradient(to right, #4e4e4e 1px, transparent 1px),
        linear-gradient(to bottom, #4e4e4e 1px, transparent 1px),
        radial-gradient(circle 800px at 0% 200px, #353535, transparent)
      `,
            backgroundSize: "96px 64px, 96px 64px, 100% 100%",
          }}
          className="bg-[#353535] text-[#DEE2E6] md:h-screen md:rounded-r-3xl md:rounded-bl-none rounded-bl-[4rem] rounded-br-[4rem] md:rounded-br-3xl md:w-1/2"
        >
          <div className="md:p-32 p-20 flex flex-col font-glook">
            <Logo />
            <p className={`text-3xl mt-8`}>collect</p>
            <p className={`text-5xl mt-18 fade-in`}>Welcome to Collect</p>
            <p className={`hidden md:flex text-[#999999] text-md mt-4    `}>
              a best-in-class app for your photo and video sharing and some more
              more random things you’d like
            </p>
          </div>
        </div>
        <div className="primary-bg rounded-md h-screen md:w-1/2">
          {children}
        </div>
      </div>
    </>
  );
}
