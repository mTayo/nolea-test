import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import useOutsideClick from 'hooks/useOutsideClick';


interface DropdownItem {
  label: string;
  action: Function;

}

interface DropdownProps {
  id?: string;
  placeholder?: string;
  parentClassName?: string;
  data: DropdownItem[];
  hasCustomContent: boolean;
  anchor?: any;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  style?: string;
  name?: string;
  selectedId?: string;
  className?: string;
  onSelect?: (id: string) => void;
}

const DropdownMenu = ({
  id="drop-down",
  data,
  position = 'bottom-left',
  parentClassName="",
  anchor = null,
  style,
}: DropdownProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);



  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classNames(
    'absolute  w-full w-max max-h-52 overflow-y-auto bg-white border py-3 rounded-lg shadow-md z-10',
    {
      'top-full right-0 mt-2': position === 'bottom-right',
      'top-full left-0 mt-2': position === 'bottom-left',
      'bottom-full right-0 mb-2': position === 'top-right',
      'bottom-full left-0 mb-2': position === 'top-left',
    }
  );

  return (
    <div ref={dropdownRef} className='relative '>
      <div
        id={id}
        aria-label='Select'
        aria-haspopup='true'
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          `   ${parentClassName}`,
          style
        )}
      >
       <> {anchor}</>
      </div>
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
                key={item.label}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className={classNames(
                  'flex items-center cursor-pointer hover:bg-gray-200  text-[14px]  hover:text-black px-3',
                 
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

export default DropdownMenu;
