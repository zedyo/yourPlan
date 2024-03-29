import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { postWishesData } from '../../../../../../features/wishes/wishSlice'
import moment from 'moment'

function WishCreatorModal(props) {
  const dispatch = useDispatch()
  const [wishData, setWish] = useState({
    employee_id: props.employeeId,
    year:
      moment().format('M') == 12 || moment().format('M') == 11
        ? ''
        : moment().format('YYYY'),
  })
  const { employeesData } = useSelector((store) => store.employees)
  const { shiftsData } = useSelector((store) => store.shifts)

  function emptyWishState() {
    setWish({})
  }

  //TODO: WunschModal hübscher gestalten

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Neuer Dienstwunsch
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group>
            <Row className="g-3">
              <Col md>
                <FloatingLabel controlId="floatingSelect" label="Mitarbeiter">
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={(e) =>
                      e.target.value !== null &&
                      setWish({
                        ...wishData,
                        employee_id: parseInt(e.target.value),
                      })
                    }
                    defaultValue={props.employeeId}
                  >
                    <option key="employee: null" value={null}>
                      -- Bitte auswählen --
                    </option>
                    {employeesData !== undefined &&
                      employeesData.map((employee) => (
                        <option
                          key={'Employee: ' + employee.id}
                          value={employee.id}
                        >
                          {employee.first_name} {employee.last_name}
                        </option>
                      ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelect" label="Wunschschicht">
                  <Form.Select
                    aria-label="Wish"
                    onChange={(e) =>
                      e.target.value !== null &&
                      setWish({
                        ...wishData,
                        shift_id: parseInt(e.target.value),
                      })
                    }
                  >
                    <option key="shift: null" value={null}>
                      -- Bitte auswählen --
                    </option>
                    {shiftsData !== undefined &&
                      shiftsData.map((shift) => (
                        <option key={'Shift: ' + shift.id} value={shift.id}>
                          {`${shift.abrv} ( ${shift.shift_type.name} )`}
                        </option>
                      ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col md className="g-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tag"
                  className="mb-3"
                >
                  <Form.Control
                    type="wish_day"
                    placeholder="01"
                    onChange={(e) =>
                      setWish({ ...wishData, day: parseInt(e.target.value) })
                    }
                    autoComplete="off"
                  />
                </FloatingLabel>
              </Col>
              <Col md className="g-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Monat"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={(e) =>
                      e.target.value !== null &&
                      setWish({ ...wishData, month: parseInt(e.target.value) })
                    }
                  >
                    <option value={null}>-- Bitte auswählen --</option>
                    <option value={1}>Januar</option>
                    <option value={2}>Februar</option>
                    <option value={3}>März</option>
                    <option value={4}>April</option>
                    <option value={5}>Mai</option>
                    <option value={6}>Juni</option>
                    <option value={7}>Juli</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>Oktober</option>
                    <option value={11}>November</option>
                    <option value={12}>Dezember</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md className="g-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Jahr"
                  className="mb-3"
                >
                  <Form.Control
                    type="wish_year"
                    placeholder="1986"
                    onChange={(e) =>
                      setWish({ ...wishData, year: parseInt(e.target.value) })
                    }
                    value={
                      moment().format('M') == 12 || moment().format('M') == 11
                        ? ''
                        : moment().format('YYYY')
                    }
                    autoComplete="off"
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={(emptyWishState, props.onHide)}
          >
            Abbrechen
          </Button>
          <Button
            variant="primary"
            onClick={() => dispatch(postWishesData(wishData))}
            type="submit"
          >
            Speichern
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default WishCreatorModal
