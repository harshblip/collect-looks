import { useForgotPassword } from "@/app/hooks/useUser";
import { CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import MotionDiv from "../ui/primitives/PageTransition";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setResetMail } from "@/lib/slice/userSlice";

function ForgotModal({
  setVisible,
}: {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();
  return (
    <>
      <div className="primary-bg relative z-50 flex flex-col p-8 space-y-4 rounded-md w-[32rem] mx-auto">
        <p className={`text-2xl text-primary`}>Enter your mail id</p>
        <p className={`text-sm text-gray-400 -mt-4`}>
          enter your registered email. where you will receive an email for
          password reset
        </p>
        <div className="flex space-x-4 mt-4">
          {isSuccess ? (
            <MotionDiv className="flex items-center gap-2 text-secondary">
              <ExclamationCircleIcon className="" height={26} />
              <p className="">Please check your email for the reset link</p>
            </MotionDiv>
          ) : (
            <input
              type="email"
              className={`bg-white text-md p-2 border-none outline-none transition-all focus:shadow-md rounded-md flex-1`}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          {isPending ? (
            <button className="hover:cursor-pointer bg-[#495057c5] text-white p-2 rounded-md w-24 active:scale-95 transition-transform duration-150 ease-in-out">
              sending...
            </button>
          ) : isSuccess ? (
            <button className="hover:cursor-pointer bg-green-500 text-white p-2 rounded-md w-24 active:scale-95 transition-transform flex justify-center items-center duration-150 ease-in-out">
              Sent
              <CheckCircle2 className="ml-2" size={20} />
            </button>
          ) : (
            <button
              className={`hover:cursor-pointer bg-[#495057] text-white p-2 rounded-md w-24 active:scale-95 transition-transform duration-150 ease-in-out`}
              onClick={() => {
                dispatch(setResetMail(email));
                forgotPassword({ email: email });
              }}
            >
              Submit
            </button>
          )}
        </div>
        <div className="flex flex-col mt-4">
          <p className={`text-primary text-xl`}>
            {" "}
            Steps to reset your password{" "}
          </p>
          <div
            className={`mt-2 text-secondary text-md flex flex-col space-y-1`}
          >
            <p> 1. receive a link on your registered email id </p>
            <p> 2. follow that link to new page to reset password </p>
            <p> 3. enter new password. done. </p>
          </div>
        </div>
        <button
          className="absolute top-2 right-2 text-3xl mt-4 p-2 border border-gray-400 rounded-md hover active:scale-95 hover:border-none hover:bg-gray-200"
          onClick={() => setVisible(false)}
        >
          <XMarkIcon
            className="
                                w-5 text-secondary"
          />{" "}
        </button>
      </div>
    </>
  );
}

export default React.memo(ForgotModal);
