interface Props {
  size: number
}

const ScrawlDark = ({ size }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    zoomAndPan="magnify"
    viewBox="0 0 375 374.999991"
    preserveAspectRatio="xMidYMid meet"
    version="1.0"
  >
    <defs>
      <clipPath id="id1">
        <path
          d="M 74.859375 74.859375 L 375 74.859375 L 375 375 L 74.859375 375 Z M 74.859375 74.859375 "
          clipRule="nonzero"
        />
      </clipPath>
      <clipPath id="id2">
        <path
          d="M 0 0 L 300.140625 0 L 300.140625 300.140625 L 0 300.140625 Z M 0 0 "
          clipRule="nonzero"
        />
      </clipPath>
    </defs>
    <g clipPath="url(#id1)">
      <path
        fill="#ffffff"
        d="M 74.859375 74.859375 L 375 74.859375 L 375 375 L 74.859375 375 L 74.859375 74.859375 "
        fillOpacity="1"
        fillRule="nonzero"
      />
    </g>
    <g clipPath="url(#id2)">
      <path
        strokeLinecap="butt"
        transform="matrix(1.091422, 0, 0, 1.091422, 0.0000045, 0.000000000000021316)"
        fillOpacity="1"
        fill="#000000"
        fillRule="nonzero"
        strokeLinejoin="miter"
        d="M -0.00000412306 -0.000000000000019531 L 274.999538 -0.000000000000019531 L 274.999538 274.999542 L -0.00000412306 274.999542 L -0.00000412306 -0.000000000000019531 "
        stroke="#ffffff"
        strokeWidth="21.989655"
        strokeOpacity="1"
        strokeMiterlimit="4"
      />
    </g>
  </svg>
)

export default ScrawlDark
