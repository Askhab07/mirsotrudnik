import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import { UserIcon } from '@heroicons/react/24/solid';

export default function SelectMenus({
  uniqLogins,
  onLoginChange,
  selectedLogin,
}) {
  return (
    <Listbox value={selectedLogin} onChange={onLoginChange}>
      <div className="relative">
        <ListboxButton className="grid w-[300px] cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <div>
              <UserIcon className='size-5 text-blue-500'/>
            </div>
            <span className="block truncate">{selectedLogin === "" ? "Все" : selectedLogin}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-500"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
        >
          <ListboxOption
            value=""
            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-500 data-[focus]:text-white data-[focus]:outline-none"
          >
            <div className="flex items-center">
              <div>
                <UserIcon className="size-5" />
              </div>
              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                Все
              </span>
            </div>

            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
              <CheckIcon aria-hidden="true" className="size-5" />
            </span>
          </ListboxOption>
          {uniqLogins.map((login, index) => (
            <ListboxOption
              key={index}
              value={login}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-500 data-[focus]:text-white data-[focus]:outline-none"
            >
              <div className="flex items-center">
                <div>
                  <UserIcon className="size-5" />
                </div>
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {login}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
