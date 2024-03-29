import React, { useEffect } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import QualificationOverview from '../components/qualifications/QualificationOverview'
import UpdateQualification from '../components/qualifications/update/UpdateQualification'
import CreateQualification from '../components/qualifications/create/CreateQualification'
import EmployeesOverview from '../components/employees/EmployeesOverview'
import DutyOverview from '../components/dutyOverview/DutyOverview'
import UpdateEmployee from '../components/employees/update/UpdateEmployee'
import CreateEmployee from '../components/employees/create/CreateEmployee'
import ShiftOverview from '../components/shifts/ShiftOverview'
import ShiftTypeOverview from '../components/shiftTypes/ShiftTypeOverview'
import UpdateShift from '../components/shifts/update/UpdateShift'
import CreateShift from '../components/shifts/create/CreateShift'
import UpdateShiftType from '../components/shiftTypes/update/UpdateShiftType'
import CreateShiftType from '../components/shiftTypes/create/CreateShiftType'
import WishCreator from '../components/dutyOverview/employeeRow/employeeCell/wishCreator/WishCreator'
import EmployeeDetails from '../components/employees/show/employeeOverview/EmployeeDetails'
import { useDispatch } from 'react-redux'
import { getEmployeeData } from '../features/employees/employeeSlice'
import { getQualificationsData } from '../features/qualifications/qualificationSlice'
import { getShiftsData } from '../features/shifts/shiftSlice'
import { getShiftTypesData } from '../features/shiftTypes/shiftTypeSlice'
import { getDutiesData } from '../features/duties/dutySlice'
import { getWishesData } from '../features/wishes/wishSlice'
import { getPreferenceData } from '../features/preferences/preferenceSlice'

function Router() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmployeeData())
    dispatch(getQualificationsData())
    dispatch(getShiftsData())
    dispatch(getShiftTypesData())
    dispatch(getDutiesData())
    dispatch(getWishesData())
    dispatch(getPreferenceData())
  }, [])

  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        {/* <div className="py-4"> */}
        <Switch>
          <Route
            path="/qualification/edit/:id"
            component={UpdateQualification}
          />
          <Route path="/qualification/create" component={CreateQualification} />
          <Route path="/qualifications" component={QualificationOverview} />
          <Route path="/shift/edit/:id" component={UpdateShift} />
          <Route path="/shift/create" component={CreateShift} />
          <Route path="/shifts" component={ShiftOverview} />
          <Route path="/shift_type/edit/:id" component={UpdateShiftType} />
          <Route path="/shift_type/create" component={CreateShiftType} />
          <Route path="/shift_types" component={ShiftTypeOverview} />
          <Route path="/employee/edit/:id" component={UpdateEmployee} />
          <Route path="/employee/show/:id" component={EmployeeDetails} />
          <Route path="/employee/create" component={CreateEmployee} />
          <Route path="/employees" component={EmployeesOverview} />
          <Route path="/duties" component={DutyOverview} />
          <Route path="/wish_creator" component={WishCreator} />
          <Route exact path="/" component={DutyOverview} />
        </Switch>
        {/* </div> */}
      </BrowserRouter>
    </>
  )
}

export default Router
