import React, { useState, useEffect } from 'react'
import './DutyCell.scss'

function InputDuty(props) {
  let allDuties = props.allDuties

  if (allDuties) {
    debugger
    let dutie = allDuties.find(
      (d) => d.day === props.day && d.employee_id === props.employee_id
    )

    let [inputDutyValue, setInputDuty] = useState('-')

    useEffect(() => {
      dutie !== undefined ? setInputDuty(dutie.shift.abrv) : setInputDuty('-')
    }, [allDuties])

    const [DutyColor, setDutyColor] = useState('black')

    useEffect(() => {
      dutie !== undefined
        ? setDutyColor(dutie.shift.color_hex)
        : setDutyColor('black')
    }, [allDuties])

    const [CellStyle, setCellStyle] = useState('inputDutyForm')

    let color = DutyColor

    const inputColor = {
      color: color,
    }

    async function sendDuty(value, day, month, year, employee_id) {
      if (value !== '') {
        try {
          const { data } = await axios.patch(
            `http://127.0.0.1:8000/api/duty/`,
            {
              value,
              day,
              month,
              year,
              employee_id,
            }
          )

          const hex = data.new_duty.shift.color_hex

          if (data.length !== 0 || hex) {
            // console.log("UPDATE DONE!");
            setDutyColor(data.new_duty.shift.color_hex)
            setCellStyle('inputDutyForm')
          }
        } catch (error) {
          setCellStyle('error')
          setInputDuty('')
        }
      }
    }

    return (
      <input
        style={inputColor}
        className={CellStyle}
        value={inputDutyValue}
        onChange={(e) => setInputDuty(e.target.value)}
        onBlur={(e) =>
          sendDuty(
            inputDutyValue,
            props.day,
            props.month,
            props.year,
            props.employee_id
          )
        }
      />
    )
  }

  return <p>Loading...</p>
}

export default InputDuty
