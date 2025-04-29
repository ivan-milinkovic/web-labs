import { CsvModel } from "@/FancyTable/CsvModel";
import { ChangeEvent, useMemo, useState } from "react";

type Props = {
  data: CsvModel;
};

type ColumnFlag = {
  column: string;
  show: boolean;
};

export default function FancyTable({ data }: Props) {
  const initial: ColumnFlag[] = data.headers.map((h) => {
    return { column: h, show: true };
  });

  const [columnFlags, setColumnsFlags] = useState<ColumnFlag[]>(initial);
  const [filter, setFilter] = useState<string>("");
  const [highlightSearch, setHighlightSearch] = useState(true);

  function onColumnCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const col = event.target.id;
    const isChecked = event.target.checked;
    setColumnsFlags((prev) => {
      const newFlags = columnFlags.map((cf) => {
        if (col === cf.column) {
          return { column: col, show: isChecked };
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

  const visibleRows = useMemo(() => {
    if (filter === "") return data.rows;
    const filtered = data.rows.filter(
      (row) =>
        row.findIndex((cell) =>
          cell.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        ) !== -1 // Show the row if any cell contains the search string
    );
    if (!highlightSearch) return filtered;

    const pattern = `${filter}`;
    const regex = new RegExp(pattern, "gi");
    const processed = filtered.map((row) => {
      return row.map((cell) => cell.replace(regex, "<mark>$&</mark>"));
    });
    return processed;
  }, [filter, data, highlightSearch]);

  function isColumnChecked(column: string): boolean {
    return columnFlags.find((cf) => cf.column === column)?.show ?? false;
  }

  function isColumnIndexChecked(columnIndex: number): boolean {
    return columnFlags[columnIndex].show;
  }

  function onFilterChange(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    setFilter(text);
  }

  function makeHtml(cell: string) {
    return highlightSearch
      ? {
          dangerouslySetInnerHTML: { __html: cell },
        }
      : {};
  }

  return (
    <>
      <div className="">
        <div className="inline">
          <input
            type="text"
            name="filter"
            id="filter"
            placeholder="filter"
            onChange={onFilterChange}
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
          <tr>
            {data.headers.map((h) => (
              <th
                key={h}
                hidden={!isColumnChecked(h)}
                className="border border-slate-500 bg-slate-900 px-4 py-1 font-medium text-lg text-slate-200"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td
                  key={columnIndex}
                  className="border border-slate-600 px-4 py-1 font-light text-base text-slate-200"
                  hidden={!isColumnIndexChecked(columnIndex)}
                  {...makeHtml(cell)}
                  // dangerouslySetInnerHTML={
                  //   highlightSearch
                  //     ? {
                  //         __html: cell,
                  //       }
                  //     : ""
                  // }
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
