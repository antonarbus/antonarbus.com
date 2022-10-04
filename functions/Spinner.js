// functions\Spinner.js
export function Spinner({ color, width, height }) {
  return (
    <svg className="spinner" viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>

      <style jsx>{`
      .spinner {
        animation: rotate 2s linear infinite;
        height: ${(height || width) ? (height || width) : '100%'};
        width: ${(height || width) ? (height || width) : '100%'};
      }
      .spinner .path {
        stroke: ${color ? color : 'lightgrey'};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
      }
      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes dash {
        0% {
          stroke-dasharray: 1, 150;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -35;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -124;
        }
      }
      `}</style>
    </svg>
  )
}