import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import { useMediaQuery } from "react-responsive";
import useMetamask from "./hooks/useMetamask";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";
import Home from "./pages/Home/Home";

function Root() {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const { status, connect, account } = useMetamask();

  return (
    <div className="App">
        <Header
          variant={isMobile ? "mobile" : "desktop"}
          status={
            status === "initializing" || status === "connecting"
              ? "notConnected"
              : status
          }
          account={account}
          onConnect={connect}
          children={null}
        />
        <div className="appContainer">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </div>
    </div>
  );
}

function App() {
  return (
    <MetaMaskProvider>
      <Root />
    </MetaMaskProvider>
  );
}

export default App;
