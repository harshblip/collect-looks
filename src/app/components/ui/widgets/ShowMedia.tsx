import { Files } from "@/types/mediaTypes";
import Image from "next/image";
import React from "react";
import Player from "../../media-player/VideoPlayer";
import { AudioPlayer } from "react-audio-play";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ShowMedia = ({ files }: { files: Files }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <>
      <div className="flex flex-col">
        {files.file_type === "image" ? (
          <>
            <Image
              src={files.file_url || ""}
              alt={files.file_name || ""}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-full w-auto max-w-4xl object-contain rounded-xl mt-8"
            />
          </>
        ) : files.file_type === "video" ? (
          <>
            <Player url={files.file_url || ""} />
          </>
        ) : files.file_type === "audio" ? (
          <>
            <AudioPlayer
              src={files.file_url || ""}
              color="#e9ecef"
              sliderColor="#e9ecef"
              style={{
                background: "#000",
                borderRadius: "15px",
                padding: "30px",
                width: "24rem",
                height: "1rem",
                marginTop: "8rem",
              }}
            />
          </>
        ) : (
          <>
            <div className="w-[60vw] h-[85vh] z-1 p-10">
              {files.file_url && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={files.file_url}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(ShowMedia);
