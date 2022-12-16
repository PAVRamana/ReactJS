import TextareaCmp from "./text-area";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ButtonCmp from "./button";
import SnippetCombo from "./snippet-combo";
import "./index.css";

function Container() {
  const [selectedCellIndex, setSelectedCellIndex] = useState("");
  const [cellData, setCellData] = useState([
    {
      id: uuid(),
      data: undefined,
      name: "textInputName0",
      textInputName0: undefined,
    },
  ]);

  const onClickAdd = (templateData) => {
    const cells = [...cellData];
    const id = uuid();
    setCellData([
      ...cells,
      ...[
        {
          id: id,
          data: templateData ? templateData : undefined,
          name: `textInputName${cells?.length}`,
          [`textInputName${cells?.length}`]: templateData
            ? templateData
            : undefined,
        },
      ],
    ]);
  };

  const onChangeTextArea = (id, data) => {
    const cells = [...cellData];
    setCellData(
      cells?.map((cell, index) => {
        if (cell.id === id) {
          cell.data = data;
          cell[`textInputName${index}`] = data;
        }
        return cell;
      })
    );
  };

  const moveCells = (cells, currentIndex, prevOrNextIndex) => {
    cells[currentIndex] = cells?.splice(
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
      setCellData(
        reArrangeDataIndex(
          moveCells(cells, selectedCellIndex, selectedCellIndex - 1)
        )
      );
      setSelectedCellIndex(selectedCellIndex - 1);
    }
  };

  const onClickDown = () => {
    if (cellData?.length > 0 && selectedCellIndex !== "") {
      if (selectedCellIndex === cellData?.length - 1) {
        return;
      }
      const cells = [...cellData];
      setCellData(
        reArrangeDataIndex(
          moveCells(cells, selectedCellIndex, selectedCellIndex + 1)
        )
      );
      setSelectedCellIndex(selectedCellIndex + 1);
    }
  };

  const reArrangeDataIndex = (cellInfo) => {
    return cellInfo?.map((item, index) => {
      item.name = `textInputName${index}`;
      let existingDataKey;
      Object.keys(item).forEach((key) => {
        if (key.indexOf("textInputName") !== -1) {
          existingDataKey = key;
        }
      });
      const existingData = item[existingDataKey];
      delete item[existingDataKey];
      item[`textInputName${index}`] = existingData;
      return item;
    });
  };

  const onCellUpClick = () => {
    if (selectedCellIndex === "") {
      return;
    }
    const cells = [...cellData];
    selectedCellIndex === 0
      ? setCellData(
          reArrangeDataIndex(
            [
              {
                id: uuid(),
                data: undefined,
                name: "textInputName0",
                textInputName0: undefined,
              },
            ].concat(cells)
          )
        )
      : insertCellAtPosition(cells, selectedCellIndex);
    preSelectCell(selectedCellIndex);
  };

  const insertCellAtPosition = (cells, selectedIndex) => {
    setCellData(
      reArrangeDataIndex([
        ...cells?.slice(0, selectedIndex),
        ...[
          {
            id: uuid(),
            data: undefined,
            name: "textInputName0",
            textInputName0: undefined,
          },
        ],
        ...cells?.slice(selectedIndex),
      ])
    );
  };

  const onCellDownClick = () => {
    if (selectedCellIndex === "") {
      return;
    }
    const cells = [...cellData];
    selectedCellIndex === cells?.length - 1
      ? setCellData(
          reArrangeDataIndex(
            cells?.concat([
              {
                id: uuid(),
                data: undefined,
                name: "textInputName0",
                textInputName0: undefined,
              },
            ])
          )
        )
      : insertCellAtPosition(cells, selectedCellIndex + 1);
    preSelectCell(selectedCellIndex + 1);
  };

  const onSelectSnippetCombo = (values) => {
    if (selectedCellIndex !== "") {
      const cells = [...cellData];
      setCellData(
        cells?.map((item, index) => {
          if (index === selectedCellIndex) {
            const updatedData = `${item.data ? item.data : ""}  ${
              values?.snippet
            }`?.trim();
            item.data = updatedData;
            item[`textInputName${index}`] = updatedData;
            return item;
          }
          return item;
        })
      );
    } else {
      onClickAdd(values?.snippet);
    }
  };

  const preSelectCell = (selectedIndex) => {
    setSelectedCellIndex("");
    setTimeout(() => {
      setSelectedCellIndex(selectedIndex);
    }, 0);
  };

  return (
    <>
      <div
        className="center"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <ButtonCmp
          onClickAdd={onClickAdd}
          onClickUp={onClickUp}
          onClickDown={onClickDown}
          onCellDownClick={onCellDownClick}
          onCellUpClick={onCellUpClick}
        />
        <SnippetCombo onSelectCombo={onSelectSnippetCombo} />
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
                      resetSelectedCell={() => {}}
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
