import { cn } from "@/lib/utils";
import MotionDiv from "../primitives/PageTransition";
import { CheckIcon, Grid, List } from "lucide-react";

export default function SwitchView({
  viewFolder,
  viewMode,
  setViewMode,
}: {
  viewFolder: boolean;
  viewMode: "grid" | "list";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}) {
  return (
    <>
      <MotionDiv
        className={`flex space-x-8 justify-end w-[75%] z-1 ${viewFolder && `-mt-11`}`}
      >
        {/* <FilterItemsGroup /> */}
        <div className="flex space-x-2 justify-end items-center">
          <button
            onClick={() => setViewMode("grid")}
            className={cn([
              "border border-gray-200 rounded-md p-2 text-secondary hover active:scale-95",
              viewMode === "grid" && "bg-gray-200",
            ])}
          >
            {viewMode === "grid" ? (
              <div className="flex gap-2 items-center">
                <Grid />
                <CheckIcon width={18} />
              </div>
            ) : (
              <Grid />
            )}
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn([
              "border border-gray-200 rounded-md p-2 text-secondary hover active:scale-95",
              viewMode === "list" && "bg-gray-200",
            ])}
          >
            {viewMode === "list" ? (
              <div className="flex gap-2 items-center">
                <List />
                <CheckIcon width={18} />
              </div>
            ) : (
              <List />
            )}
          </button>
        </div>
      </MotionDiv>
    </>
  );
}
