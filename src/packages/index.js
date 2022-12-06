import TextareaCmp from "./text-area";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ButtonCmp from "./button";
import "./index.css";

function Container() {
  const [selectedCellIndex, setSelectedCellIndex] = useState("");
  const [cellData, setCellData] = useState([
    {
      id: uuid(),
      data: undefined,
    },
  ]);

  const onClickAdd = () => {
    const cells = [...cellData];
    const id = uuid();
    setCellData([
      ...cells,
      ...[
        {
          id: id,
          data: undefined,
        },
      ],
    ]);
  };

  const onChangeTextArea = (id, data) => {
    const cells = [...cellData];
    setCellData(
      cells?.map((cell) => {
        if (cell.id === id) {
          cell.data = data;
        }
        return cell;
      })
    );
  };

  const moveCells = (cells, currentIndex, prevOrNextIndex) => {
    cells[currentIndex] = cells.splice(
      prevOrNextIndex,
      1,
      cells[currentIndex]
    )[0];
    return cells;
  };

  const onClickUp = () => {
    if (cellData?.length > 0 && selectedCellIndex !== "") {
      if (selectedCellIndex === 0) {
        return;
      }
      const cells = [...cellData];
      setCellData(moveCells(cells, selectedCellIndex, selectedCellIndex - 1));
      setSelectedCellIndex(selectedCellIndex - 1);
    }
  };

  const onClickDown = () => {
    if (cellData?.length > 0 && selectedCellIndex !== "") {
      if (selectedCellIndex === cellData?.length - 1) {
        return;
      }
      const cells = [...cellData];
      setCellData(moveCells(cells, selectedCellIndex, selectedCellIndex + 1));
      setSelectedCellIndex(selectedCellIndex + 1);
    }
  };

  return (
    <>
      <div className="center">
        <ButtonCmp
          onClickAdd={onClickAdd}
          onClickUp={onClickUp}
          onClickDown={onClickDown}
        />
      </div>
      <div className="center">
        <div>
          {cellData?.length > 0 &&
            cellData?.map((item, index) => {
              return (
                <div
                  style={{
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => {
                    setSelectedCellIndex(index);
                  }}
                >
                  <div style={{ padding: "10px" }}>
                    <TextareaCmp
                      id={item.id}
                      data={item.data}
                      onChangeTextArea={onChangeTextArea}
                      autoSelect={selectedCellIndex === index}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Container;
