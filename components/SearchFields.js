import React from 'react'

const SearchFields = ({setDanceStyle, setVenueType, onSubmit}) => {
    return (
        <>
        <h1 className="text-center mt-10 text-2xl font-bold text-gray-700">Search by Dance or Venue Type</h1>
        <section className="bg-gray-200  mx-5 mt-10 mb-5 md:mb-0 md:mt-20 rounded">
            {/* Dance Style */}
            <div className="px-2 py-5" >                
                <label 
                    className="block text-center  text-gray-800 p-2" >Dance Style
                </label>   
                <select className="block mx-auto w-11/12 m-2 p-1  border-2 border-gray-600 "
                    name="country" onChange={e => setDanceStyle(e.target.value)} 
                >
                    <option defaultValue></option>
                    <option value="Salsa">Salsa</option>
                    <option value="Bachata">Bachata</option>
                    <option value="Kizomba">Kizomba</option>
                </select>           
            </div>
             {/* Venue Type */}
             <div className="px-2 py-5" >                
                <label 
                    className="block text-center  text-gray-800 p-2" >Venue Type
                </label>   
                <select className="block mx-auto w-11/12 m-2 p-1  border-2 border-gray-600 "
                    name="country" onChange={e => setVenueType(e.target.value)}
                >
                    <option defaultValue></option>
                    <option value="Classes">Classes</option>
                    <option value="Social">Social</option>
                    <option value="Studio">Studio</option>
                    <option value="Congress">Congress</option>
                </select>           
            </div>
        </section>                 
        </>
    )
}

export default SearchFields
