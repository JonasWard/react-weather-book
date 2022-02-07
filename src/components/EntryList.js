import React from "react";
import TemperatureEntry from "./TemperatureEntry";
import styles from "./TemperatureEntry.module.css";
import { FaPlusSquare } from "react-icons/fa";

export const EntryList = props => {
    let itemIndex = 0;

    return (
        <div className={styles.globalBox}>
            <div className={styles.titleLine}>
                <div className={styles.date}>
                    Date
                </div>
                <div className={styles.textInput}>
                    Min
                </div>
                <div className={styles.textInput}>
                    Max
                </div>
                <div className={styles.textInput}>
                    Avg
                </div>
                <div className={styles.delete}></div>
            </div>
            <div className={styles.content}>
                {props.entries.map((entry, index) => (
                    <TemperatureEntry
                        key={entry.id}
                        index={index}
                        entry={entry}
                        updateEntry={props.updateEntry}
                        delObject={props.delObject}
                        isMetric={props.isMetric}
                    />
                ))}
                <div className={styles.item} style={{"border": "hidden"}}>
                {/* <div className={styles.item} style={{"background-color": (props.entries.length % 2) ? colors.rowEven : colors.rowUnEven, "border": "hidden"}}> */}
                    <div className={styles.date}></div>
                    <div className={styles.textInput}></div>
                    <div className={styles.textInput}></div>
                    <div className={styles.textInput}></div>
                    <button className={styles.delete} onClick={() => props.newObject()}>
                        <FaPlusSquare />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EntryList;