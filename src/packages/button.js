import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function ButtonCmp({ onClickAdd, onClickUp, onClickDown }) {
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <AddIcon onClick={onClickAdd} />
      <ArrowUpwardIcon onClick={onClickUp} />
      <ArrowDownwardIcon onClick={onClickDown} />
    </div>
  );
}

export default ButtonCmp;
