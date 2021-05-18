import React, { useState, useEffect } from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";

import { getAllPokemon, getPokemon } from "./services/pokemon";

import PokeCard from "./components/Card/PokeCard";
import { Button, Form, Select, Card } from "antd";
const { Meta } = Card;
function App() {
  const generarNot = () => {
    if ("serviceWorker" in navigator) {
      send().catch((err) => console.error(err));
    }
  };

  const [pokemonData, setPokemonData] = useState([]);

  const { Option } = Select;

  const [loading, setLoading] = useState(true);

  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  const evitarLoop = true;

  useEffect(() => {
    async function fetchData() {
      var response = await getAllPokemon(initialUrl);
      console.log(response);

      var pokemon = await loadingPokemon(response.results);
      console.log(pokemon);
      setLoading(false);
    }

    fetchData();
  }, [evitarLoop]);

  const loadingPokemon = async (data) => {
    var _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        var pokemonRecord = await getPokemon(pokemon.url);

        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de pokemons</h1>

        <Button type="primary" onClick={generarNot}>
          Notificación
        </Button>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Container className="pokemonsContainer">
            <Row className="justify-content-md-center">
              {pokemonData.map((pokemon, i) => {
                return (
                  <Col sm>
                    <PokeCard key={i} pokemon={pokemon}></PokeCard>
                    <br></br>
                  </Col>
                );
              })}
            </Row>
          </Container>
        )}
      </header>
    </div>
  );
}

const publicVapidKey =
  "BH-nSg8sAoMgB9c0qMdxW5-CgyF6piyPcnJjZD0eq6ELgQsdLrgBu5OLmlemeGABSs2r9U7nDN7vWJX3eVV42OE";

// Registra el sw, la push y la envia
async function send() {
  console.log("Registrando el service worker");

  const register = await navigator.serviceWorker.register(
    "./service-worker.js",
    {
      scope: "/",
    }
  );
  console.log("Service worker registrado....");

  console.log("Registrado el push");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  console.log("Push registrada");

  // enviar la notificacion push
  console.log("enviando push...");

  await fetch("https://serverpwapoke.herokuapp.com/notificacion", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Push enviada");
}

export default App;
