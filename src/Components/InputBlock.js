import React from 'react';
import styles from "./InputBlock.module.css";

const InputBlock = (props) => {
  return (
    <div>
        <input 
            type="text" 
            className={styles.input} 
            maxLength={1} 
            onChange={props.onChange}
            disabled={props.disabled}
            style={{
                background : props.back,
                color : props.clr
            }}
            required
            name={props.name}
            autoComplete="off"
        />
    </div>
  )
}

export default InputBlock