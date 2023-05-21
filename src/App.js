import logo from "./logo.svg";
import "./App.css";
import cross from "./cross-33.svg";
import search from "./icon_search.svg";
import { borderRadius } from "@mui/system";
import { React, useState, useRef, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { orange, purple } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const ref = useRef(null);
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState("");
  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const onFocusHandler = () => {
    setFocus(true);
  };
  const onBlurHandler = (e) => {
    e.preventDefault();
    setFocus(false);
  };
  const deleteHandler = (e) => {
    let b = e.currentTarget.id;

    dispatch({ type: "item/delete", payload: b });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let flag = true;
    for (let i = 0; i < list.length; i++) {
      if (list[i] == input) {
        flag = false;
        dispatch({ type: "item/toTop", payload: i });
        break;
      }
    }
    if (flag) {
      if (list.length == 10) dispatch({ type: "item/full", payload: input });
      else dispatch({ type: "item/added", payload: input });
    }
    setInput("");
    setFocus(false);
  };

  let classes = list.length ? "dropdown block" : "dropdown";

  classes = focus ? "dropdown block" : "dropdown";
  let counter = 0;
  let elements = list.map((elem) => {
    return elem;
  });
  if (input) {
    list.forEach((elem, index) => {
      if (elem.substring(0, input.length) == input) {
        elements = [
          ...elements.slice(0, counter),
          elements[index],
          ...elements.slice(counter, index),
          ...elements.slice(index + 1),
        ];
        counter++;
      }
    });
  }
  const listItems = elements.map((elem) => {//create a list to display previous elements based on typed words
    return (
      <li key={elem} className="list">
        {elem}{" "}
        <div
          id={elem}
          onClick={(e) => {
            deleteHandler(e);
          }}
        >
          <img src={cross} alt="" />
        </div>
      </li>
    );
  });

  useEffect(() => {
    const listen = (e) => {
      if (ref.current.contains(e.target)) {
        e.preventDefault();
      } else if (ref.current.previousSibling.contains(e.target)) {
        setFocus(true);
      } else setFocus(false);
    };
    document.addEventListener("mousedown", listen);

    return () => {};
  }, []);

  return (
    <div className="App">
      <div className="cont">
        <form className="form" action="" onSubmit={submitHandler}>
          <img className="search" src={search} alt="" />
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={input}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
        </form>
        <div ref={ref} className={classes}>
          <ul>{listItems}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
