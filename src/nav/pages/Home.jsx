import React from "react";

const Home = () => {

const buttonPress = () => {
    alert("button pressed");
};

    return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header>
        <p>Placeholder homepage.</p>
      </header>

      <main style={{ marginTop: '40px' }}>
        <section>
          <h2>Getting Started</h2>
          <p>Sample button.</p>
          <button 
            onClick={buttonPress}
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            Button
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
