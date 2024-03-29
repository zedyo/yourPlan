import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getDutiesDataByMonth } from '../../features/duties/dutySlice'
import { daysToArray } from '../../util/daysToArray'
import DateSelector from './dateSelector/DateSelector'
import DaysRow from './daysRow/DaysRow'
import './DutyOverview.scss'
import EmployeeRow from './employeeRow/EmployeeRow'
import { holidays } from './daysRow/utils/holidays'
import { random } from 'lodash'
import ShiftTypeStatisticsContainer from './shiftTypeStatisticsContainer/ShiftTypeStatisticsContainer'
import Spinner from 'react-bootstrap/Spinner'

function DutyOverview() {
  moment.locale('de')

  const [dateSelectorData, setDateSelector] = useState({
    month: `${moment().format('M')}`,
    year: `${moment().format('YYYY')}`,
  })
  const { dutiesData, isLoading } = useSelector((store) => store.duties)
  const { employeesData } = useSelector((store) => store.employees)
  const { wishesData } = useSelector((store) => store.wishes)
  const { qualificationsData } = useSelector((store) => store.qualifications)
  const dispatch = useDispatch()
  const monthlyDays = daysToArray(dateSelectorData.year, dateSelectorData.month)

  useEffect(() => {
    dispatch(getDutiesDataByMonth(dateSelectorData))
  }, [dateSelectorData])

  const workingDays = monthlyDays.filter(
    (day) =>
      moment(
        `${dateSelectorData.year}-${dateSelectorData.month}-${day}`,
        'YYYY-M-D'
      ).format('dd') !== 'So' &&
      moment(
        `${dateSelectorData.year}-${dateSelectorData.month}-${day}`,
        'YYYY-M-D'
      ).format('dd') !== 'Sa' &&
      holidays.find(
        (holiday) =>
          holiday.date ===
          moment(
            `${dateSelectorData.year}-${dateSelectorData.month}-${day}`,
            'YYYY-M-D'
          ).format('YYYY-MM-DD')
      ) == undefined
  )

  if (dutiesData.length > 0 || isLoading == false) {
    return (
      <>
        <Container fluid style={{ padding: '0 5rem' }}>
          <div
            className="dateRow"
            style={{
              display: 'grid',
              gridTemplateColumns: `auto ${monthlyDays.length * 2.2}rem 6rem`,
              alignItems: 'center',
            }}
          >
            <div className="dateSelector">
              <DateSelector
                key="datechecker-render"
                dateSelectorData={dateSelectorData}
                setDateSelector={setDateSelector}
              />
            </div>

            <div>
              <DaysRow
                monthlyDays={monthlyDays}
                dateSelectorData={dateSelectorData}
              />
            </div>
          </div>
          <div>
            {qualificationsData.map((qualification) => {
              return (
                employeesData.filter(
                  (employee) => employee.qualification.id == qualification.id
                ).length > 0 && (
                  <div key={'qualifcationSection:' + qualification.id}>
                    <div className="qualificationSection">
                      {`${qualification.description}${
                        employeesData.filter(
                          (employee) =>
                            employee.qualification.id == qualification.id
                        ).length > 1
                          ? 'nen'
                          : ''
                      }`}
                    </div>
                    {employeesData
                      .filter(
                        (employee) =>
                          employee.qualification.id == qualification.id
                      )
                      .map((employee) => (
                        <EmployeeRow
                          key={
                            'EmployeeRow:' +
                            employee.id +
                            dateSelectorData.year +
                            dateSelectorData.month +
                            qualification.id
                          }
                          employeeData={employee}
                          dateSelectorData={dateSelectorData}
                          days={monthlyDays}
                          workingDays={workingDays}
                          employeeDuties={dutiesData.filter(
                            (d) => d.employee_id === employee.id
                          )}
                          employeeWishes={wishesData.filter(
                            (d) => d.employee_id === employee.id
                          )}
                        />
                      ))}
                  </div>
                )
              )
            })}
          </div>
          <div className="separator" />
          <div>
            <ShiftTypeStatisticsContainer
              key={
                'ShiftTypeStatisticsContainer: ' +
                dateSelectorData.year +
                dateSelectorData.month
              }
              days={monthlyDays}
              dateSelectorData={dateSelectorData}
            />
          </div>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Container fluid style={{ padding: '0 5rem' }}>
          <div
            className="dateRow"
            style={{
              display: 'grid',
              gridTemplateColumns: `auto ${monthlyDays.length * 2.2}rem 6rem`,
              alignItems: 'center',
            }}
          >
            <div className="dateSelector">
              <DateSelector
                key="datechecker-render"
                dateSelectorData={dateSelectorData}
                setDateSelector={setDateSelector}
              />
            </div>

            <div>
              <DaysRow
                monthlyDays={monthlyDays}
                dateSelectorData={dateSelectorData}
              />
            </div>
          </div>

          <Container>
            <Row>
              <Col>
                <div
                  style={{
                    height: '70vh',
                    display: 'grid',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Spinner animation="border" variant="secondary" />
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    )
  }
}

export default DutyOverview
