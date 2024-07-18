import { WalletMinimal } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <WalletMinimal width={40} height={40} fontWeight={500} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tighter ml-2">
        Expense Tracker
      </h1>
    </div>
  );
};

export default Logo;
