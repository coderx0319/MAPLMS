import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api.js';

function ProfileDropdown({ email, onSignOut }) {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-8 w-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <NavLink
            to="#"
            className="block px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100 truncate"
            title={email} // Show full email on hover
            role="menuitem"
          >
            {isTruncated ? `${email.slice(0, 20)}...` : email}
          </NavLink>
        </MenuItem>
        <MenuItem>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <NavLink
            onClick={onSignOut}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Sign out
          </NavLink>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [token, setToken] = useState('');
  const [user_id, setUID] = useState(0);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    const storedUserType = window.localStorage.getItem('user_type');

    if (storedToken && storedUserType) {
      setToken(storedToken);
      setUserType(parseInt(storedUserType));

      const uid = window.localStorage.getItem('uid');
      const isRegister = window.localStorage.getItem('isregister');
      if (uid && isRegister) {
        setUID(parseInt(uid));
        const fetchEmail = async () => {
          try {
            const response = await api.post(`api/register/getemail/${uid}`);
            if (response.data && response.data.length > 0) {
              setEmail(response.data[0].emailid);
            }
          } catch (err) {
            console.error('Failed to fetch email:', err);
          }
        };
        fetchEmail();
      }
    }
  }, []);

  const handleSignOut = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', userTypes: [1] },
    { name: 'User Selection', href: '/userselection', userTypes: [3] },
  ];

  const formNavigation = [
    { name: 'Add CO Form', href: '/coform', userTypes: [2] },
    { name: 'Add PO Form', href: '/posform', userTypes: [2] },
    { name: 'Add Course', href: '/courseform', userTypes: [2] }
  ];

  const formCurriculum = [
    { name: 'IA1', href: '/ia1', userTypes: [2] },
    { name: 'IA2', href: '/ia2', userTypes: [2] },
    { name: 'Semester', href: '/sem', userTypes: [2] },
    { name: 'Practical', href: '/practical', userTypes: [2] },
    { name: 'Assignment', href: '/assg', userTypes: [2] },
  ];

  const resultNavigation = [
    { name: 'Results', href: '/results', userTypes: [2] },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {token && user_id !== 0 && (
                  <>
                    {navigation.filter(item => item.userTypes.includes(userType)).map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    {userType === 2 && (
                      <>
                        <Menu as="div" className="relative">
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Form
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {formNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                        <Menu as="div" className="relative">
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Curriculum
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {formCurriculum.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                        <NavLink
                          to="/results"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Results
                        </NavLink>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {token && user_id !== 0 && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <ProfileDropdown email={email} onSignOut={handleSignOut} />
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {token && user_id !== 0 && (
            <>
              {navigation.filter(item => item.userTypes.includes(userType)).map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              {userType === 2 && (
                <>
                  <Menu as="div" className="relative">
                    <MenuButton className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Form
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      {formNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <DisclosureButton
                              as="a"
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-base font-medium text-gray-700'
                              )}
                            >
                              {item.name}
                            </DisclosureButton>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                  <Menu as="div" className="relative">
                    <MenuButton className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Curriculum
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      {formCurriculum.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <DisclosureButton
                              as="a"
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-base font-medium text-gray-700'
                              )}
                            >
                              {item.name}
                            </DisclosureButton>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                  <DisclosureButton
                    as="a"
                    href="/results"
                    className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Results
                  </DisclosureButton>
                </>
              )}
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
