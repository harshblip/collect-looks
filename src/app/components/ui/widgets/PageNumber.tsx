import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function PageNumber({
  setCurrentPage,
  btns,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  btns: number[];
}) {
  return (
    <>
      <div className="flex space-x-2 justify-center items-center bg-white shadow-md rounded-md p-2 text-secondary absolute right-25 bottom-15">
        <ChevronDoubleLeftIcon className="w-4 hover" />
        <ChevronLeftIcon
          onClick={() => setCurrentPage((cr) => (cr > 0 ? cr - 1 : cr))}
          className="w-4 hover"
        />
        {btns.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className="bg-transparent outline-none p-1 pr-2 pl-2 hover hover:bg-gray-200 rounded-sm"
          >
            {i + 1}
          </button>
        ))}
        <ChevronRightIcon
          onClick={() =>
            setCurrentPage((cr) => (cr < btns.length ? cr + 1 : cr))
          }
          className="w-4 hover"
        />
        <ChevronDoubleRightIcon className="w-4 hover" />
      </div>
    </>
  );
}
