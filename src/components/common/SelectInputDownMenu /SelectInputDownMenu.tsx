import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import ChevronDown from 'assets/icons/chevron-down.svg';
import './selectdropdownmenu.scss';
import useOutsideClick from 'hooks/useOutsideClick';


interface DropdownItem {
  value: string;
  label: string;

}

interface DropdownProps {
  id?: string;
  label: string;
  placeholder?: string;
  value?: string;
  parentClassName?: string;
  data: DropdownItem[];
  hasCustomContent: boolean;
  anchor?: any;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  style?: string;
  name: string;
  selectedId?: string;
  dropdownClassName?: string;
  className?: string;
  onSelect?: (id: string, name: string) => void;
  showErrorMessage: any,
  errorMessage: any,
}

const DropDownMenu = ({
  id,
  label,
  placeholder = 'Select',
  data,
  position = 'bottom-left',
  hasCustomContent= false,
  parentClassName="",
  anchor = null,
  className,
  dropdownClassName= "",
  name,
  style,
  selectedId,
  value,
  errorMessage,
  onSelect,
}: DropdownProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.value === selectedId) : undefined
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.value, name);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.value == selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classNames(
    `absolute  w-full max-h-52 overflow-y-auto bg-white py-3 rounded-lg shadow-md z-10 ${dropdownClassName}`,
    {
      'top-full right-0 mt-2': position === 'bottom-right',
      'top-full left-0 mt-2': position === 'bottom-left',
      'bottom-full right-0 mb-2': position === 'top-right',
      'bottom-full left-0 mb-2': position === 'top-left',
    }
  );

  return (
    <div ref={dropdownRef} className='relative '>
        <label className="text-[14px]  font-medium">{label}</label>
      <div
        id={id}
        aria-label='Select'
        aria-haspopup='true'
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          ` flex justify-between items-center gap-x-2 rounded w-full  mt-1  ${parentClassName}`,
          style
        )}
      >
        {hasCustomContent?(
           <> {anchor}</>
        ):(
            <span className={`text-sm ${!selectedItem?.label? 'text-[#6b7280]': ''}`}>{selectedItem?.label || placeholder}</span>
        )}
        
        <img 
            src={ChevronDown} 
            className={classNames('transform duration-500 ease-in-out', {
            'rotate-180': isOpen,
            })}
        />
      
      </div>
      <div className='mb-4'>
        <div className="text-red-500 text-sm absolute mb-3">{errorMessage  || ''}</div>
      </div>
      {/* Open */}
      {isOpen && (
        <div aria-label='Dropdown menu ' className={dropdownClass}>
          <ul
            role='menu'
            aria-labelledby={id}
            aria-orientation='vertical'
            className='leading-10'
          >
            {data?.map((item) => (
              <li
                key={item.value}
                onClick={() => handleChange(item)}
                className={classNames(
                  'flex items-center cursor-pointer hover:bg-gray-200 text-black  hover:text-black px-3',
                  { 'bg-gray-300': selectedItem?.value === item.value }
                )}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
