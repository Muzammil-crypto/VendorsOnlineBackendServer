import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import Map from '../Map';
import { GeocodeAPI } from '../../../api';
import { useQuery } from 'react-query';
import useDebounce from '../../../hooks/useDebounce';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter';
import Suggestions from './Suggestions';

const LocationInput = ({ value, onChange, onBlur, error }) => {
  const [isOpen, setIsOpen, ref] = useOutsideAlerter(false);
  const [showSuggestions, setShowSuggestions, suggestionsRef] =
    useOutsideAlerter(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    onChange({
      ...value,
      address: search,
    });
  }, [search]);

  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch) setShowSuggestions(true);
  }, [debouncedSearch]);

  const { data: suggestions, isLoading: suggestionsLoading } = useQuery(
    ['geocode', debouncedSearch.trim()],
    () => GeocodeAPI.getLatLngFromAddress({ address: debouncedSearch.trim() }),
    {
      enabled: !!debouncedSearch,
    }
  );

  const [pinHasChanged, setPinHasChanged] = useState(false);
  const { data: pinLocation, isLoading: loadingPinLocation } = useQuery(
    ['geocode', value.lat?.toFixed(7), value.lng?.toFixed(7)],
    () => {
      // only seven digits after decimal point
      return GeocodeAPI.getAddressFromLatLng({
        lat: value.lat?.toFixed(7),
        lng: value.lng?.toFixed(7),
      });
    },
    {
      enabled: pinHasChanged && !!value.lat && !!value.lng,
    }
  );

  useEffect(() => {
    setPinHasChanged(false);
    if (loadingPinLocation) {
      onChange({
        ...value,
        address: 'loading...',
      });
    } else if (pinLocation) {
      onChange({
        ...value,
        address: pinLocation.formattedAddress,
      });
    } else {
      onChange({ lat: null, lng: null, address: '' });
    }
  }, [pinLocation, loadingPinLocation]);

  return (
    <div className="relative w-full">
      <div className="relative w-full cursor-default text-left" onBlur={onBlur}>
        <label htmlFor="location" className="cursor-pointer font-medium">
          Location
        </label>
        <div className="relative w-full">
          <input
            id="location"
            type="text"
            placeholder="Eg San Francisco, CA"
            className="mt-0.5 w-full cursor-text rounded-md border border-gray-300 px-2 py-1.5 pr-8 text-sm text-gray-800 transition focus:border-primary-500 focus:ring-1 focus:ring-primary-600"
            value={value.address}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
          <LocationMarkerIcon
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-primary-500"
            onClick={() => setIsOpen(true)}
          />

          <Transition
            show={showSuggestions}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Suggestions
              suggestions={suggestions}
              isLoading={suggestionsLoading}
              setLocation={(value) => {
                onChange(value);
                setIsOpen(true);
                setShowSuggestions(false);
              }}
              ref={suggestionsRef}
            />
          </Transition>
        </div>
        {error && <div className="mt-1 text-xs text-red-600">* {error}</div>}
      </div>

      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div
          ref={ref}
          className="absolute left-0 bottom-0 z-10 translate-y-1/2 translate-x-full"
        >
          <div className="aspect-square w-72 overflow-hidden rounded border border-gray-400 bg-white shadow-lg">
            <Map
              selectedPosition={value}
              setSelectedPosition={(value) => {
                setPinHasChanged(true);
                onChange(value);
              }}
            />
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default LocationInput;
