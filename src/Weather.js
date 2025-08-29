import { useState } from "react"


export default function Weather(){
    const [city ,setCity] = useState("")
    const [cityData ,setCityData] = useState(null)
    const [loading ,setLoading] = useState(false)

    const apikey = "8501c8516fa148e89e892154252908";

    const handleSubmit = (e) => {
                        e.preventDefault()
                        setLoading(true)
            setTimeout(async()=> {
                try {
                        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)
                        if (!response.ok) throw new Error("Failed to fetch weather data");

                        const result = await response.json()
                        setLoading(false)
                        setCityData(result)
                        console.log(result)

                } catch (error) {
                        alert('Failed to fetch weather data')
                        setLoading(false)
                }
            
        
            },3000)
    }
   

    return(

        <div style={{padding:"2rem", textAlign:"center"}}>
            <form onSubmit={handleSubmit} >
                <input 
                    
                    placeholder="Enter city name"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <button style={{padding:"0.5rem" , backgroundColor:"greenyellow" ,borderRadius:"8px"}}
                 type="submit">Search</button>
            </form>  
            <br/>
            { loading && (<p>Loading data...</p>) }
            { !loading && cityData && (
                <div className="weather-cards" style={{display:"flex", justifyContent:"space-around", textAlign:"center"}}> 
                <div className="weather-card">
                    <h3>Temperature</h3>
                    <p>{cityData.current.temp_c} °C</p>
                </div>
                <div className="weather-card">
                    <h3>Humidity</h3>
                    <p>{cityData.current.humidity} %</p>
                </div>
                <div className="weather-card">
                    <h3>Condition</h3>
                    <p>{cityData.current.condition.text}</p>
                </div>
                <div className="weather-card">
                    <h3>Wind Speed</h3>
                    <p>{cityData.current.gust_kph} kph</p>
                </div>
            </div>
            )}
                
            
            
                    


            
        </div>

    )
}