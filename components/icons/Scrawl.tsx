// Always returns false rn
export const prefersDarkMode = () =>
  !!(
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    false
  )

interface Props {
  size: number
}

const Scrawl = ({ size }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size}
    zoomAndPan="magnify"
    viewBox="0 0 375 374.999991"
    height={size}
    preserveAspectRatio="xMidYMid meet"
    version="1.0"
  >
    <defs>
      <clipPath id="id1">
        <path
          d="M 300 375 L 75 375 C 33.601562 375 0 341.398438 0 300 L 0 75 C 0 33.601562 33.601562 0 75 0 L 300 0 C 341.398438 0 375 33.601562 375 75 L 375 300 C 375 341.398438 341.398438 375 300 375 Z M 300 375 "
          clipRule="nonzero"
        />
      </clipPath>
      <clipPath id="id2">
        <path
          d="M 78.121094 79 L 318 79 L 318 319.203125 L 78.121094 319.203125 Z M 78.121094 79 "
          clipRule="nonzero"
        />
      </clipPath>
      <clipPath id="id3">
        <path
          d="M 56.09375 57 L 296 57 L 296 297.175781 L 56.09375 297.175781 Z M 56.09375 57 "
          clipRule="nonzero"
        />
      </clipPath>
    </defs>
    <g clipPath="url(#id1)">
      <rect
        x="-37.5"
        width="450"
        fill="#1c1917"
        y="-37.499999"
        height="449.999989"
        fillOpacity="1"
      />
    </g>
    <path
      fill="#1c1917"
      d="M 300 1.125 C 340.726562 1.125 373.875 34.273438 373.875 75 L 373.875 300 C 373.875 340.726562 340.726562 373.875 300 373.875 L 75 373.875 C 34.273438 373.875 1.125 340.726562 1.125 300 L 1.125 75 C 1.125 34.273438 34.273438 1.125 75 1.125 L 300 1.125 M 300 0 L 75 0 C 33.601562 0 0 33.601562 0 75 L 0 300 C 0 341.398438 33.601562 375 75 375 L 300 375 C 341.398438 375 375 341.398438 375 300 L 375 75 C 375 33.601562 341.398438 0 300 0 Z M 300 0 "
      fillOpacity="1"
      fillRule="nonzero"
    />
    <g clipPath="url(#id2)">
      <path
        fill="#a8a29e"
        d="M 78.121094 269.253906 L 78.121094 319.203125 L 128.070312 319.203125 L 275.449219 171.824219 L 225.5 121.875 Z M 313.941406 133.332031 C 319.136719 128.136719 319.136719 119.679688 313.941406 114.484375 L 282.839844 83.382812 C 277.644531 78.1875 269.1875 78.1875 263.992188 83.382812 L 239.621094 107.757812 L 289.566406 157.707031 Z M 313.941406 133.332031 "
        fillOpacity="1"
        fillRule="nonzero"
      />
    </g>
    <g clipPath="url(#id3)">
      <path
        fill="#fafaf9"
        d="M 56.09375 247.226562 L 56.09375 297.175781 L 106.042969 297.175781 L 253.421875 149.796875 L 203.472656 99.847656 Z M 291.914062 111.304688 C 297.109375 106.109375 297.109375 97.652344 291.914062 92.457031 L 260.8125 61.355469 C 255.617188 56.160156 247.160156 56.160156 241.964844 61.355469 L 217.59375 85.730469 L 267.539062 135.679688 Z M 291.914062 111.304688 "
        fillOpacity="1"
        fillRule="nonzero"
      />
    </g>
  </svg>
)

export default Scrawl
