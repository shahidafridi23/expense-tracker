import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    label: "Food & Dining",
    value: "food_dining",
  },
  {
    label: "Transportation",
    value: "transportation",
  },
  {
    label: "Utilities",
    value: "utilities",
  },
  {
    label: "Housing",
    value: "housing",
  },
  {
    label: "Entertainment",
    value: "entertainment",
  },
  {
    label: "Healthcare",
    value: "healthcare",
  },
  {
    label: "Insurance",
    value: "insurance",
  },
  {
    label: "Savings & Investments",
    value: "savings_investments",
  },
  {
    label: "Personal Care",
    value: "personal_care",
  },
  {
    label: "Education",
    value: "education",
  },
  {
    label: "Debt Payments",
    value: "debt_payments",
  },
  {
    label: "Miscellaneous",
    value: "miscellaneous",
  },
  {
    label: "Gifts & Donations",
    value: "gifts_donations",
  },
  {
    label: "Travel",
    value: "travel",
  },
  {
    label: "Clothing",
    value: "clothing",
  },
  {
    label: "Childcare",
    value: "childcare",
  },
  {
    label: "Subscriptions",
    value: "subscriptions",
  },
  {
    label: "Groceries",
    value: "groceries",
  },
  {
    label: "Pets",
    value: "pets",
  },
];

export function Combobox({ category, setCategory }) {
  const [open, setOpen] = React.useState(false);
  console.log(category);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          aria-label="Select Category"
          className="w-full justify-between dark:text-white"
        >
          {category.value
            ? frameworks.find((framework) => framework.value === category.value)
                ?.label
            : "Select category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hidden lg:block" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setCategory({
                      label: framework.label,
                      value: currentValue === category ? "" : currentValue,
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      category === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
