import './checkbox.css'

export default function Checkbox({ setChecked, check, onClick }: {
    setChecked: React.Dispatch<React.SetStateAction<boolean>>,
    check?: boolean | undefined
    onClick?: () => void
}) {
    return (
        <>
            <div
                className="checkbox-container">
                <label className="ios-checkbox red">
                    <input
                        onClick={onClick}
                        onChange={(e) => setChecked(e.target.checked)}
                        type="checkbox"
                        checked={check}
                    />
                    <div className="checkbox-wrapper">
                        <div className="checkbox-bg"></div>
                        <svg className="checkbox-icon" viewBox="0 0 24 24" fill="none">
                            <path
                                className="check-path"
                                d="M4 12L10 18L20 6"
                                stroke="currentColor"
                                strokeWidth={3}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            ></path>
                        </svg>
                    </div>
                </label>
            </div>

        </>
    )
}