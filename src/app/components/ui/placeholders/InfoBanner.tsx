import {
  DocumentIcon,
  PhotoIcon,
  PlayIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

export default function InfoBanner({
  file_name,
  type,
}: {
  file_name: string;
  type: "" | "audio" | "video" | "image" | "document";
}) {
  return (
    <>
      <div className="h-16 flex items-center justify-center space-x-2 rounded-md w-full mt-4 border border-gray-400">
        <div className="h-6 w-6 text-gray-400">
          {type === "image" ? (
            <PhotoIcon />
          ) : type === "video" ? (
            <PlayIcon />
          ) : type === "document" ? (
            <DocumentIcon />
          ) : (
            <SignalIcon />
          )}
        </div>
        <p className="text-xl text-gray-400">{file_name}</p>
      </div>
    </>
  );
}
