import Helper from 'ember-helper'

function timeSince(timeStamp, now) {
  let secondsPast = (now.getTime() - timeStamp.getTime()) / 1000
  if (secondsPast < 60) {
    return `${parseInt(secondsPast)}s`
  }
  if (secondsPast < 3600) {
    return `${parseInt(secondsPast / 60)}m`
  }
  if (secondsPast <= 86400) {
    return `${parseInt(secondsPast / 3600)}h`
  }
  if (secondsPast > 86400) {
    let day = timeStamp.getDate()
    let month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(' ', '')
    let year =
      timeStamp.getFullYear() == now.getFullYear()
        ? ''
        : ` ${timeStamp.getFullYear()}`
    return `${day} ${month}${year}`
  }
}

export function timeFormat([date, compareDate = null] /* , hash*/) {
  if (!isNaN(date) && String(date).length === 10) {
    date = new Date(date * 1e3)
  }

  if (!compareDate) {
    compareDate = new Date()
  }
  return `${timeSince(date, compareDate)}`
}

export default Helper.helper(timeFormat)
