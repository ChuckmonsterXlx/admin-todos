"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
    router.refresh();
  };

  const gridTemplateColumns = `repeat(${tabOptions.length}, minmax(0, 1fr))`;

  return (
    <div
      style={{ gridTemplateColumns }}
      className={`transition-all grid w-full space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((tabOption) => (
        <div key={tabOption}>
          <input
            checked={selected === tabOption}
            onChange={() => {}}
            type="radio"
            id={tabOption.toString()}
            className="hidden peer"
          />
          <label
            onClick={() => onTabSelected(tabOption)}
            className="block p-2 text-center cursor-pointer select-none rounded-xl peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tabOption}
          </label>
        </div>
      ))}
    </div>
  );
};
