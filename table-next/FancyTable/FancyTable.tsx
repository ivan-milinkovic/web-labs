import { CsvModel } from "@/FancyTable/CsvModel";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

type Props = {
  data: CsvModel;
};

type ColumnFlag = {
  column: string;
  show: boolean;
  sort: Sort;
};

enum Sort {
  dsc = -1,
  none = 0,
  asc = 1,
}

export default function FancyTable({ data }: Props) {
  const initialColumnFlags: ColumnFlag[] = data.headers.map((h) => {
    return { column: h, show: true, sort: 0 };
  });
  const initialIndices = new Array(data.headers.length)
    .fill(0)
    .map((value, index) => index);

  const [indices, setIndices] = useState(initialIndices);
  const [columnFlags, setColumnsFlags] =
    useState<ColumnFlag[]>(initialColumnFlags);
  const [filter, setFilter] = useState<string>("");
  const [highlightSearch, setHighlightSearch] = useState(true);

  function reset() {
    setIndices(initialIndices);
    setColumnsFlags(initialColumnFlags);
    setFilter("");
    onSort("");
  }

  function onColumnCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const col = event.target.id;
    const isChecked = event.target.checked;
    setColumnsFlags((prev) => {
      const newFlags = prev.map((cf) => {
        if (col === cf.column) {
          return { column: col, show: isChecked, sort: cf.sort };
        } else {
          return cf;
        }
      });
      return newFlags;
    });
  }

  function onHighlightCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    setHighlightSearch(event.target.checked);
  }

  const preparedHeaders = useMemo(() => {
    return indices.map((i) => data.headers[i]);
  }, [data, indices]);

  // Filter, change column order, apply highlight
  const preparedRows = useMemo(() => {
    let processed = [...data.rows];

    // sort first, it's easier to find the right column index before reordering
    const sortingColumnOrigIndex = columnFlags.findIndex(
      (cf) => cf.sort !== Sort.none
    );
    if (sortingColumnOrigIndex >= 0) {
      const sort = columnFlags[sortingColumnOrigIndex].sort;
      processed.sort((l, r) => {
        const sl = l[sortingColumnOrigIndex];
        const sr = r[sortingColumnOrigIndex];
        const direction = sort === Sort.dsc ? -1 : 1;

        // try numbers
        const nl = Number(sl);
        const nr = Number(sr);
        if (nl && nr) {
          return (nl - nr) * direction;
        }

        // try dates
        const dl = Date.parse(sl);
        const dr = Date.parse(sr);
        if (dl && dr) {
          return (dl - dr) * direction;
        }

        // compare as strings
        return sl.localeCompare(sr) * direction;
      });
    }

    processed = processed.map((row) => {
      return indices.map((i) => {
        return row[i];
      });
    });

    if (filter === "") return processed;
    processed = processed.filter((row) => {
      // Show the row if any cell contains the search string
      const index = row.findIndex((cell) => {
        if (typeof cell === "undefined") {
          console.log(row);
        }
        return cell.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
      });
      return index !== -1;
    });

    if (!highlightSearch) return processed;
    const pattern = `${filter}`;
    const regex = new RegExp(pattern, "gi");
    processed = processed.map((row) => {
      return row.map((cell) => cell.replace(regex, "<mark>$&</mark>"));
    });

    return processed;
  }, [data, columnFlags, filter, highlightSearch, indices]);

  function isColumnChecked(column: string): boolean {
    return columnFlags.find((cf) => cf.column === column)?.show ?? false;
  }

  function isColumnIndexChecked(columnIndex: number): boolean {
    const initialIndex = indices[columnIndex];
    return columnFlags[initialIndex].show;
  }

  function onFilterChange(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    setFilter(text);
  }

  function sortSymbolForHeader(header: string): string {
    const sort = columnFlags.find((cf) => cf.column === header)!.sort;
    switch (sort) {
      case Sort.none:
        return "↕";
      case Sort.asc:
        return "↑";
      case Sort.dsc:
        return "↓";
    }
  }

  function onSort(header: string) {
    const newFlags = [...columnFlags];
    for (let cf of newFlags) {
      if (cf.column === header) {
        switch (cf.sort) {
          case Sort.none:
            cf.sort = Sort.asc;
            break;
          case Sort.asc:
            cf.sort = Sort.dsc;
            break;
          case Sort.dsc:
            cf.sort = Sort.asc;
            break;
        }
      } else {
        cf.sort = Sort.none;
      }
    }
    setColumnsFlags(newFlags);
  }

  function makeHtml(cell: string) {
    return highlightSearch
      ? {
          dangerouslySetInnerHTML: { __html: cell },
        }
      : {};
  }

  function onDragstart(event: DragEvent, header: string) {
    event.dataTransfer?.setData("dragged", header);
  }

  function onDragover(event: DragEvent) {
    event.preventDefault();
  }

  function onDrop(event: DragEvent, header: string) {
    event.preventDefault();
    // console.log("drop on " + header);
    const draggedHeader = event.dataTransfer?.getData("dragged");
    if (!draggedHeader) return;

    const origFromIndex = data.headers.indexOf(draggedHeader);
    const origToIndex = data.headers.indexOf(header);
    const fromIndex = indices.indexOf(origFromIndex);
    const toIndex = indices.indexOf(origToIndex);

    const newIndices = [...indices];
    if (toIndex < fromIndex) {
      const tmp = newIndices[fromIndex];
      for (let i = fromIndex - 1; i >= toIndex; i--) {
        newIndices[i + 1] = newIndices[i];
      }
      newIndices[toIndex] = tmp;
    } else if (fromIndex < toIndex) {
      const tmp = newIndices[fromIndex];
      for (let i = fromIndex + 1; i <= toIndex; i++) {
        newIndices[i - 1] = newIndices[i];
      }
      newIndices[toIndex] = tmp;
    }
    setIndices(newIndices);
    console.log(newIndices);
  }

  return (
    <>
      <div className="">
        <div className="inline">
          <button
            onClick={reset}
            className="border rounded me-2 px-1 w-[27px] border-slate-500 hover:border-slate-300 cursor-pointer"
          >
            X
          </button>
          <input
            type="text"
            name="filter"
            id="filter"
            placeholder="filter"
            onChange={onFilterChange}
            value={filter}
            className="border rounded border-slate-500"
            autoComplete="off"
          />
          <input
            type="checkbox"
            name="highlightCheckbox"
            id="highlightCheckbox"
            onChange={onHighlightCheckboxChange}
            checked={highlightSearch}
          />
          <label htmlFor="highlightCheckbox" className="text-slate-500">
            Highlight
          </label>
        </div>
        <div className="inline ms-4">
          <span className="text-slate-500">Headers:</span>
          {data.headers.map((h) => (
            <span key={h} className="inline-flex items-baseline m-1">
              <input
                type="checkbox"
                id={h}
                className=""
                onChange={onColumnCheckbox}
                checked={isColumnChecked(h)}
              />
              <label htmlFor={h} className="ms-1 text-slate-400">
                {h}
              </label>
            </span>
          ))}
        </div>
      </div>
      <table className="table-auto">
        <thead>
          <tr className="">
            {preparedHeaders.map((h) => (
              <th
                key={h}
                hidden={!isColumnChecked(h)}
                className="w-auto border border-slate-500 bg-slate-900 px-4 py-1 font-medium text-lg text-slate-200"
                draggable={true}
                onDragStart={(e: any) => {
                  onDragstart(e, h);
                }}
                onDragOver={(e: any) => {
                  onDragover(e);
                }}
                onDrop={(e: any) => {
                  onDrop(e, h);
                }}
              >
                <span className="flex flex-row justify-between items-center">
                  {h}
                  <span
                    onClick={() => {
                      onSort(h);
                    }}
                    className="ms-2 me-0 w-[30px] text-sm cursor-pointer text-end"
                  >
                    {sortSymbolForHeader(h)}
                  </span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {preparedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, rowColumnIndex) => (
                <td
                  key={rowColumnIndex}
                  className="border border-slate-600 px-4 py-1 font-light text-base text-slate-200"
                  hidden={!isColumnIndexChecked(rowColumnIndex)}
                  {...makeHtml(cell)}
                >
                  {highlightSearch ? null : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
