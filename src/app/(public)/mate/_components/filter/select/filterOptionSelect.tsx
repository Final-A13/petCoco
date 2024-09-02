import { Select, SelectSection, SelectItem } from "@nextui-org/react";

interface FilterOptionSelectChipProps {
  label: string;
  array: Array<{ key: string; label: string }>;
  onSelect: (value: string) => void;
  selected: string | null;
}

const FilterOptionSelect = ({ label, array, onSelect, selected }: FilterOptionSelectChipProps) => {
  return (
    <div className="mt-5 w-full">
      <Select
        size="sm"
        radius="full"
        label={label}
        color="default"
        className="w-full"
        value={selected || ""}
        onChange={(e) => onSelect(e.target.value || "")}
        selectedKeys={selected ? [selected] : []}
      >
        {array.map((arr) => (
          <SelectItem key={arr.key} value={arr.key}>
            {arr.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default FilterOptionSelect;