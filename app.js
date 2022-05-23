const state = {
  result: 0,
  history: [],
  currentOperation: {
    firstOperands: "",
    secondOperands: "",
    operator: "",
    editModeId: "",
  },
};

const renderResult = () => {
  document.querySelector(".screen-result").innerHTML = state.result;
};
const renderHistory = () => {
  document.querySelector(".screen-history").innerHTML = state.history
    .map((historyItem) => `<div class="screen-operation">${historyItem}</div>`)
    .join("");
};
const render1stCurrentOperationOperand = () => {
  document.querySelector(".screen-current-operation-operands-1st").innerHTML =
    state.currentOperation["firstOperands"]; // get from state
};
const render2ndCurrentOperationOperand = () => {
  document.querySelector(".screen-current-operation-operands-2nd").innerHTML =
    state.currentOperation["secondOperands"];
};
const renderCurrentOperationOperator = () => {
  document.querySelector(".screen-current-operation-operator").innerHTML =
    state.currentOperation.operator; // get from state
};
const toggleEditModeClassName = () => {
  document
    .querySelectorAll(".screen-current-operation-operands")
    .forEach((currentOperationOperand_element) =>
      currentOperationOperand_element.classList.remove("edit-mode")
    );

  document
    .querySelector(
      state.currentOperation.editModeId
        ? `#${state.currentOperation.editModeId}`
        : "null"
    )
    ?.classList.add("edit-mode");
};

document
  .querySelectorAll(".screen-current-operation-operands")
  .forEach((currentOperationOperand_element) => {
    currentOperationOperand_element.addEventListener("click", () => {
      state.currentOperation.editModeId =
        state.currentOperation.editModeId === currentOperationOperand_element.id
          ? ""
          : currentOperationOperand_element.id;
      toggleEditModeClassName();
    });
  });

renderResult();

document.querySelectorAll(".operand").forEach((operand_button) => {
  operand_button.addEventListener("click", () => {
    const handle1stCurrentOperationOperand = () => {
      state.currentOperation["firstOperands"] += operand_button.textContent; // set to state
      render1stCurrentOperationOperand();
    };
    const handle2ndCurrentOperationOperand = () => {
      state.currentOperation["secondOperands"] += operand_button.textContent; // set to state
      render2ndCurrentOperationOperand();
    };
// can the two handles be merged into one?? or if the second is placed first does it takes the first operand as the second operand??

    // actually the position does not matter as they are functions and are mere declarations unless invoked!
    // the reason why they are not merged into one (or left to stand alone in the eventListener is because they will later be edited even though both 1st operand and 2nd operand will be the same.(try this in my own code).)

    if (state.currentOperation.editModeId) {
      if (state.currentOperation.editModeId === "firstOperands") {
        handle1stCurrentOperationOperand();
      } else {
        handle2ndCurrentOperationOperand();
      }
    } else {
      if (state.currentOperation.operator !== "") {
        handle2ndCurrentOperationOperand();
      } else {
        handle1stCurrentOperationOperand();
      }
    }

    console.log(state.currentOperation.operator);
  });
});

/**
 * This function checks for an operator and does the calculation
 * Then it set any calculation result to the state.result
 */
const performOperationCalculation = () => {
  if (state.currentOperation.operator == "+") {
    state.result =
      Number(state.currentOperation["firstOperands"]) +
      Number(state.currentOperation["secondOperands"]); // set state result for the "+" operation
  } else if (state.currentOperation.operator == "-") {
    state.result =
      Number(state.currentOperation["firstOperands"]) -
      Number(state.currentOperation["secondOperands"]); // set state result for the "-" operation
  } else if (state.currentOperation.operator == "*") {
    state.result =
      Number(state.currentOperation["firstOperands"]) *
      Number(state.currentOperation["secondOperands"]); // set state result for the "*" operation
  } else if (state.currentOperation.operator == "/") {
    state.result =
      Number(state.currentOperation["firstOperands"]) /
      Number(state.currentOperation["secondOperands"]); // set state result for the "/" operation
  }
};

document.querySelectorAll(".operator").forEach((operator_button) => {
  operator_button.addEventListener("click", () => {
    /**
     * Issue #3: Have all operator buttons working correctly, (Calculate the complete current operation when another operator button is clicked)
     *
     * hints
     * - Render result
     * - Also render the result as the "currentOperation.firstOperands"
     * - DON'T render history
     */

    //(Calculate the complete current operation when another operator button is clicked)
    if (
      state.currentOperation.operator &&
      state.currentOperation["secondOperands"]
      // is this accessing method converting it into a string?
    ) {
      performOperationCalculation(); // calculate the current operation and set the result to the state.result

      state.currentOperation["firstOperands"] = state.result; // set the result to the state.currentOperation.firstOperands
      state.currentOperation["secondOperands"] = ""; // set the state.currentOperation.secondOperands to empty

      // render all updates to the screen
      render1stCurrentOperationOperand();
      render2ndCurrentOperationOperand();
      renderResult();
    }

    state.currentOperation.operator = operator_button.textContent;
    renderCurrentOperationOperator();
  });
});

// Register the Event for the Equals btn
document.querySelector(".equals").addEventListener("click", () => {
  /**
   * Issue #2: Have all operator buttons working. (For now we only the plus operator is working)
   *
   * hints
   * - Add else if for -, x, and / operator functionalities
   */

  performOperationCalculation(); // calculate the current operation and set the result to the state.result

  const operation = `${state.currentOperation["firstOperands"]} ${state.currentOperation.operator} ${state.currentOperation["secondOperands"]} = ${state.result}`;
  state.history.push(operation); // set state history for the operation

  renderResult(); // render the state result to the DOM
  renderHistory(); // render the state history to the DOM
});

// Register the Event for the AC btn
document.querySelector(".ac").addEventListener("click", () => {
  /**
  - #1. Clear the state.result 
  - #2. Render result
  - #3. Clear all state.operation fields
  - #4. Render all operations (firstOperands, secondOperands and Operator)
   */

  state.result = 0; // #1
  renderResult(); // #2

  state.currentOperation = {
    // #3
    firstOperands: "",
    secondOperands: "",
    operator: "",
  };

  render1stCurrentOperationOperand(); // #4
  render2ndCurrentOperationOperand();
  renderCurrentOperationOperator();
  // why is this not working??
  // oh it works when i use an empty array and not an empty string, is it because it is an array by default?
  // can't i redeclare an object variable(since it follows the 'let' mode(does it even follow all the let rules?),in other words can't i redeclare an object variable to be a string if it was previously an array and vice versa)
  // but it works when i do it for state.result
  // is it that the number data type is a form of string as array is a form of object(i don't really know, confirm later)/is it that the number data type has the same relationship that an array-object have with a string?
  state.history = []
  console.log(state.history);
  renderHistory();
});
