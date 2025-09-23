import React, { useEffect } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";

const getData = async (page, priceValue) => {
  let res = await axios.get(
    `https://makemytrip-api-data.onrender.com/flight?_page=${page}&_limit=5?&price_gte=${
      priceValue - 2000
    }&price_lte=${priceValue}`
  );
  return res.data;
};

export default function FlightList({ page, priceValue }) {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");

  useEffect(() => {
    getData(page, priceValue).then((res) => {
      let filtered = res;
      if (search) {
        filtered = filtered.filter(f =>
          f.airline.toLowerCase().includes(search.toLowerCase()) ||
          f.from.toLowerCase().includes(search.toLowerCase()) ||
          f.to.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (sort === "price-asc") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }
      setData(filtered);
    });
  }, [page, priceValue, search, sort]);

  return (
    <div>
      <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
        <input
          type="text"
          placeholder="Search by airline, from, to..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
        />
        <select value={sort} onChange={e => setSort(e.target.value)} style={{padding: '8px', borderRadius: '4px'}}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <FlightCard data={item} />
            </div>
          );
        })}
    </div>
  );
}
