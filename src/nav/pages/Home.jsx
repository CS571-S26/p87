import React from "react";
import wtb136 from '../../assets/WTB_136.png';

const Home = () => {

    return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header>
        <p>Placeholder homepage. Welcome to the UW-Madison Smash Brother's club!</p>
      </header>

      <main style={{ marginTop: '40px' }}>
        <section>
          <h2>Getting Started</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
             Sed sit amet viverra dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Duis blandit vulputate ipsum, vitae rutrum augue hendrerit eu.
               In sit amet nulla faucibus, accumsan turpis porta, laoreet quam. Praesent eu scelerisque velit. 
               Cras posuere varius posuere. Pellentesque id augue eu nulla efficitur maximus at in lectus. 
               Maecenas nec orci sed felis interdum elementum.
           </p>
           <img src={wtb136} alt="A results graphic from a Smash Brothers event, humerously drawn in crude MS-paint."
            width = '800' height = '600'/>
        </section>
      </main>
    </div>
  );
};

export default Home;
