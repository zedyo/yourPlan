import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import QualificationCard from "./show/QualificationCard";
import { Button, Row, Container } from "react-bootstrap";

function Qualifications() {
    const [qualificationsData, setQualification] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(
                    "http://127.0.0.1:8000/api/qualifications",
                    {}
                );
                setQualification(data.qualifications);
            } catch (error) {
                console.log(error.message);
            }
        }
        getData();
    }, []);

    async function destroyData(deletedQualificationId) {
        try {
            const deleted_data = await axios.delete(
                `http://127.0.0.1:8000/api/qualifications/${deletedQualificationId}/`
            );
            setQualification(
                qualificationsData.filter(
                    (qualification) =>
                        qualification.id !==
                        deleted_data.data.deleted_qualification.id
                )
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">Qualifikationen</div>

                            <div className="card-body">
                                <Container
                                    style={{ margin: "0.3rem" }}
                                    fluid="sm"
                                >
                                    <Button
                                        href={`/qualification/create`}
                                        variant="outline-success"
                                    >
                                        Neue Qualifikation anlegen
                                    </Button>
                                </Container>
                                <Container fluid="sm">
                                    <Row>
                                        {qualificationsData.map(
                                            (qualificationObject) => (
                                                <QualificationCard
                                                    key={qualificationObject.id}
                                                    qualificationData={
                                                        qualificationObject
                                                    }
                                                    deleteHandler={destroyData}
                                                />
                                            )
                                        )}
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Qualifications;