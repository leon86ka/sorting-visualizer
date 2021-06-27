import React, { Component } from 'react';
import quickSort from './algorithms';
import Navbar from './Navbar';
import './style.css';
import { Button } from '@material-ui/core';

const ANIMATION_SPEED_MS = 30;
const PRIMARY_COLOR = 'rgb(64, 107, 224)';
const SECONDARY_COLOR = 'red';
export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayLeft: [],
      arrayRight: [],
    };
    this.resetArray = this.resetArray.bind(this);
    this.quickSortMain = this.quickSortMain.bind(this);
  }
  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    let arrayLeft = [];
    let arrayRight = [];
    let index = 183;
    while (index > 0) {
      arrayLeft.push(randomNumber(10, 700));
      arrayRight.push(randomNumber(1, 700));
      index--;
    }
    this.setState({ arrayLeft, arrayRight });
  }

  quickSortMain(array) {
    console.log('this.state.array', array);
    const steps = quickSort(array);
    for (let i = 0; i < steps.length; i++) {
      const arrayBars = document.getElementsByClassName('cols');
      const isColorChange = i % 4 !== 2 && i % 4 !== 3;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = steps[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = steps[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
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
          {/* <div className="leftContainer">
            {arrayLeft.map((num, idx) => (
              <div
                key={idx}
                className="cols"
                style={{ height: `${num}px` }}
              ></div>
            ))}
          </div> */}
          <div className="rightContainer">
            {arrayRight.map((value, idx) => (
              <div
                key={idx}
                className="cols"
                style={{ height: `${value}px` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="btn">
          <Button
            variant="contained"
            color="primary"
            className="btn-quick"
            onClick={() => this.quickSortMain(arrayRight)}
          >
            Quick Sort
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="btn-reset"
            onClick={() => resetArray()}
          >
            Reset All
          </Button>
          <Button className="btn-merge" variant="contained" color="primary">
            Merge Sort
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
