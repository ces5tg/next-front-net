"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [parametro, setParametro] = useState("");
  const [gif, setGif] = useState("");

  useEffect(() => {
    const loadDatos = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        console.log(apiUrl)
        const res = await axios.get(`${apiUrl}/weatherforecast`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadDatos();
  }, []);

  const changeParametro = (e) => {
    setParametro(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
      axios.get(`${apiUrl}/api/${parametro}`)
        .then(response => {
          console.log(response.data.results[0].media[0].gif.url);
          setGif(response.data.results[0].media[0].gif.url);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <h3>examen 1 - cesar </h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature C</th>
            <th>Summary</th>
            <th>Temperature F</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{d.date}</td>
              <td>{d.temperatureC}</td>
              <td>{d.summary}</td>
              <td>{d.temperatureF}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form action="post" onSubmit={handleSubmit}>
          <input
            type="text"
            value={parametro}
            onChange={changeParametro}
          />
          <button type="submit">enviar</button>
        </form>
        <div>
          <img src={gif} alt="gif" />
        </div>
      </div>
    </div>
  );
}
