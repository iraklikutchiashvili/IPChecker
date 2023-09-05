import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ResultBox from "./ResultBox";
import { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import uuid from "react-uuid";

function App() {
  const r =
    /(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})/g;

  const [inputVal, setInputVal] = useState("");
  const [data, setData] = useState([]);
  const ip = inputVal.match(r);

  function handleInputChange(e) {
    setInputVal(e.target.value);
  }

  function retrieveIPInfo() {
    data.length > 0 && setData([]);
    inputVal.length > 0 &&
      ip.forEach((element) => {
        let URL = `https://api.abuseipdb.com/api/v2/check?ipAddress=${element}&key=0e1990b43da933a4504c54b8f764e627fe3a58535da2b3e8632454df211b704ba27dd4cfccc48d2b`;
        axios
          .get(URL)
          .then(function (response) {
            // handle success
            setData((prev) => [...prev, response.data.data]);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      });
  }
  return (
    <div className="App">
      <h1 className="App-header">Multiple IPv4 address checker</h1>

      <Box
        component="form"
        sx={{
          m: 5,
          width: "100ch",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            retrieveIPInfo();
          }}
        >
          Check
        </Button>
        <TextField
          id="outlined-multiline-flexible"
          label="Input Text"
          multiline
          maxRows={50}
          fullWidth
          sx={{ mt: 3 }}
          onChange={handleInputChange}
          value={inputVal}
        />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {ip && (
            <>
              <h3>Checking IPs:</h3>
              <ul>
                {ip.map((elem) => (
                  <li key={uuid()}>{elem}</li>
                ))}
              </ul>
            </>
          )}
        </Box>
      </Box>

      {data.length > 0 && (
        <Box>
          <Stack spacing={14} direction="row">
            <h1>IP Address</h1>
            <h1>Abuse Score</h1>
            <h1>Domain</h1>
          </Stack>
          {data.map((elem) => (
            <ResultBox key={uuid()} data={elem} />
          ))}
        </Box>
      )}
    </div>
  );
}

export default App;
