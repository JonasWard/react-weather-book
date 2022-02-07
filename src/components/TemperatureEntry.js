import React, {useEffect, useState} from "react";
import InputNumber from 'rc-input-number';
import { IconContext } from "react-icons";
import styles from "./TemperatureEntry.module.css";
import { FaTrash } from "react-icons/fa";
import colors from "./colors.json";

export const colorFunction = (value) => {
    if (value) {
        if (value < 3.) {
            return "cold";
        } else if (value > 30.) {
            return "hot";
        }
    }

    return "normal";
}

export const TemperatureEntry = (props) => {

    const {id, date, data } = props.entry;
    let {min, max} = data;

    const minColor = colorFunction(min);
    const maxColor = colorFunction(max);

    if (!props.isMetric) {
        min = (min) ? min * 1.8 + 32 : undefined;
        max = (max) ? max * 1.8 + 32 : undefined;
    }

    let avg = 0.;
    if (min && max) {
        avg = (min + max) * 0.5;
    }

    let avgColor;

    if (props.isMetric) {
        avgColor = colorFunction(avg);
    } else {
        avgColor = colorFunction((avg - 32.) * .555555);
    }

    const eO = {
        date: date,
        min: min,
        max: max
    }

    const setMin = v => {
        eO.min = v;
        props.updateEntry(eO, id);
    }

    const setMax = v => {
        eO.max = v;
        props.updateEntry(eO, id);
    }

    // switching color based on index id
    const color = (props.index%2==0) ? colors.rowUnEven  : colors.rowEven;

    return (
        <div className={styles.item} style={{"backgroundColor": color}}>
            <input
                type="date"
                placeholder="dd.mm.yyyy"
                className={styles.date}
                min="1800-01-01"
                value={date}
                onChange={e => {
                    eO.date = e.target.value
                    props.updateEntry(eO, id)
                }}
                // onKeyDown={handleUpdatedDone}
            />
            <div className={styles.textInput}>
                <InputNumber
                    value={(min) ? (props.isMetric) ? (min).toFixed(1) : (min).toFixed(0) : undefined}
                    onChange={setMin}
                    className={styles[minColor]}
                />
            </div>
            <div className={styles.textInput}>
                <InputNumber
                    value={(max) ? (props.isMetric) ? (max).toFixed(1) : (max).toFixed(0) : undefined}
                    onChange={setMax}
                    className={styles[maxColor]}
                />
            </div>
            <div className={styles.textInput} >
                <div className={styles[avgColor]}>
                    {(props.isMetric) ? (avg+.0499).toFixed(1) : (avg+.499).toFixed(0)}
                </div>
            </div>
            <button className={styles.delete} onClick={() => props.delObject(id)}>
                <FaTrash />
            </button>
        </div>
    )
}

export default TemperatureEntry;