import React from "react";
import teddyTheGoat from "../../assets/teddyTheGoat.png"

function Getting_Started() {

    return (
        <div>
            <h1><strong>Getting Started</strong></h1>
            <p>This is your page for smash-related resources and first steps!</p>
            <br></br>
            <img src={teddyTheGoat} width={600}></img>
            <br></br>
            <br></br>
            <h2>Club Resources</h2>
            <p>The official club Discord server has just about everything you could need for club events! This is also your
                best way to connect with other players and arrange informal games or other activities. Consider joining today and
                see what's going on!
            </p>
            <a href={"https://discord.gg/KXNHQnN5w8"}>Official Club Discord</a>

            <br></br>
            <br></br>
            <br></br>

            <h2>Other Resources</h2>
            <p>To participate in local tournaments, you will need to sign up for an account with Start.gg, which is the website that
                nearly every tournament is run with. Signing up for an account is completely free, and will allow you to get your
                competition on! Do be sure to choose your username carefully, since many tournament-goers will know you better by this 
                "tag" than by your actual name.
            </p>
            <a href={"https://www.start.gg/"}>Start.gg</a>

            <br></br>
            <br></br>
            <br></br>

            <h2>FAQs</h2>
            <p>Q: Do I need to bring anything to club meetings?<br></br>A: Nope! We have Nintendo
                Switches, monitors, and even loaner controllers that you can show up and use. You are more than welcome to bring your own 
                hardware, but you don't need to. For non-club tournaments though, you will need to bring your own controller. <br></br><br></br>
                Q: I just play the game casually, will everyone be too competitive?<br></br> A: Nope again! We have a wide variety of players
                who range from competitive to very casual, and we make sure to run a mix of casual and more competitive events. <br></br><br></br>
                Q: Does the club play more than one Smash game?<br></br>A: Yes! While we primarily play Ultimate, there will
                typically be people playing Melee at our weekly "smashfests". At our monthly tournament series, we run an Ultimate bracket,
                a Melee bracket, and a Project+ bracket.<br></br><br></br>

                Have more questions? Feel free to message wafflemage on Discord {":)"}
            </p>

        </div>
    )
}

export default Getting_Started