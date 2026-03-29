import {
  DocumentTextIcon,
  PhotoIcon,
  PlayIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

export default function FilterItemsGroup() {
  return (
    <div className="flex space-x-2">
      <button className="border border-gray-400 rounded-md p-2 text-secondary hover active:scale-95">
        <PhotoIcon className="w-6" />
      </button>
      <button className="border border-gray-400 rounded-md p-2 text-secondary hover active:scale-95">
        <PlayIcon className="w-6" />
      </button>
      <button className="border border-gray-400 rounded-md p-2 text-secondary hover active:scale-95">
        <DocumentTextIcon className="w-6" />
      </button>
      <button className="border border-gray-400 rounded-md p-2 text-secondary hover active:scale-95">
        <SignalIcon className="w-6" />
      </button>
    </div>
  );
}
