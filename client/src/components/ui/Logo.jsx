const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-wallet-minimal"
      >
        <path d="M17 14h.01" />
        <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
      </svg>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tighter ml-2">
        Expense Tracker
      </h1>
    </div>
  );
};

export default Logo;
