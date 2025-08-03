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

export default function Player({ url }: { url: string }) {
    return (
        <MediaController
            style={{
                width: "100%",
                height: '100%',
                aspectRatio: "4/3",
                backgroundColor: 'transparent'
            }}
        >
            <ReactPlayer
                slot="media"
                src={url}
                controls={false}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            ></ReactPlayer>
            <MediaControlBar>
                <div className="p-2 flex space-x-8">
                    <MediaPlayButton className="w-12 rounded-md bg-white"/>
                    <MediaTimeRange className="w-32 rounded-md bg-transparent"/>
                    <MediaTimeDisplay showDuration />
                    <MediaMuteButton />
                    <MediaVolumeRange />
                    <MediaPlaybackRateButton />
                    <MediaFullscreenButton />
                </div>
            </MediaControlBar>
        </MediaController>
    );
}