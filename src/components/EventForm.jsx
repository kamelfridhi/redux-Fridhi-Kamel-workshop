import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { addEvent } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEventReducer } from "../redux/slices/eventSlice";

export const EventForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        name: "",
        description: "",
        img: "",
        price: 0,
        nbTickets: 0,
        nbParticipants: 0,
    });

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileInput = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.files[0].name });
    };

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     const eventResult = await addEvent(event);
    //     if (eventResult.status === 201) {
    //         navigate("/");
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addEventReducer(event));
        navigate("/");
    };

    return (
        <Container className="mt-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Event Description"
                        name="description"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formPrice">
                    <Form.Label>Ticket Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter TicketPrice"
                        name="price"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNbParticipants">
                    <Form.Label>Participants Number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Participants Number"
                        name="nbParticipants"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNbTickets">
                    <Form.Label>Tickets Number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Tickets Number"
                        name="nbTickets"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        placeholder="Image"
                        name="img"
                        onChange={handleFileInput}
                    />
                </Form.Group>

                <Button variant="outline-dark" type="submit" className="me-2">
                    Submit
                </Button>
                <Button variant="outline-dark" type="reset">
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};
