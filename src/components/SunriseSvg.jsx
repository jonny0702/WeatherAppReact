import * as React from "react"

const SvgComponent = (props) => {
    const {sunrise, sunset} = props
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 595.47 122.57"
            {...props}
        >
            <title>{"solticesunset"}</title>
            <path
            d="M48.62 163.6c97.44-74.74 174.72-91.37 174.72-91.37C299.06 55 351.1 57.76 351.1 57.76c111.32 3.91 176.28 40.69 176.28 40.69 87.85 45.39 99.39 64.18 99.39 64.18"
            transform="translate(-32.58 -56.1)"
            style={{
                fill: "none",
                stroke: "#fff",
                strokeMiterlimit: 10,
                strokeWidth: 3,
            }}
            data-name="Layer 2"
            />
            <circle
            cx={16.04}
            cy={106.53}
            r={16.04}
            style={{
                fill: "#f1d100",
            }}
            data-name="Layer 4"
            />
        </svg>

    )
}

export default SvgComponent
