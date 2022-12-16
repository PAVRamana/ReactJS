import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function SnippetCombo({ onSelectCombo }) {
  const onChangeCombo = (eventObj, values) => {
    onSelectCombo(values);
  };

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        onChange={onChangeCombo}
        options={[
          {
            label: "Snippet1",
            snippet: "Snippet1 Snippet1 Snippet1 Snippet1 Snippet1",
          },
          {
            label: "Snippet2",
            snippet: "Snippet2 Snippet2 Snippet2 Snippet2",
          },
          {
            label: "Snippet3",
            snippet: "Snippet3 Snippet3 Snippet3 Snippet3 Snippet3",
          },
        ]}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Select Snippet" />
        )}
      />
    </>
  );
}

export default SnippetCombo;
