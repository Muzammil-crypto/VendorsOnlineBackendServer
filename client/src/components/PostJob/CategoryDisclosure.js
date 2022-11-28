import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { useQuery } from 'react-query';
import { CategoryAPI } from '../../api';
import LoaderIcon from '../../assets/icons/LoaderIcon';

const CategoryDisclosure = ({ selected, setSelected, error }) => {
  const { data: categories, isLoading } = useQuery(
    'categories',
    CategoryAPI.getCategories
  );

  return (
    <div className="w-full ">
      {isLoading ? (
        <LoaderIcon className="mx-auto h-16 w-16 text-primary-400" />
      ) : (
        categories?.map((category, index) => (
          <Disclosure
            defaultOpen={index === 0}
            key={category._id}
            as="div"
            className="mt-0.5"
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full items-center justify-between rounded-md bg-primary-500 py-1 px-2 text-left text-white">
                  {category.name}
                  <ChevronRightIcon
                    className={`h-5 w-5 transition ${open ? 'rotate-90' : ''}`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="bg-primary-500/5 px-2 py-1 text-sm text-gray-500">
                    <ul className="flex flex-wrap gap-x-2 gap-y-1">
                      {category.subcategories.map((subcategory) => (
                        <li
                          key={subcategory._id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 rounded text-primary-500 focus:ring-primary-500"
                            id={`subcategory-${subcategory._id}`}
                            checked={selected === subcategory._id}
                            onChange={() => {
                              if (selected === subcategory._id) {
                                setSelected('');
                              } else {
                                setSelected(subcategory._id);
                              }
                            }}
                          />
                          <label htmlFor={`subcategory-${subcategory._id}`}>
                            {subcategory.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))
      )}

      {error && <div className="mt-1 text-xs text-red-600">* {error}</div>}
    </div>
  );
};

export default CategoryDisclosure;
