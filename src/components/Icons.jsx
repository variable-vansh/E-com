export const SeedlingIcon = () => (
  <i className="fas fa-seedling icon-seedling"></i>
);
export const LocationIcon = () => (
  <i className="fas fa-map-marker-alt icon-location"></i>
);
export const CartIcon = () => <i className="fas fa-shopping-cart"></i>;
export const SearchIcon = () => <i className="fas fa-search icon-search"></i>;
export const InfoIcon = () => <i className="fas fa-info-circle icon-info"></i>;
export const ChevronDownIcon = ({ className }) => (
  <i className={`fas fa-chevron-down icon-chevron ${className}`}></i>
);
export const CloseIcon = () => <i className="fas fa-times icon-close"></i>;

export const GrainIcon = ({ className }) => (
  <img src="/grain-mix-cart-icon.svg" alt="Grain Mix" className={className} />
);

export const MixIcon = ({ className }) => (
  <i className={`fas fa-blender ${className}`}></i>
);

export const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="20"
    height="20"
    className="trash-icon"
  >
    <path
      fillRule="evenodd"
      d="M5.75 3a.75.75 0 01.75.75v1.5h6.5v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75H5a.75.75 0 01-.75-.75v-1.5A.75.75 0 015.75 3z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M4.5 6.75A.75.75 0 015.25 6h9.5a.75.75 0 01.75.75v9a1.5 1.5 0 01-1.5 1.5H6a1.5 1.5 0 01-1.5-1.5v-9zM5.25 7.5v8.25a.75.75 0 00.75.75h8.5a.75.75 0 00.75-.75V7.5h-10z"
      clipRule="evenodd"
    />
  </svg>
);
