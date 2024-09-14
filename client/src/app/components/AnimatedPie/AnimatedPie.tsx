'use client'
import React, { useEffect } from "react";

const sliceSize = (dataNum: number, dataTotal: number): number => {
  return (dataNum / dataTotal) * 360;
};

const addSlice = (
  sliceSize: number,
  pieElement: string,
  offset: number,
  sliceID: string,
  color: string
): JSX.Element => {
  return (
    <div className={`slice ${sliceID}`} key={sliceID}>
      <span style={{ backgroundColor: color }}></span>
    </div>
  );
};

const iterateSlices = (
  sliceSize: number,
  pieElement: string,
  offset: number,
  dataCount: number,
  sliceCount: number,
  color: string
): JSX.Element[] => {
  const slices: JSX.Element[] = [];
  const maxSize = 179;
  if (sliceSize <= maxSize) {
    slices.push(addSlice(sliceSize, pieElement, offset, `s${dataCount}-${sliceCount}`, color));
  } else {
    slices.push(addSlice(maxSize, pieElement, offset, `s${dataCount}-${sliceCount}`, color));
    slices.push(
      ...iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color)
    );
  }
  return slices;
};

const createPie = (dataElement: string, pieElement: string) => {
  const listData: number[] = [];
  document.querySelectorAll(`${dataElement} span`).forEach((span) => {
    listData.push(Number(span.textContent));
  });
  let listTotal = 0;
  for (const data of listData) {
    listTotal += data;
  }
  let offset = 0;
  const color = [
    "cornflowerblue",
    "olivedrab",
    "orange",
    "tomato",
    "crimson",
    "purple",
    "turquoise",
    "forestgreen",
    "navy",
    "gray",
  ];
  const slices: JSX.Element[] = [];
  for (let i = 0; i < listData.length; i++) {
    const size = sliceSize(listData[i], listTotal);
    slices.push(...iterateSlices(size, pieElement, offset, i, 0, color[i]));
    offset += size;
  }
  return slices;
};

const AnimatedPie: React.FC = () => {
  useEffect(() => {
    createPie(".pieID.legend", ".pieID.pie");
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">HTML Pie Chart</h1>
      <p>Change the number values in the html.</p>
      <section className="mt-4">
        <div className="pieID pie"></div>
        <ul className="pieID legend">
          <li>
            <em>Humans</em>
            <span>718</span>
          </li>
          <li>
            <em>Dogs</em>
            <span>531</span>
          </li>
          <li>
            <em>Cats</em>
            <span>868</span>
          </li>
          <li>
            <em>Slugs</em>
            <span>344</span>
          </li>
          <li>
            <em>Aliens</em>
            <span>1145</span>
          </li>
        </ul>
      </section>
      <section className="mt-4">
        <p>
          Also, check out my{" "}
          <a href="" className="text-blue-500 hover:text-blue-700">
            Charts restyling
          </a>
          .
        </p>
      </section>
    </main>
  );
};