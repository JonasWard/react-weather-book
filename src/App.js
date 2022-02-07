import logo from './logo.svg';

import React, {useRef, useEffect, useState} from "react";
import {Header} from "./components/Header";
import {EntryList} from "./components/EntryList";
import styles from "./App.module.css";

import someData from "./resources/dataExample.json"

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function getInitialValues() {
  const saveData = JSON.parse(window.localStorage.getItem("temperatureEntries"));
  return saveData || JSON.parse(JSON.stringify(someData));;
}

const emptyObject = {
  date: undefined,
  data: {
    min: undefined,
    max: undefined
  }
}

function App() {
  const [projectData, setProjectData] = useState(getInitialValues());
  const [isMetric, setUnits] = useState(projectData.isMetric);
  const [projectName, setProjectName] = useState(projectData.projectName);
  const [projectLocation, setProjectLocation] = useState(projectData.projectLocation);
  const [entries, setEntries] = useState(projectData.entries);
  const [averageValue, fromEntries] = useState(0.);
  const [timer, setTimer] = useState(null);

  const ref = useRef();

  const delEntry = id => {
    setEntries([
        ...entries.filter(entry => {
            return entry.id !== id
        }),
    ])
  }

  useEffect(() => {
    updateAverageValue();
  }, []);

  const updateProjectName = (event) => {
    setProjectName(event.target.value);

    updateProjectData();
  }

  const updateProjectLocation = (event) => {
    setProjectLocation(event.target.value);

    updateProjectData();
  }

  const updateProjectData = () => {
    console.log("updating project");

    window.localStorage.setItem("temperatureEntries", JSON.stringify({
      "weatherBook-version": "1.0.0",
      "projectName": projectName,
      "projectLocation": projectLocation,
      "isMetric": isMetric,
      "entries": entries
    }));
  }

  const updateAverageValue = (isMetric) => {
    let localValue = 0.;
    let localCount = 0;

    for (const entry of entries) {
      if (entry.data && entry.data.min && entry.data.max) {
        localValue += (entry.data.min + entry.data.max) * .5;
        localCount += 1;
      }
    }

    let avgValue = localValue / localCount;

    console.log("updating the average value");

    if (isMetric) {
      console.log("isn't metric");
      avgValue = avgValue * 1.8 + 32.;
    }

    fromEntries(avgValue);
  }
  
  const switchUnits = () => {
    setUnits(!isMetric);
    updateAverageValue(isMetric);
    updateProjectData();
  }

  const timedUpdatEntry = (updatedEntry, id) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        updateEntry(updatedEntry, id);
      }, 300)
    );
  }

  // const UploadFile = () => {
  //   const fileInput = useRef(null);

  //   const handleFileInput = (e) => {
  //       // handle validations
  //       e.target.files[0]
  //       console.log(e.target.files);
  //       // setProjectData(JSON.parse());
  //   }

  //   return (
  //       <div className="file-uploader">
  //         <input type="file" onChange={handleFileInput}/>
  //         <button onClick={e => fileInput.current && fileInput.current.click()}/>
  //       </div>
  //   )
  // }

  // const DownloadFile = () => {
  //   const a = document.createElement('a');
  //   const title = document.createTextNode(projectName+".json");
  //   a.appendChild(title);
  //   a.title = "aProject.json";
  //   a.href = URL;
  //   document.body.appendChild(a);
  // }

  const updateEntry = (updatedEntry, id) => {
    setEntries(
      entries.map(entry => {
        if (entry.id === id) {
          
          if (updatedEntry.min && updatedEntry.max) {
            if (!isMetric) {
              updatedEntry.min = (updatedEntry.min - 32) * 0.555555555;
              updatedEntry.min = (updatedEntry.max - 32) * 0.555555555;
            }
  
            const minVal = Math.min(updatedEntry.min, updatedEntry.max);
            const maxVal = Math.max(updatedEntry.min, updatedEntry.max);
  
            entry.date = updatedEntry.date
            entry.data.min = (minVal) ? minVal : updatedEntry.min
            entry.data.max = (maxVal) ? maxVal : updatedEntry.max
          } else if (updatedEntry.min) {
            if (!isMetric) {
              updatedEntry.min = (updatedEntry.min - 32) * 0.555555555;
            }

            entry.data.min = updatedEntry.min;
          } else if (updatedEntry.max) {
            if (!isMetric) {
              updatedEntry.max = (updatedEntry.max - 32) * 0.555555555;
            }

            entry.data.max = updatedEntry.max;
          } 
          
          if (updatedEntry.date) {
            entry.date = updatedEntry.date
          }
          
        }

        return entry
      })
    );

    updateAverageValue();

    updateProjectData();
  }

  const addEmptyEntry = () => {
    const newEntry = {
      id: uuidv4(),
      date: undefined,
      data: {
        min: undefined,
        max: undefined
      }
    }

    setEntries([...entries, newEntry])
  }

  return (
    <div className={styles.centering}>
      <div className={styles.global}>
        <Header data={{projectName: projectName, projectLocation: projectLocation}} isMetric={isMetric} updateUnits={switchUnits} updateName={updateProjectName} updateLocation={updateProjectLocation}/>
        <EntryList entries={entries} updateEntry={timedUpdatEntry} isMetric={isMetric} newObject={addEmptyEntry} delObject={delEntry}/>
        <div className={styles.bottom}>
          {/* <UploadFile/>
          <button className={styles.bottomElements}>save file</button> */}
          <div className={styles.bottomElements}>Total Average Temperature:</div>
          <div style={{"fontWeight": 300}} className={styles.bottomElements}>{averageValue.toFixed(2)}</div>
          <div style={{"fontWeight": 300}} className={styles.bottomElements}>{(isMetric) ? "ºC" : "ºF"}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
