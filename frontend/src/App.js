import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Plot from 'react-plotly.js';
import './App.css';

function App() {

  const [data, setData] = useState([{}]) // raw data
  const [users, setUsers] = useState([]) // array of unique user ids used for userID dropdown
  const [curUser, setCurUser] = useState(null) // store the user id of the selected user
  const [curMeasurement, setCurMeasurement] = useState({}) // store the selected measurement
  const [graphData, setGraphData] = useState({ x: [], y: [] }) // data gets fed to plot. x will always be date, y depends on selection

  useEffect(() => {
    fetch("/measurements").then(
      res => res.json()
    ).then(
      data => {
        let tempUsers = new Set()
        let dataLength = Object.keys(data).length
        for (let i = 0; i < dataLength; i++) {
          let point = data[i]
          tempUsers.add(point.user_id)
        }
        setData(data)
        setUsers(Array.from(tempUsers))
        setCurUser(users[0])
      }
    )
  }, []) // fetches data on first render

  useEffect(() => {
    let dataLength = Object.keys(data).length
    let tempGraphData = {
      x: [],
      y: []
    }
    for (let i = 0; i < dataLength; i++) {
      let point = data[i]
      // check that the point belongs to the selected user, 
      // and there exists data for the date and the selected measurement
      if (point.user_id === curUser && point[curMeasurement.propName] && point["creation_date"]) {
        let date = new Date(point["creation_date"]).toISOString()
        tempGraphData.x.push(date)
        tempGraphData.y.push(point[curMeasurement.propName])
      }
    }
    setGraphData(tempGraphData)
  }, [curUser, curMeasurement]) // find relevant data points when curUser or curMeasurement is changed

  // hardcode measurements of interest
  let measurements = [
    {
      propName: "backend_sway_area_mm2",
      name: "Sway Area"
    },
    {
      propName: "body_fat_percent",
      name: "Body Fat Percent"
    },
    {
      propName: "heart_rate",
      name: "Heart Rate"
    },
    {
      propName: "peak_count",
      name: "Peak Count"
    },
    {
      propName: "weight_kg",
      name: "Weight (kg)"
    },
  ]

  return (
    <div className="App">
      <div className='header'>
      {/* dropdown selects users  */}
      <Dropdown className='dropdown'>
        <Dropdown.Toggle className='dropdown-toggle'> {curUser || "User ID"} </Dropdown.Toggle>
        <Dropdown.Menu>
          {users.map((userId, i) =>
            <Dropdown.Item key={i} onClick={() => setCurUser(users[i])}>
              {userId}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {/* dropdown selects the measurement to graph */}
      <Dropdown className='dropdown'>
        <Dropdown.Toggle variant="primary"> {curMeasurement.name || "Measurement"}</Dropdown.Toggle>
        <Dropdown.Menu>
          {measurements.map((measurement, i) =>
            <Dropdown.Item key={i} onClick={() => setCurMeasurement(measurement)}>
              {measurement.name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      </div>

      {/* use a plotting lib to make plot if a measurement and user is selected*/}
      <div className='plot-container'>
        {curMeasurement && curUser ? (
          <Plot
            data={[
              {
                x: graphData.x,
                y: graphData.y,
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'red' },
              }
            ]}
            layout={{ width: 900, height: 500, title: curMeasurement.name }}
          />) : (
          <p> Please select a userID and a measurement to view a plot. </p>
        )
        }
      </div>
    </div>
  );
}

export default App;
