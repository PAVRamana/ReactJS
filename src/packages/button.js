import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import CallSplitIcon from "@mui/icons-material/CallSplit";

function ButtonCmp({
  onClickAdd,
  onClickUp,
  onClickDown,
  onCellUpClick,
  onCellDownClick,
}) {
  return (
    <div style={{ display: "flex", marginBottom: "12px" }}>
      <AddIcon
        onClick={() => {
          onClickAdd();
        }}
      />
      <ArrowUpwardIcon onClick={onClickUp} />
      <ArrowDownwardIcon onClick={onClickDown} />
      <CallMergeIcon onClick={onCellUpClick} />
      <CallSplitIcon onClick={onCellDownClick} />
    </div>
  );
}

export default ButtonCmp;
