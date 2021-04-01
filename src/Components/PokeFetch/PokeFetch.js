import React, { Component } from "react";
import "./PokeFetch.css";

class PokeFetch extends Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
      currentCount: 10,
      answer: "",
    };
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        });
      })
      .catch((err) => console.log(err));
  }

  timer = () => {
    if (this.state.currentCount <= 0) return;
    this.setState({
      currentCount: this.state.currentCount - 1,
    });
    if (this.state.currentCount < 1) {
      clearInterval(this.intervalId);
    }
  };

  componentDidUpdate() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  componentWillUpdate() {
    clearInterval(this.intervalId);
  }

  resetState = () => {
    this.setState({ currentCount: 10 });
  };

  render() {
    return (
      <div className={"wrapper"}>
        <button
          className={"start"}
          onClick={() => {
            this.resetState();
            this.fetchPokemon();
          }}
        >
          Start!
        </button>
        <h1
          className={"timer"}
        >{`Timer Display: ${this.state.currentCount}`}</h1>
        <div className={"pokeWrap"}>
          <img
            className={"pokeImg"}
            src={this.state.pokeSprite}
            style={
              this.state.currentCount === 0
                ? { filter: "brightness(100%)" }
                : { filter: "brightness(0%)" }
            }
            alt=""
          />
          <h1
            className={"pokeName"}
            style={
              this.state.currentCount === 0
                ? { opacity: "1" }
                : { opacity: "0" }
            }
          >
            {this.state.pokeName}
          </h1>
        </div>
      </div>
    );
  }
}

export default PokeFetch;
