import React from "react";

export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th style={{ width: '50px' }}>Time</th>
        <th style={{ width: '450px' }}>Task</th>
        <th style={{ width: '60px' }}>Primary</th>
        <th style={{ width: '40px' }}>Check</th>
        <th style={{ width: '60px' }}>Duality</th>
        <th style={{ width: '40px' }}>Check</th>
        <th style={{ width: '50px' }}>Items</th>
        <th style={{ width: '100px' }}>Comments</th>
        <th style={{ width: '80px' }}>Short-name</th>
        <th style={{ width: '100px' }}>ISIN</th>
        <th style={{ width: '140px' }}>Corp.ref</th>
        <th style={{ width: '50px' }}>ACK</th>
        <th style={{ width: '60px' }}>Actions</th>
      </tr>
    </thead>
  );
}