import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className='w-full px-1 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm border border-slate-200'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-4 py-2.5 text-sm md:text-base font-bold leading-5 rounded-xl transition-all",

                  selected
                    ? "text-white bg-blue-700 shadow-md shadow-blue-100"
                    : "text-slate-600 hover:text-blue-700 hover:bg-slate-100"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='w-full mt-4'>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
