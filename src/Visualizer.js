import React, { Component } from 'react';
import quickSort from './algorithms';
import Navbar from './Navbar';
import './style.css';
import { Button } from '@material-ui/core';

const ANIMATION_SPEED_MS = 10;
const ARRAY_COLUMNS = 125;
const PRIMARY_COLOR = 'rgb(14, 241, 101)';
const SECONDARY_COLOR = 'red';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayLeft: [],
      arrayRight: [],
      timeouts: [],
    };
    this.resetArray = this.resetArray.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.quickSortMain = this.quickSortMain.bind(this);
  }
  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    let arrayLeft = [];
    let arrayRight = [];
    let index = ARRAY_COLUMNS;
    while (index > 0) {
      arrayLeft.push(randomNumber(1, 700));
      arrayRight.push(randomNumber(1, 700));
      index--;
    }
    this.resetAll();
    this.setState({ arrayLeft, arrayRight, timeouts: [] });
  }

  resetAll() {
    this.state.timeouts.forEach((currElement) => {
      clearTimeout(currElement);
    });
  }

  quickSortMain(array) {
    const steps = quickSort(array);
    let myTimeouts = [];
    for (let i = 0; i < steps.length; i++) {
      const arrayBars = document.getElementsByClassName('cols-2');
      const isColorChange = i % 4 !== 2 && i % 4 !== 3;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = steps[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const myTimeout = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        myTimeouts.push(myTimeout);
      } else {
        const myTimeout = setTimeout(() => {
          const [barOneIdx, newHeight] = steps[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        myTimeouts.push(myTimeout);
      }
    }
    this.setState({
      ...this.state,
      timeouts: myTimeouts,
    });
  }

  render() {
    const { arrayLeft, arrayRight } = this.state;
    const { resetArray } = this;
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="container">
          <div className="leftContainer">
            {arrayLeft.map((value, idx) => (
              <div
                key={idx}
                className="cols-1"
                style={{ height: `${value}px` }}
              ></div>
            ))}
          </div>
          <div className="rightContainer">
            {arrayRight.map((value, idx) => (
              <div
                key={idx}
                className="cols-2"
                style={{ height: `${value}px` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="btn">
          <Button className="btn-merge" variant="contained" color="primary">
            Merge Sort
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="btn-reset"
            onClick={() => resetArray()}
          >
            Reset Array
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="btn-quick"
            onClick={() => this.quickSortMain(arrayRight.slice())}
          >
            Quick Sort
          </Button>
        </div>
      </div>
    );
  }
}
function randomNumber(min, max) {
  let number = Math.ceil(Math.random() * (max - min - 1) + min);
  return number;
}
