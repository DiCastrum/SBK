/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"



// const user = {
//   name: 'Pedro',
//   email: 'test@example.com',
//   imageUrl:
//     '',
// }
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Map', href: 'map', current: false },
  { name: 'Add Venue', href: '#', current: false },
  { name: 'Find a partner', href: '#', current: false },
  
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {


  const { data: session, status } = useSession()

  let image = ""

  if (status === "authenticated" ) {
    (session.user.image) ? image = session.user.image : image = "/userIcon.png"
    console.log(session)
    console.log(session.user.image)
  }
  

  return (
    <>
    <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossorigin=""
    />
    </Head>


      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <Image className="rounded-full h-8 w-8" src="/danceIcon.png" alt="Vercel Logo" width={45} height={45} />
                    
                    
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"                            
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {(session && (
                  
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      
                      
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          {status === "authenticated" &&
                          <>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                             <img className="h-8 w-8 rounded-full" src={image} alt="" />
                            
                          </Menu.Button>
                          </>}

                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              <a className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => signOut()}>Sign Out</a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  
                  
                  ))}
                  {!session && (
                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={() => signIn()}                           
                    >Sign In</button>
                  )}
                  
                  <div className="-mr-2 flex md:hidden">

                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">

                  {(session && (
                    <>
                      
                      {status === "authenticated" && 
                      <> 
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={image} alt="" />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">{session.user.name}</div>
                          <div className="text-sm font-medium leading-none text-gray-400">{session.user.email}</div>
                        </div>                        
                      </div>
                      </>}

                      <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                            <Disclosure.Button>
                              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700" onClick={() => signOut()}>Sign Out</a>
                            </Disclosure.Button>
                      </div>
                  </>
                  ))}

                  {!session && (
                    <a className="block px-6 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer" onClick={() => signIn()}                           
                    >Sign In</a>
                  )}

                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}