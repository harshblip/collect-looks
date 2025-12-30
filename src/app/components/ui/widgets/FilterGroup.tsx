import { AnimatePresence } from "framer-motion";
import MotionDiv from "../primitives/PageTransition";
import { Filter } from "@/types/mediaTypes";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../navbar/DatePicker";

export default function FilterGroup({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (value: React.SetStateAction<Filter>) => void;
}) {
  const butonStyle = `border border-gray-400 w-fit h-6 flex items-center justify-center rounded-md text-gray-400 p-3`;
  return (
    <>
      <MotionDiv className="flex items-center space-x-2 absolute mt-[3.6rem] w-full rounded-md p-4 text-sm h-10 z-2">
        <AnimatePresence>
          {filter.type && (
            <button
              onClick={() =>
                setFilter((fil) => ({
                  ...fil,
                  type: null,
                }))
              }
              className={butonStyle}
            >
              <XMarkIcon className="w-4 text-gray-400 mr-1 -ml-1" />
              {filter.type}
            </button>
          )}
          {formatDate(filter.date) && (
            <button
              onClick={() =>
                setFilter((fil) => ({
                  ...fil,
                  date: undefined,
                }))
              }
              className={butonStyle}
            >
              <XMarkIcon className="w-4 text-gray-400 mr-1 -ml-1" />
              {`>`} {formatDate(filter.date)}
            </button>
          )}
          {filter.locked && (
            <button
              onClick={() =>
                setFilter((fil) => ({
                  ...fil,
                  locked: null,
                }))
              }
              className={butonStyle}
            >
              <XMarkIcon className="w-4 text-gray-400 mr-1 -ml-1" />
              {filter.locked && "locked"}
            </button>
          )}
          {filter.starred && (
            <button
              onClick={() =>
                setFilter((fil) => ({
                  ...fil,
                  starred: null,
                }))
              }
              className={butonStyle}
            >
              <XMarkIcon className="w-4 text-gray-400 mr-1 -ml-1" />
              {filter.starred ? "starred" : "unstarred"}
            </button>
          )}
          <button
            onClick={() =>
              setFilter({
                type: null,
                date: undefined,
                locked: null,
                starred: null,
              })
            }
            className="hover:cursor-pointer text-gray-400"
          >
            clear
          </button>
        </AnimatePresence>
      </MotionDiv>
    </>
  );
}
