import Weather from "./Weather"

function Results({ countriesToShow, setFilter }) {
  if (countriesToShow.length === 1) {
    const country = countriesToShow[0]

    return (
      <>
        <h1>{country.name.common}</h1>
        Capital: {country.capital.map(capital => capital)} <br />
        Area: {country.area}

        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>

        <img className="flag" alt="Country flag" src={country.flags.svg}></img>

        <Weather country={country.name.common} />
      </>
    )
  }

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    countriesToShow.map(country => {
      return (
        <div key={country.name.common}>
          <br />{country.name.common} <button value={country.name.common} onClick={event => setFilter(event.target.value)}>show</button>
        </div>
      )
    })
  )
}

export default Results