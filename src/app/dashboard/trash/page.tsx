"use client";
import Card from "@/app/components/shared/Card";
import EmptyTrashPage from "@/app/components/ui/placeholders/EmptyTrashPage";
import Checkbox from "@/app/components/ui/primitives/Checkbox";
import {
  useEnableAutoDelete,
  useGetTrashedFiles,
  useGetTrashStatus,
} from "@/app/hooks/useMedia";
import { useAppSelector } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { BeanIcon, Biohazard, CircleDashed } from "lucide-react";
import { useEffect, useState } from "react";

export default function Trash() {
  const userId = useAppSelector((state) => state.user.EUID.userId);
  const { data } = useGetTrashedFiles(userId);
  const [checked, setChecked] = useState<boolean>(false);
  const { data: deleteStatus } = useGetTrashStatus(userId);
  const { mutate: enableAutoDelete } = useEnableAutoDelete();
  console.log("ornot", deleteStatus);
  // useEffect(() => {
  //     enableAutoDelete({ checked: checked, userId: 3 })
  // }, [checked])
  return (
    <>
      <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
        {data ? (
          <>
            {" "}
            <div className="flex justify-between w-[100%]">
              <p className="text-4xl fixed font-medium h-16 pt-12 -mt-12 text-secondary bg-white">
                {" "}
                Trashed{" "}
              </p>
              <button
                onClick={() =>
                  deleteStatus !== undefined &&
                  enableAutoDelete({
                    checked: !deleteStatus,
                    userId: userId,
                  })
                }
                className="hover hover:shadow-md transition text-secondary p-2 justify-around items-center rounded-md flex space-x-4 bg-gray-50 w-[16rem] absolute right-20"
              >
                <div className="flex gap-2 ml-0">
                  {deleteStatus ? <Biohazard /> : <CircleDashed />}
                </div>
                <div className="flex flex-col text-start -ml-6">
                  <p className="text-lg">
                    {" "}
                    {deleteStatus
                      ? "auto delete enabled"
                      : "enable auto delete"}{" "}
                  </p>
                  <p className="text-xs text-gray-400">
                    {deleteStatus
                      ? "turn off to periodically delete files"
                      : "turn on auto delete files"}
                  </p>
                </div>
              </button>
            </div>
            <div className="flex flex-col mt-8 bg-white">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                {/* Column Headers */}
                <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-gray-200 mt-8">
                  <p className="text-gray-500 font-semibold">Name</p>
                  <div className="flex justify-end mr-22">
                    <p className="text-gray-500 font-semibold">Date</p>
                  </div>
                  <div className="flex justify-end mr-22">
                    <p className="text-gray-500 font-semibold">Expires in</p>
                  </div>
                  <div className="flex space-x-4 justify-end">
                    <p className="text-gray-500 font-semibold">Size</p>
                  </div>
                </div>

                <div className="flex flex-col divide-y divide-gray-100 mt-2">
                  {data?.map((x, i) => (
                    <div key={i}>
                      <Card data={x} key={i} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>{" "}
          </>
        ) : (
          <>
            <EmptyTrashPage />
          </>
        )}
      </div>
    </>
  );
}
