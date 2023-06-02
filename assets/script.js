$(document).ready(function () {
  let today = dayjs();
  let currentTime = dayjs().$H;
  $("#currentDay").text(today.format("dddd MMM D, YYYY"));
  let timeBlock = $(".time-block");
  //   console.log(timeBlock[]);
  const storeItemsArr = JSON.parse(localStorage.getItem("storeData")) || [];

  //   set colors of timeblocks
  const setColorBlocks = () => {
    for (let i = 0; i < timeBlock.length; i++) {
      if (timeBlock[i].dataset.id < currentTime) {
        //   console.log(timeBlock[i].dataset.id);
        timeBlock[i].classList.remove("future");
        timeBlock[i].classList.remove("present");
        timeBlock[i].classList.add("past");
      }
      if (timeBlock[i].dataset.id == currentTime) {
        timeBlock[i].classList.remove("future");
        timeBlock[i].classList.remove("past");
        timeBlock[i].classList.add("present");
      }
    }
  };
  // run color timeblocks
  setColorBlocks();

  //   get text and timestamp on save button
  const saveBlock = $(".saveBtn").click(function (e) {
    e.preventDefault();
    let blockText = $(this).siblings("textarea").val();
    let timeStamp = $(this).parent("section")[0].dataset.id;
    // console.log(blockText);
    // console.log(timeStamp);
    if (!blockText) {
      return;
    } else {
      let obj = { text: blockText, time: timeStamp };
      storeItemsArr.push(obj);
      localStorage.setItem("storeData", JSON.stringify(storeItemsArr));
      console.log(storeItemsArr);

    }
  });

  //   set text and timestamps in timeblocks
  const setItemBlocks = () => { 
      for (let i = 0; i < storeItemsArr.length; i++){
        const item = storeItemsArr[i];
        const time = item.time;
        const text = item.text;

        // Set the value of corresponding textarea using data-id attribute
        $(`section[data-id="${time}"] textarea`).val(text);
      }
   

    // console.log(getItems[0].time + ": " + getItems[0].text);
  };
  setItemBlocks();
});
