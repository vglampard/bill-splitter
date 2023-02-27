import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from '../counter/counterSlice';

import React from 'react'

export default function Result() {

const count = useSelector(selectCount)

  return (
    <div>{count}</div>
  )
}
