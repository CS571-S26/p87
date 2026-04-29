import React from "react";
import wtb136 from '../../assets/WTB_136.png';
import definitelyMadison from "../../assets/definitelyMadison.png"
import B2L from "../../assets/B2L.jpg"

const Home = () => {

    return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{backgroundColor: "red"}}>
        <h1>Welcome to the UW-Madison Smash Club Website!</h1>
      </header>

      <main style={{ marginTop: '40px' }}>
        <section>
          <h2>About Us</h2>
          <p>The Madison Smash Club is an easygoing, informal club that (you guessed it) plays Super Smash Bros. There is
            no club fee, and anyone can come to as many or as few club events as they like. We have weekly meetings ("smashfests")
            every Thursday in Ingraham Hall, as well as biweekly and monthly tournaments. Our main goals are to have fun, foster community,
            and provide a space for casual and competitve players alike to share their love of the game.
           </p>

          <br></br>
          <img src={B2L} width={600} alt="several members of the smash club at a tournament"/>
          <br></br>
          <br></br>

           <h2>How Do I Join?</h2>
           <p>Just show up to an event! You don't have to officially join the club in any way. We do however have a club Discord sever
            where you can get information about upcoming events, chat with other members, and learn about the community. Be sure to check out
            our "Events" page to see our upcoming meetings, and visit our "Getting Started" page if you'd like to join the Discord server!
           </p>

          <br></br>
          <img src={definitelyMadison} alt="players competing at a regional tournament"/>
          <br></br>
          <br></br>

           <h2>What Can I Do On This Website?</h2>
           <p>So far, this website is mostly informational. We'll have info on upcoming club events, how to find and compete in local
            tournaments, and some other fun features like a personalizable "Bios" page. If you're looking to get into the action right away, we 
            highly recommend joining the Discord and seeing if anyone wants to play!

           </p>
           <img src={wtb136} alt="A results graphic from a Smash Brothers event, humerously drawn in crude MS-paint."
            width = '800' height = '600'/>
        </section>
      </main>
    </div>
  );
};

export default Home;
