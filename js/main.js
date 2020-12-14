const $ = selector => document.querySelectorAll(selector)
const showEl = el => {
  el.classList.remove("hide")
  el.ontransitionend = () => el.hidden = false
}
const hideEl = el => {
  el.classList.add("hide")
  el.ontransitionend = () => el.hidden = true
}
const setOnTransitionEnd = (el, fn, timeout) =>
  el.ontransitionend = () => setTimeout(fn, timeout)

const weekDays = ["воскресенье", "понедельник", "вторник",
  "среда", "четверг", "пятница", "суббота"]
const whenWeekDays = ["воскресенье", "понедельник", "вторник",
  "среду", "четверг", "пятницу", "субботу"]
const engWeekDays = ["sunday", "mondey", "tuesday",
  "wednesday", "thursday", "friday", "saturday"]

onload = () => $("section").forEach(section => section.style.transition = "2s")
const weekDay = weekDays[new Date().getDay()]
const toEnglishWeekDay = day => engWeekDays[weekDays.indexOf(day)]
const toRussianWeekDay = day => weekDays[engWeekDays.indexOf(day)]
const toWhenWeekDay = day => whenWeekDays[weekDays.indexOf(day)]
let data

$(".today-week-day").forEach(el => el.innerText = weekDay)

setTimeout(() => {
  showEl(helloScreen)
  setOnTransitionEnd(helloScreen, () => {
    data = {
      daysForSport: JSON.parse(localStorage.daysForSport || "[]")
    }

    hideEl(helloScreen)
    setOnTransitionEnd(helloScreen, () => {
      if (!data.daysForSport.length) {
        showEl(selectDaysForSport1)
        setOnTransitionEnd(selectDaysForSport1, () => {
          hideEl(selectDaysForSport1)
          setOnTransitionEnd(selectDaysForSport1, () => {
            showEl(selectDaysForSport2)
            nextBtn.onclick = () => {
              const days = [...$(`#selectWeekDaysForSport div
                input[type="checkbox"]:checked`)].map(el => el.id)

              if (days.length != 3) {
                selectDaysForSport2Title.innerText = "Выберите 3 дня!"
              } else {
                localStorage.daysForSport = JSON.stringify(days)
                data.daysForSport = days
                hideEl(selectDaysForSport2)
                setOnTransitionEnd(selectDaysForSport2, checkThisDay)
              }
            }
          })
        }, 2000)
      } else {
        checkThisDay()
      }
    })
  }, 2000)
}, 1000)

function checkThisDay() {
  let nextDay = weekDays[weekDays.indexOf(weekDay) + 1]
  let msg

  do {
    nextDay = nextDay == "суббота" ? weekDays[0]
      : weekDays[weekDays.indexOf(nextDay) + 1]
  } while (!data.daysForSport.includes(toEnglishWeekDay(nextDay)))
  nextDay = toWhenWeekDay(nextDay)

  if (data.daysForSport.includes(toEnglishWeekDay(weekDay))) {
    msg = ", как раз время для занятий!"
    nextCheckThisDay1Btn.hidden = false
    nextCheckThisDay1Btn.onclick = startTraining
  } else {
    msg = `. Ближайщая тренировка будет в ${nextDay}.`
  }

  nextWeekDayForTraining.innerText = toWhenWeekDay(nextDay)
  checkThisDay1Desc.innerText = msg
  showEl(checkThisDay1)
}

function startTraining() {
  hideEl(checkThisDay1)
  setOnTransitionEnd(checkThisDay1, firstExercise)
}

function firstExercise() {
  showEl(firstExerciseScreen)
  toSecondExerciseButton1.onclick = () => {
    hideEl(firstExerciseScreen)
    setOnTransitionEnd(firstExerciseScreen, () => {
      goClock(15, secondExercise)
    })
  }
}

function secondExercise() {
  showEl(secondExerciseScreen)
  startClock(secondExerciseTimerText, 30, () => {
    hideEl(secondExerciseScreen)
    setOnTransitionEnd(secondExerciseScreen, () => {
      goClock(15, thirdExercise)
    })
  })
}

function thirdExercise() {
  showEl(thirdExerciseScreen)
  toFourthExerciseButton.onclick = () => {
    hideEl(thirdExerciseScreen)
    setOnTransitionEnd(thirdExerciseScreen, () => {
      goClock(15, fourthExercise)
    })
  }
}

function fourthExercise() {
  showEl(fourthExerciseScreen)
  toFifthExerciseButton.onclick = () => {
    hideEl(fourthExerciseScreen)
    setOnTransitionEnd(fourthExerciseScreen, () => {
      goClock(15, fifthExercise)
    })
  }
}

function fifthExercise() {
  showEl(fifthExerciseScreen)
  startClock(fifthExerciseTimerText, 30, () => {
    hideEl(fifthExerciseScreen)
    setOnTransitionEnd(fifthExerciseScreen, endTraining)
  })
}

function endTraining() {
  showEl(endTrainingScreen)
}

function goClock(time, fn) {
  showEl(clockScreen)
  startClock(clockText, time, fn)
}

function startClock(el, time, fn) {
  el.innerText = time
  let interval = setInterval(() => {
    el.innerText--
    if (+el.innerText <= 0) {
      clearInterval(interval)
      hideEl(clockScreen)
      fn()
    }
  }, 1000)
}