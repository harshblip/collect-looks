"use client";

import Card from "@/app/components/shared/Card";
import { useGetLastSeen } from "@/app/hooks/useMedia";
import { useGetUserData } from "@/app/hooks/useUser";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

export default function Storage() {
  const { data } = useGetLastSeen(3);

  const total = 5 * 1024 * 1024; // 5GB in bytes

  const calc = (v: number) => (v / total) * 100;

  const segments = [
    { label: "Images", value: 10, color: "bg-[#8e9aaf]", size: 12 },
    { label: "Videos", value: 6, color: "bg-[#cbc0d3]", size: 12 },
    { label: "Docs", value: 12, color: "bg-[#efd3d7]", size: 12 },
    { label: "Audio", value: 10, color: "bg-[#dee2ff]", size: 12 },
  ];

  return (
    <>
      <div className="mt-4 p-8 font-product">
        <div className="bg-white z-2 flex flex-col space-y-8 fixed w-[75%] -mt-12">
          <div className="flex items-center justify-between text-secondary">
            <p className={`font-pixel text-4xl bg-white h-16 mt-12`}>Storage</p>
            <p className="italic text-gray-400">
              {" "}
              Last, You uploaded 12 files including 10 images and 2 videos{" "}
            </p>
          </div>
          <div className="flex justify-between -mt-4">
            <div className="flex space-x-8 items-center">
              <p className="text-secondary font-medium">
                <span className="text-3xl">1GB</span> of 5GB (20%) used
              </p>
            </div>
            <button className="bg-red-400 rounded-md p-2 text-white flex space-x-2 items-center hover">
              <ExclamationTriangleIcon width={24} />
              <p>destroy everything</p>
            </button>
          </div>
          <div className="w-full relative -mt-2">
            <div className="flex w-full mb-1">
              {segments.map((seg, i) =>
                seg.value > 1 ? (
                  <div
                    key={i}
                    className="text-xs text-gray-400 font-medium flex justify-center"
                    style={{ width: `${seg.value}%` }}
                  >
                    {seg.size}MB ({Math.round(seg.value)}%)
                  </div>
                ) : null
              )}
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
              {segments.map((seg, i) =>
                seg.value > 0 ? (
                  <div
                    key={i}
                    className={`${seg.color} relative cursor-pointer transition-all duration-300 hover:border-2 hover:rounded-sm hover:border-white`}
                    style={{ width: `${seg.value}%` }}
                  ></div>
                ) : null
              )}
            </div>
          </div>
          <div className="flex space-x-4 ml-4">
            {segments.map((seg, i) => (
              <div key={i}>
                <div className="flex space-x-2 items-center">
                  <div className={`${seg.color} p-2 w-4 rounded-md`}></div>
                  <p className="text-gray-400">{seg.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {data ? (
            <>
              <div className="flex flex-col mt-[14rem] bg-white">
                <p className="text-2xl text-gray-400 bg-white fixed w-[75%] h-24 pt-12">
                  big chunky files
                </p>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  {/* Column Headers */}
                  <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b border-gray-200 mt-18">
                    <p className="text-gray-500 font-semibold">Name</p>
                    <div className="flex justify-end mr-22">
                      <p className="text-gray-500 font-semibold">Date</p>
                    </div>
                    <div className="flex space-x-4 justify-end">
                      <p className="text-gray-500 font-semibold">Size</p>
                    </div>
                  </div>

                  <div className="flex flex-col divide-y divide-gray-100 mt-2">
                    {data?.map((x) => (
                      <div key={x.id}>
                        <Card data={x} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>{" "}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
