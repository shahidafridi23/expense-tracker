import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [hasExpenses, setHasExpenses] = useState(false);

  return (
    <ExpenseContext.Provider value={{ hasExpenses, setHasExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);
