export default function SmallLogo() {
    return (
        <>
            <div className="flex flex-col space-y-4 -mt-10">
                <div className="flex space-x-4">
                    <svg width="30" height="30">
                        <rect width="30" height="30" fill="#6C757D" />
                    </svg>

                    <svg width="30" height="30">
                        <polygon
                            points="15,0 30,30 0,30"
                            fill="#DEE2E6"
                        />
                    </svg>
                </div>

                <div className="flex space-x-4">
                    <svg width="35" height="35">
                        <circle cx="15" cy="18" r="16" fill="#F8F9FA" />
                    </svg>

                    <svg width="30" height="30" className="-ml-1 mt-1">
                        <rect width="30" height="30" fill="#495057" />
                    </svg>
                </div>
            </div>
        </>
    )
}