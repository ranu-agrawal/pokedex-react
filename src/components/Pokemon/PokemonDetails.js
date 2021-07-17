import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

const PokemonDetails = ({ match }) => {
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(true);
  const id = match.params.id;

  const getData = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    setPokemon(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    getData(id);
  }, []);

  return (
    <>
      {loading ? (
        <h1>Fetching Pokemon...</h1>
      ) : (
        <Row className="all-container details">
          <Col style={{ marginRight: "10rem" }}>
            <Card.Img
              style={{ width: "20rem" }}
              src={pokemon.sprites.other.dream_world.front_default}
              variant="top"
            />
            <Card.Body className={pokemon.types[0].type.name}>
              <Card.Title as="div" style={{ textAlign: "center" }}>
                <strong>
                  #{id} {pokemon.name.toUpperCase()}
                </strong>
              </Card.Title>
            </Card.Body>
            <Card />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card style={{ border: "none" }}>
              <Card.Body>
                <Card.Text style={{ marginBlockStart: "-2rem" }}>
                  <Row>
                    {pokemon.types.map((t) => (
                      <div
                        className={`${t.type.name} `}
                        style={{ color: "black", textAlign: "center" }}
                      >
                        {t.type.name.toUpperCase()}
                      </div>
                    ))}
                  </Row>
                  <Row style={{ textAlign: "center" }}>
                    <Col>
                      <Card.Img
                        style={{ width: "15rem" }}
                        src={pokemon.sprites.front_default}
                      />
                      <Card.Text>Normal Form</Card.Text>
                    </Col>
                    <Col>
                      <Card.Img
                        style={{ width: "15rem" }}
                        src={pokemon.sprites.front_shiny}
                      />
                      <Card.Text>Shiny Form</Card.Text>
                    </Col>
                  </Row>
                  <Row style={{ border: "1px black solid" }}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      Abilities
                    </Col>
                  </Row>
                  <Row className="text-center">
                    {pokemon.abilities.map((a) => (
                      <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                        {a.ability.name.toUpperCase()}
                      </Col>
                    ))}
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PokemonDetails;