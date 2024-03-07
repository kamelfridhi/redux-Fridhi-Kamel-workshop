import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getallEvents, editEvent } from "../services/api";
import { useDispatch } from "react-redux";
import { updateEventReducer } from "../redux/slices/eventSlice";

function UpdateEvent() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    description: "",
    price: "",
    nbTickets: "",
    img: "",
    nbParticipants: "",
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (id) {
        try {
          const response = await getallEvents(id);
          setEvent({
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
            nbTickets: response.data.nbTickets,
            nbParticipants: response.data.nbParticipants,
            img: response.data.img,
          });
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      }
    };

    fetchEventDetails();
  }, [id]);

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await editEvent(id, event);
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error updating event:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = await editEvent(id, event);
    dispatch(updateEventReducer(updatedEvent));
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card p-3">
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={event.name || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionTextarea" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="descriptionTextarea"
            rows={3}
            name="description"
            value={event.description || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priceInput" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="priceInput"
            name="price"
            value={event.price || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nbTicketsInput" className="form-label">
            Number of Tickets
          </label>
          <input
            type="number"
            className="form-control"
            id="nbTicketsInput"
            name="nbTickets"
            value={event.nbTickets || ""}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="d-flex mt-3">
        <Button className="btn btn-primary me-3" type="submit">
          Update
        </Button>
        <Button className="btn btn-danger" onClick={handleCancel} type="button">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default UpdateEvent;
