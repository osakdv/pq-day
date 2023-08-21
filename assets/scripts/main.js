const subjectSubHeadingErrorMsg = document.querySelector(
  "#sub-headings-field-msg"
);
const subjectNameInput = document.querySelector("#note-subject");
const subjectTopicInput = document.querySelector("#subject-topic");
const topicSubHeadingInput = document.querySelector("#sub-headings");
const submitSubjectDataBtn = document.querySelector("#add-input-entry");

const thirdInputWrapper = document.querySelector(".f3");
const middleContTopBarHeight = document.querySelector(
  ".middle-container .top-bar"
);

const subjectFieldErrMsg = document.querySelector("#note-subject-field-msg");
const topicFieldErrMsg = document.querySelector("#subject-topic-field-msg");
const subheadingErrMsg = document.querySelector("#sub-headings-field-msg");

let subjectUniqueId;
let uniqueIdCounts = 0;
let existingUniqueId = [];

let clickedOnExistingContent = false;

let subject;
let topic;
let subheading;
let subheadingList = [];

// style for third input wrapper from progress note taking page
if (!subjectSubHeadingErrorMsg.textContent) {
  thirdInputWrapper.style.marginTop = "2.7em";
}

// quill editor
let quill;
document.addEventListener("DOMContentLoaded", () => {
  quill = new Quill("#editor", {
    theme: "snow",
  });

  const qlEditorTextArea = document.querySelector(".ql-editor");

  // get middle container's top bar height -- progress note taking page
  const topBarElementHeight = middleContTopBarHeight.offsetHeight + 19.2;
  const deviceHeight = window.innerHeight;
  const deductionHeight = (topBarElementHeight / deviceHeight) * 100;
  console.log(deductionHeight);
  qlEditorTextArea.style.height = `${deviceHeight - deductionHeight}vh`;
});

// create a unique id for a new subject create that'll be compared to an existing id of old subjects
const uniqueIdMaker = () => {
  const id = Math.random().toString(36).substr(2, 9);
  return id;
};

// render user entry to dom based on two condtions - 1. If subject in new generate a new id and attach it to it's content 2. If subject already exist, compare it's unique id the array of object that contains it's info and render
// TODO: make this function after making the the new render work
const renderExisitingContentToDom = () => {};

const addContentBtnHandler = () => {
  while (!subjectUniqueId) {
    let id = uniqueIdMaker();

    if (!existingUniqueId.includes(id)) {
      subjectUniqueId = id;
      existingUniqueId.push(id);
    }
  }

  // validation checks
  const topicDefaultMsg = topicFieldErrMsg.innerHTML;

  const errMsg = (field, msg) => {
    field.textContent = msg;
    field.style.color = "red";

    setTimeout(() => {
      field.textContent = "";
      field.style.color = "transparent";

      if (!isNaN(subjectTopicInput.value)) {
        topicFieldErrMsg.innerHTML = topicDefaultMsg;
        topicFieldErrMsg.style.color = "#616060";
        console.log(topicFieldErrMsg)
      }
    }, 5000);

    

    return;
  };

  if (!subjectNameInput.value || !isNaN(subjectNameInput.value)) {
    errMsg(subjectFieldErrMsg, "Enter your field subject");
  }

  if (!isNaN(subjectTopicInput.value)) {
    errMsg(topicFieldErrMsg, "Enter a valid detail");
  }

  if (!topicSubHeadingInput.value || !isNaN(topicSubHeadingInput.value)) {
    errMsg(subheadingErrMsg, "Tell us what you're learning");
  }

  // get the user entry data
  subject = `${subjectNameInput.value.trim()} \n`;
  topic = `${subjectTopicInput.value.trim()} \n`;
  subheading = topicSubHeadingInput.value.trim();

  subheadingList.push(subheading);

  // format the text
  const subjectNameInputFormat = { header: 2, bold: true };
  const subjectTopicInputFormat = { header: 4, bold: true };

  // Get cursor position
  const cursorPositon = quill.getSelection();

  // insert entries to editor
  // const isEditorEmpty = quill.getText().trim();

  // quill.insertText(quill.getLength(), subject, subjectNameInputFormat);
  // quill.insertText(quill.getLength(), topic, subjectTopicInputFormat);

  // subheadingList.forEach((listText, index) => {
  //   const subheadingFormat = `\n${index + 1}. ${listText}\n`;

  //   quill.insertText(quill.getLength(), subheadingFormat);
  // });
};

submitSubjectDataBtn.addEventListener("click", addContentBtnHandler);
