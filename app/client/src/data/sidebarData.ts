import AddHours from '../img/alarm_add_24dp_FILL0_wght400_GRAD0_opsz24.svg?react'
import SetWorkHours from '../img/manage_history_24dp_FILL0_wght400_GRAD0_opsz24.svg?react'
import SumWorkTime from '../img/pending_actions_24dp_FILL0_wght400_GRAD0_opsz24.svg?react'
import ShowWorkTime from '../img/schedule_24dp_FILL0_wght400_GRAD0_opsz24.svg?react'
import { data } from './dataTypes'

const WORKHOURS_SIDEBAR_DATA: data[] = [
  { icon: ShowWorkTime, to: 'show-work-time', name: 'Show Work Time' },
  { icon: AddHours, to: 'add-work-time', name: 'Add Work Hours' },
  { icon: SumWorkTime, to: 'sum-work-time', name: 'Sum Work Time' },
  { icon: SetWorkHours, to: 'set-work-time', name: 'Set Work Time' },
]

export { WORKHOURS_SIDEBAR_DATA }
