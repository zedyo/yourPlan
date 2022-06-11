import React from 'react'
import QualificationCard from './show/QualificationCard'
import { Button, Row, Container, Card, Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'

function Qualifications() {
  const { qualificationsData } = useSelector((store) => store.qualifications)

  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <Stack direction="horizontal" gap={3}>
              <div>Qualifikationen</div>
              <div className="ms-auto">
                <Button
                  href={`/qualification/create`}
                  variant="outline-success"
                >
                  <AiOutlinePlus /> Neue Qualifikation
                </Button>
              </div>
            </Stack>
          </Card.Header>

          <Card.Body>
            <Container fluid="sm">
              <Row>
                {qualificationsData.map((qualificationObject) => (
                  <QualificationCard
                    key={qualificationObject.id}
                    qualificationData={qualificationObject}
                  />
                ))}
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Qualifications
