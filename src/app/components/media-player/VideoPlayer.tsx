'use client'

import ReactPlayer from "react-player";
import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaVolumeRange,
    MediaPlaybackRateButton,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
    MediaFullscreenButton,
} from "media-chrome/react";
import { useState } from "react";

export default function Player({ url }: { url: string }) {
    const [showVol, setShowVol] = useState<boolean>(false)
    return (
        <MediaController
            style={{
                width: "100%",
                height: '100%',
                aspectRatio: "4/3",
                backgroundColor: 'transparent',
            }}
        >
            <ReactPlayer
                slot="media"
                src={url}
                controls={false}
                style={{
                    width: "52rem",
                    height: "52rem",
                    marginTop: '-6rem',
                }}
            ></ReactPlayer>
            <MediaControlBar className="bg-gray-100 rounded-md">
                <div className="p-2 flex space-x-0">
                    <MediaPlayButton className="w-12 rounded-md" />
                    <MediaTimeRange className="w-52 rounded-md p-2 ml-2" />
                    <MediaTimeDisplay showDuration className="rounded-md p-2 text-gray-600 font-product text-sm bg-transparent" />
                    <MediaVolumeRange className="w-44 rounded-md ml-12 p-4" />
                    <MediaMuteButton className="w-12 rounded-md ml-16" />
                    <MediaPlaybackRateButton className="ml-4 rounded-md" />
                    <MediaFullscreenButton className="ml-4 p-2 rounded-md" />
                </div>
            </MediaControlBar>
        </MediaController>
    );
}