export default function Logo() {
    return (
        <>
            <div className="flex flex-col space-y-4 -mt-10">
                <div className="flex space-x-4">
                    <svg width="50" height="50">
                        <rect width="50" height="50" fill="#6C757D" />
                    </svg>

                    <svg width="60" height="60">
                        <polygon
                            points="25,0 50,50 0,50"
                            fill="#DEE2E6"
                        />
                    </svg>
                </div>

                <div className="flex space-x-4">
                    <svg width="60" height="60">
                        <circle cx="25" cy="20" r="20" fill="#DEE2E6" />
                    </svg>

                    <svg width="50" height="50" className="-ml-2 -mt-1">
                        <rect width="50" height="50" fill="#495057" />
                    </svg>
                </div>
            </div>
        </>
    )
}