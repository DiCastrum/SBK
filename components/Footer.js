import React from 'react'

const NavItem = props => (
    <section>
        <a href={props.href}
            className="text-sm font-bold text-gray-300 px-2 py-1 hover:bg-gray-300 hover:text-gray-800 rounded transition-colors duration-300"
        >
            {props.text}
        </a>
    </section>
)

const Footer = () => {
    return (
        <footer className="mx-auto bg-gray-800" >
           <elem className="flex justify-between p-4">
                <div className="flex items-center">
                    <NavItem href="/about" text="About"/>  
                </div>
                <div className="block">
                    <ul className="flex space-x-2">
                        <div className="text-sm font-bold text-gray-300 px-2 py-1 ">Dicastrum</div>                        
                    </ul>
                </div>
            </elem>           
        </footer>
    )
}

export default Footer
