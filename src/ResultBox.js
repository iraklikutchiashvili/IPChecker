import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function ResultBox(props) {
  return (
    <Box sx={{ m: 2 }}>
      <Stack spacing={21} direction="row">
        <p>{props.data.ipAddress}</p>
        <p>{props.data.abuseConfidenceScore}%</p>
        <p>{props.data.domain}</p>
      </Stack>
    </Box>
  );
}

export default ResultBox;
