"use client";

import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div
      className={`transition-all grid w-full space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-${tabOptions.length}`}
    >
      {tabOptions.map((tabOption) => (
        <div>
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
