import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ResultBox from "./ResultBox";
import { useEffect, useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";

function App() {
  const testArr = [0, 1, 2, 3, 4];

  const [inputVal, setInputVal] = useState("");
  const [data, setData] = useState();
  const [requestStatus, setRequestStatus] = useState(false);

  function handleInputChange(e) {
    setInputVal(e.target.value);
  }

  const URL = `https://api.abuseipdb.com/api/v2/check?ipAddress=${inputVal}&key=0e1990b43da933a4504c54b8f764e627fe3a58535da2b3e8632454df211b704ba27dd4cfccc48d2b`;

  function retrieveIPInfo() {
    axios
      .get(URL)
      .then(function (response) {
        // handle success
        setData(response.data.data);
        setRequestStatus(true);
        console.log(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  return (
    <div className="App">
      <h1 className="App-header">Bulk IP address checker</h1>

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
        <h2>{inputVal}</h2>
      </Box>

      {data && (
        <Box>
          <Stack spacing={12} direction="row">
            <h1>IP Address</h1>
            <h1>Abuse Score</h1>
            <h1>Domain</h1>
          </Stack>
          <ResultBox data={data} />
        </Box>
      )}
    </div>
  );
}

export default App;
