import { SvgHOC } from '../svg/SvgHOC';

const LightningIcon = SvgHOC(({ fill = 'url(#lightning-gradient)', className = '', ...props }) => {
  return (
    <svg
      width="12"
      height="24"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Purple gradient for lightning */}
        <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>

        {/* Background gradient */}
        <linearGradient id="background-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        <mask id="lightning-mask">
          <rect width="12" height="24" fill="white" />
          <path
            d="M2.9595 23.0191L3.09035 23.4817L3.21927 23.9462L5.03824 23.4347L4.78028 22.5096L2.9595 23.0191Z"
            fill="black"
          />
          <path
            d="M8.88683 1.12989L8.77239 1.13704L8.6751 1.19591L6.60516 2.43486L6.85079 2.84887L7.09731 3.26122L9.07085 2.07948L9.95458 2.01809L9.88676 1.05803L8.88683 1.12989Z"
            fill="black"
          />
          <path
            d="M11.2472 11.8563L11.6159 11.5467L11.9826 11.2352L11.1051 10.1967L10.3716 10.8158L11.2472 11.8563Z"
            fill="black"
          />
        </mask>
      </defs>

      {/* Main lightning bolt with mask applied */}
      <g mask="url(#lightning-mask)">
        {/* Lightning bolt main shape */}
        <path
          d="M8.59001 1.8862L0.897705 13.4314L3.78232 13.4314L4.74386 13.4314L3.78232 23.0524C5.65984 19.6709 3.79183 22.9572 3.79183 22.9572L7.16234 17.2798L8.59001 14.3935L10.5131 11.5072H6.66694L8.59001 1.8862Z"
          fill="white"
        />

        {/* Lightning bolt outline */}
        <path
          d="M9.06138 1.98011L7.25286 11.0261H11.3469L10.93 11.7477L10.9281 11.7496C10.9274 11.7508 10.9258 11.7527 10.9244 11.7552C10.9214 11.7602 10.917 11.7678 10.9112 11.7777C10.8997 11.7976 10.8828 11.8275 10.8605 11.8661C10.8159 11.9431 10.7505 12.0563 10.6671 12.2005C10.5001 12.4891 10.2613 12.9025 9.97221 13.4013C9.39362 14.3998 8.61535 15.7428 7.81626 17.1144C6.57431 19.246 5.26555 21.473 4.58984 22.5845C4.48315 22.7776 4.35593 23.0099 4.20298 23.2854L3.30341 23.0054L4.21237 13.9124H0L8.18998 1.61932L9.06138 1.98011ZM1.79537 12.9503H5.27532L4.48468 20.8444L6.70072 17.1144C6.71442 17.0909 6.72647 17.0665 6.74016 17.043L8.15993 14.1792L8.17308 14.1529L8.18998 14.1266L9.61539 11.9882H6.08098L7.6416 4.1749L1.79537 12.9503Z"
          fill="url(#lightning-gradient)"
        />

        {/* Additional lightning detail */}
        <path
          d="M6.20279 15.3355L6.36593 15.7886L6.52995 16.24L10.3766 14.8449L10.0486 13.942L6.20279 15.3355Z"
          fill="white"
        />
      </g>
    </svg>
  );
});

export default LightningIcon;
