import moment from './moment'

/**
 * @param {date|moment} startDate The start date
 * @param {date|moment} endDate The end date
 * @param {string} type The range type. eg: 'days', 'hours' etc
 */
export const getRange = (
  startDate: moment.MomentInput,
  endDate: moment.MomentInput,
  type: moment.unitOfTime.DurationConstructor
): moment.Moment[] => {
  const fromDate = moment(startDate)
  const toDate = moment(endDate)
  const diff = toDate.diff(fromDate, type)
  const range = []
  for (let i = 0; i < diff; i++) {
    range.push(moment(startDate).add(i, type))
  }
  return range
}
