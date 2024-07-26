import React from 'react'
export type data = {
  icon: React.FC
  to: string
  name: string
}

export type AddWorkDayData = {
  date: string
  day: string
  startOfWork: string
  endOfWork: string
  location: string
  comment: string
}

export type SetShift = {
  company: string
  startOfShift: string
  endOfShift: string
}
