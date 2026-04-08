import { useState } from 'react'
import SmashBio from '../../SmashBio'
import { Card, Button } from 'react-bootstrap'


function Bios() {


  const Amorgos = {
    name: "Amorgos",
    image: "https://media.eventhubs.com/images/ssbu/character_header_shulk_alt.jpg",
    character: "Shulk",
    favoriteMode: "Squad Strike",
    bio: "Now it's Shulk Time!!"
  }


  const BairForceOne = {
    name: "Bair Force One",
    image: "https://media.eventhubs.com/images/ssbu/character_header_donkey-kong_alt.jpg",
    character: "Donkey Kong",
    favoriteMode: "Randubs",
    bio: "Mii swordfighter is cool and awesome"
  }


  const TheMaster42 = {
    name: "TheMaster42",
    image: "https://media.eventhubs.com/images/ssbu/character_header_greninja_alt.jpg",
    character: "Greninja",
    favoriteMode: "Singles",
    bio: "Frog."
  }


  const Storm = {
    name: "Storm",
    image: "https://media.eventhubs.com/images/ssbu/character_header_joker_alt.jpg",
    character: "Joker",
    favoriteMode: "Randubs",
    bio: "For his netural special, he wields a gun"
  }


  return (
    <div>
      <h1><strong>Club Leadership Bios</strong></h1>


      <SmashBio {...Amorgos}></SmashBio>
      <br></br>
      <SmashBio {...BairForceOne}></SmashBio>
      <br></br>
      <SmashBio {...TheMaster42}></SmashBio>
      <br></br>
      <SmashBio {...Storm}></SmashBio>
    </div>
  )
}


export default Bios
