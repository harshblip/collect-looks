"use client";
import Card from "@/app/components/shared/Card";
import EmptyTrashPage from "@/app/components/ui/placeholders/EmptyTrashPage";
import Checkbox from "@/app/components/ui/primitives/Checkbox";
import { useEnableAutoDelete, useGetTrashedFiles } from "@/app/hooks/useMedia";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Trash() {
  const { data } = useGetTrashedFiles(3);
  const [checked, setChecked] = useState<boolean>(false);
  const { mutate: enableAutoDelete, data: enabledOrNot } =
    useEnableAutoDelete();
  console.log("ornot", enabledOrNot);
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
              <div className="flex space-x-4 items-center absolute right-20">
                <p className="text-gray-400 text-sm">enable auto delete</p>
                <Checkbox
                  onClick={() =>
                    enableAutoDelete({ checked: checked, userId: 3 })
                  }
                  setChecked={setChecked}
                  check={enabledOrNot}
                />
              </div>
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
                  <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b border-gray-200 mt-8">
                    <p className="text-gray-500 font-semibold">Name</p>
                    <div className="flex justify-end mr-22">
                      <p className="text-gray-500 font-semibold">Date</p>
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
