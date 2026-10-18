function setQuestionAdvanceIcon(button, isLastQuestion) {
  const label = isLastQuestion ? "完成本組" : "下一題";
  button.setAttribute("aria-label", label);
  button.title = label;
  button.querySelector("img").src = isLastQuestion ? "assets/icons/check.svg" : "assets/icons/arrow-right.svg";
}
