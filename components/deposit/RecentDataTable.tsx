"use client"

import React from 'react'

import { useEffect, useState } from "react";

type Row = {
    value: number;
    token: string;
    time: string;
};

const TOKENS = ["USDC", "USDT", "TRX", "BTC", "ETH", "SOL"];

function buildInitialTable(minValue: number): Row[] {
    return [minValue + 4, minValue + 3, minValue + 2, minValue + 1, minValue].map(
        (v) => ({
            value: v,
            token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
            time: "an hour ago",
        })
    );
}

const RecentDataTable = ({
    id,
    startValue,
    firstDelay,
    secondDelay,
}: {
    id: string;
    startValue: number;
    firstDelay: number; // ms
    secondDelay: number; // ms
}) => {
    const [rows, setRows] = useState<Row[]>(() =>
        buildInitialTable(startValue)
    );

    const getHighest = (rows: Row[]) =>
        rows.length ? Math.max(...rows.map((r) => r.value)) : 0;

    const shiftAndAdd = (rows: Row[], label: string): Row[] => {
        const newRows = [...rows];
        newRows.pop(); // remove last row
        const nextVal = getHighest(rows) + 1;
        newRows.unshift({
            value: nextVal,
            token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
            time: label,
        });
        return newRows;
    };

    const updatePenultimate = (rows: Row[], newLabel: string): Row[] => {
        if (rows.length >= 2) {
            const newRows = [...rows];
            newRows[1] = { ...newRows[1], time: newLabel };
            return newRows;
        }
        return rows;
    };

    useEffect(() => {
        const first = setTimeout(() => {
            setRows((rows) => shiftAndAdd(rows, "few minutes ago"));
        }, firstDelay);

        const second = setTimeout(() => {
            setRows((rows) => updatePenultimate(rows, "few minutes ago"));
        }, firstDelay + secondDelay);

        return () => {
            clearTimeout(first);
            clearTimeout(second);
        };
    }, [firstDelay, secondDelay]);

    return (
        <table className="w-full  border-separate border-spacing-y-3 table-fixed">
            <tbody>
                {rows.map((row) => (
                    <tr key={row.value} className="hover:bg-gray-100">
                        <td className="px-2 py-1 border-b border-gray-300 w-[55px] truncate">
                            {row.value}
                        </td>
                        <td className="px-2 py-1 border-b border-gray-300 truncate">
                            {row.token}
                        </td>
                        <td className="px-2 py-1 border-b border-gray-300 whitespace-nowrap">
                            {row.time}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RecentDataTable