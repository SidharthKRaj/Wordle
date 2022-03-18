import React, { useEffect, useState } from "react";
import InputBlock from "../Components/InputBlock";
import styles from "./GamePage.module.css";
import words from "../Words.json";
import Dialog from '@mui/material/Dialog';


const GamePage = () => {
    const [tries, settries] = useState(
        Array.from(Array(5), () =>
            Array.from(
                Array(5)
                    .fill()
                    .map(() => {
                        return {
                            value: "",
                            back: "",
                            disabled: false,
                            clr: "",
                        };
                    })
            )
        )
    );
    const [blacklist, setblacklist] = useState([]);
    const [targetword, settargetword] = useState("");
    const [finalresult, setfinalresult] = useState("second");
    const [open, setopen] = useState(false);
    const wordLength = 5;

    useEffect(() => {
      settargetword(String(words["words"][Math.floor(Math.random()*500)]).toUpperCase());
    }, []);
    

    const SetLetter = (element, index, attempt) => {
        var arr = [...tries];
        for (let i = 0; i < arr.length; i++) {
            if (i === attempt) {
                for (let j = 0; j < arr[i].length; j++) {
                    if (j === index) {
                        arr[i][j]["value"] = String(
                            element.value
                        ).toUpperCase();
                        break;
                    }
                }
            }
        }
        settries(arr);

        if (index === wordLength - 1) {
            for (let i = 0; i < tries[attempt].length; i++) {
                for (let j = 0; j < targetword.length; j++) {
                    if (tries[attempt][j]["value"] === targetword[j]) {
                        tries[attempt][j]["back"] = "#24B55C";
                        tries[attempt][j]["clr"] = "white";
                    } else if (
                        targetword.includes(tries[attempt][j]["value"])
                    ) {
                        tries[attempt][j]["back"] = "#B5A924";
                        tries[attempt][j]["clr"] = "white";
                    } else {
                        tries[attempt][j]["back"] = "#444342";
                        tries[attempt][j]["clr"] = "white";
                        blacklist.push(tries[attempt][j]["value"]);
                    }
                    tries[attempt][j]["disabled"] = true;
                }
            }
            if (tries[attempt].map((item) => { return item["value"] }).join("") === targetword) {
                setopen(true);
                setfinalresult(`Congratulations, You made it in ${attempt+1} attempts.`)
            }
        }

        const [fieldName, rowIndex, fieldIndex] = element.name.split("-");
        if (parseInt(fieldIndex, 10) < 5) {
            const nextSibling = document.querySelector(
                `input[name=input-${parseInt(rowIndex)}-${parseInt(fieldIndex) + 1}]`
            );

            // If found, focus the next field
            if (nextSibling !== null) {
                nextSibling.focus();
            }
        }

        if (attempt === index === 5) {
            setopen(true);
            setfinalresult(`Better Luck next time!!`);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <p style={{ fontSize : "xx-large", fontWeight : "bolder", color : '#444342' }}>Wordle</p>
            </div>
            <div className={styles.blocks}>
                {tries.map((parentdata, index) => {
                    return (
                        <div className={styles.inputrow} key={index}>
                            {parentdata.map((data, idx) => {
                                return (
                                    <InputBlock
                                        key={idx}
                                        name={`input-${index}-${idx}`}
                                        onChange={(e) =>
                                            {
                                                if (blacklist.includes(String(e.target.value).toUpperCase())) {
                                                    alert("you can't use that!!. See the bottom list of blacklisted alphabets");
                                                    e.target.value = ""
                                                } else {
                                                    SetLetter(e.target, idx, index)
                                                }
                                            }
                                        }
                                        disabled={tries[index][idx]["disabled"]}
                                        back={tries[index][idx]["back"]}
                                        clr={tries[index][idx]["clr"]}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className={styles.keyboard}>
                <div
                    className={styles.blacklistContainer}
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    {[...new Set(blacklist)].map((item, index) => {
                        return (
                            <div
                                className={styles.blacklistItem}
                                key={index}
                                style={{ marginRight: "1rem" }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Dialog
                open={open}
                onClose={() => setopen(false) }
                disableEnforceFocus
                fullWidth={false}
                maxWidth="md"
            >
                <h2 style={{ margin : "5rem"}}>{finalresult}</h2>
            </Dialog>
        </div>
    );
};

export default GamePage;
