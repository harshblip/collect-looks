import './checkbox.css'

export default function Checkbox({ setChecked }: {
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            <div className="checkbox-container">
                <label className="ios-checkbox red">
                    <input
                        type="checkbox"
                        onChange={(e) => setChecked(e.target.checked)}
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