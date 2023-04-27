import { useState } from "react";
import Editor from "@monaco-editor/react";
import Navbar from "./Components/Navbar";
import Axios from "axios";
import spinner from "./Spinner.svg";
import './App.css';

function App() {
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(18);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const options = {
    fontSize : fontSize
  };

  function Compile() {
    setLoading(true);
    if(userCode === ``)
      return;
    Axios.post('https://localhost:3000/compile', {
      code : userCode,
      language : userLanguage,
      input : userInput}).then((res) => {
        setUserOutput(res.data.output);
      }).then(() => {
        setLoading(false);
      })
  }

  function clearOutput() {
    setUserOutput("");
  }

  return(
    <div className="App">
      <Navbar
        userLanguage={userLanguage} setUserLanguage={setUserLanguage}
        userTheme={userTheme} setUserTheme={setUserTheme}
        fontSize={fontSize} setFontSize={setFontSize}
      />
      <div className="main">
        <div className="left-container">
          <Editor
            options={options}
            width="100%"
            height="calc(100vh-50px)"
            theme={userTheme}
            language={userLanguage}
            defaultLanguage="Java"
            defaultValue="Start Coding Here....."
            onChange={(value) => { setUserCode(value) }}
          />
          <button className="run-btn" onClick={() => Compile()}>
            Run
          </button>
        </div>
        <div className="right-container">
          <h4>Input:  </h4>
          <div className="input-box">
            <textarea id="code-input" 
              onChange={(e) => setUserInput(e.target.value)}>
            </textarea>
          </div>
          <h4>Output: </h4>
          {loading ? (
            <div className="spinner-box">
              <img src={spinner} alt="Loading....."/>
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button onClick={() => { clearOutput() }} className="clear-btn">
                Clear
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
  );
}

export default App;