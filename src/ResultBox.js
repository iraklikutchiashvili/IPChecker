import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function ResultBox(props) {
  const { ipAddress, abuseConfidenceScore, domain } = props.data;

  return (
    <Box sx={{ m: 2 }}>
      <Stack spacing={21} direction="row">
        <p>{ipAddress}</p>
        <p style={{ color: abuseConfidenceScore >= 50 ? "red" : "black" }}>
          {abuseConfidenceScore}%
        </p>
        <p>{domain}</p>
      </Stack>
    </Box>
  );
}

export default ResultBox;
