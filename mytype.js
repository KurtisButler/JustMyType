$(document).ready(function () {
  $("#keyboard-upper-container").hide();

  $(document).keydown(function (event) {
    if (event.which === 16) {
      $("#keyboard-lower-container").hide();
      $("#keyboard-upper-container").show();
    }
  });


//   VARIABLES
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];
  let sentenceIndex = 0;
  let letterIndex = 0;
  //   let highlighterPosition = 0;
  //   let highlight = $("#yellow-block");
  let mistakes = 0;
  let currentSentence = sentences[sentenceIndex];
  let currentChar = currentSentence[letterIndex];
  let timeCounting = false;
  let startTime;
  let endTime;
  //   let minutes = (endTime - startTime) / 60000;


  
  $("#sentence").html(currentSentence);
  $("#target-letter").html(currentChar);
  $(document).keypress(function (event) {
    $("#" + event.key.charCodeAt(0)).css("background-color", "yellow");

    if (timeCounting === false) {
      startDate = new Date();
      startTime = startDate.getTime();
      timeCounting = true;
    }

    $(document).keyup(function (event) {
      if (event.which === 16) {
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();
      }
      $("#" + event.key.charCodeAt(0)).css("background-color", "#F5F5F5");
    });

    if (event.which == sentences[sentenceIndex].charCodeAt(letterIndex)) {
      let $right = $("<span>✔</span>");
      $($right).addClass("green");
      $($right).appendTo("#feedback");
    } else {
      let wrong = $("<span>✗</span>");
      $(wrong).addClass("red");
      $(wrong).appendTo("#feedback");
      mistakes++;
    }

    letterIndex++;

    $("#yellow-block").css("left", "+=17.5");

    // highlighterPosition = 0;
    //                 $(highlight).css("margin-left", highlighterPosition + "px");
    //                 $("#feedback").text("");

    if (letterIndex === currentSentence.length - 1) {
      $("#yellow-block").css("left", "initial");
      sentenceIndex++;
      letterIndex = 0;
      $("#feedback").empty();
      currentSentence = sentences[sentenceIndex];
      $("#sentence").html(currentSentence);

      console.log(sentenceIndex, sentences.length);
      if (sentenceIndex > sentences.length - 1) {
        // END TIME
        let finish = event.timeStamp;
        let time = finish - startTime;
        time /= 6000;
        wpm = Math.round(54 / time - mistakes * 2);
        var c = confirm(
          "You typed " + wpm + " words per minute. Would you like to retry?"
        );
        if (c == true) {
          location.reload();
        }
      }
    } else {
      currentChar = currentSentence[letterIndex];
      $("#target-letter").html(currentChar);
    }
  });
});
