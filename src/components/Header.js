import {React } from "react";
import styles from "./Header.module.css";

export const Header = props => {
    return (
        <div className={styles.header}>
            <div className={styles.inputBoxes}>
                <div className={styles.subject}></div>
                <div className={styles.subjectTitle}>WeatherBook</div>
            </div>
            <div className={styles.inputBoxes}>
                <div className={styles.subject}>Name</div>
                <input type="text" onChange={props.updateName} value={props.data.projectName} className={styles.subjectContent}/>
                {/* <div className={styles.subjectContent}>{projectName}</div> */}
            </div>
            <div className={styles.inputBoxes}>
                <div className={styles.subject}>Location</div>
                <input type="text" onChange={props.updateLocation} value={props.data.projectLocation} className={styles.subjectContent}/>
                {/* <div className={styles.subjectContent}>{projectLocation}</div> */}
            </div>
            <div className={styles.inputBoxes}>
                <div className={styles.subject}>Unit</div>
                <div className={styles.subjectContent}>
                    <input 
                        type="checkbox"
                        checked={props.isMetric}
                        onChange={props.updateUnits}
                    />
                    <div>ºC</div>
                    <input 
                        type="checkbox"
                        checked={!props.isMetric}
                        onChange={props.updateUnits}
                    />
                    <div>ºF</div>
                </div>
            </div>
        </div>
    )
}

export default Header;