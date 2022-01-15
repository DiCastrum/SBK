import React from 'react'

const NavItem = props => (
    <li >
    <a href={props.href}
    className="text-sm font-bold text-gray-700 px-2 py-1 hover:bg-gray-300 rounded transition-colors duration-300"
    >
    {props.text}
    </a>
    </li>
)

const Button = props => (
    <button
     type={props.type} className="bg-red-400 hover:bg-red-500 transition-colors duration-300 text-white text-sm p-2 rounded border border-red-500">{props.children}</button>
)

const NavbarA = () => {
    return (
        <div className="container mx-auto">
           <nav className="flex justify-between p-4">
                <div className="flex items-center">
                    <div className="inline-block h-6 w-6 rounded-full bg-gray-400"/>
                    <span className="ml-2">Notion</span>
                </div>
                <div className="hidden md:block">
                    <ul className="flex space-x-2">
                        <NavItem href="/product" text="Product"/>
                        <NavItem href="/dowload" text="Download"/>
                        <NavItem href="/remote-work" text="Remote Work"/>
                        <NavItem href="/customers" text="Customers"/>
                        <NavItem href="/pricing" text="Pricing"/>
                        <NavItem href="/jobs" text="Jobs"/>
                        <NavItem href="/login" text="Login"/>
                        <NavItem href="/sign-up" text="Sign up"/>
                    </ul>
                </div>
            </nav>
           <div className="text-center md:text-left md:flex max-w-3xl mx-auto mt-12 md:mt-24 space-x-3" >
                <h1 className="font-black  text-6xl leading-tight ">All-in-one workspace</h1>
                <div className="space-y-3">
                <p className="text-xl font-light"> Write plan, collaborate, and get organized. Notion is all you need - in one tool.</p>
                <div className="md:hidden">
                <Button type="button">Downloaded from App Store</Button>
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    console.log("TODO submit form")
                    }}
                    className="hidden md:block space-x-3"
                >
                    <input type="text" placeholder="Enter your email" className="bg-white rounded border border-gray-300 p-2"/>
                    <Button type="submit">Get started</Button>
                </form>
                <p className="text-gray-600 text-sm">For teams & individuals - web, mobile, Mac, Windowns.</p>
                </div>

           </div>

           
        </div>
    )
}

export default NavbarA
