import React, { useState, useEffect } from "react";
import Input from "../../components/Tags/Input";
import "./event.css";
import { apiCategory, apiEvent } from "../../api/Api";
import "../../components/Tags/select.css";

function EditEvent({ token, style, handleClose, selectEventId }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [cateId, setCateId] = useState("");
  const [first_Closure, setFirstClosure] = useState("");
  //show list categories
  useEffect(() => {
    fetch(apiCategory, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    const fetchDataFunction = async () => {
      await fetch(apiEvent + `/${selectEventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setName(data.name);
          setContent(data.content);
          setCateId(data.cateId);
          setFirstClosure(data.first_Closure);
        })
        .catch((err) => console.log("edit404"));
    };
    fetchDataFunction();
  }, [token, selectEventId]);

  //handle submit event
  const handleEditEvent = (e) => {
    e.preventDefault();

    const newEditEvent = { name, content, cateId, first_Closure };

    fetch(apiEvent + `/${selectEventId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEditEvent),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        handleClose();
      })
      .catch((err) => console.log("cannot put event 404"));
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="container-fluid edit" style={style}>
      <div className="modalOverlay" onClick={handleClose}></div>
      <div className="modalEvent">
        <div className="createFormEvent">
          <form className="createFormEvent_Input">
            <div className="createFormEvent_Header">
              <h1>Edit Event</h1>
            </div>
            <div className="mb-3 mt-5">
              <Input
                value={name}
                type="text"
                label="Title"
                className="form-control"
                onSetState={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-5">
              <Input
                value={content}
                type="text"
                label="Description"
                className="form-control"
                onSetState={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mt-3 mb-3 row" style={{ overflow: "hidden" }}>
              <div className="col-lg-6">
                <span
                  style={{
                    background: "#9fa6b3",
                    color: "white",
                    display: "block",
                    padding: "5px 20px 5px 20px",
                    width: "fit-content",
                    fontWeight: "500",
                  }}
                >
                  Category
                </span>
                <div className="mb-3 select">
                  <select
                    className="form-control"
                    value={cateId}
                    onChange={(e) => setCateId(e.target.value)}
                  >
                    <option value="0" key="-1">
                      ---Please enter category---
                    </option>
                    {categories.map((category) => {
                      return (
                        <>
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <div>
                  <span
                    style={{
                      background: "#9fa6b3",
                      color: "white",
                      display: "block",
                      padding: "5px 20px 5px 20px",
                      width: "fit-content",
                      fontWeight: "500",
                    }}
                  >
                    First Closure Date
                  </span>
                  <div className="mb-3">
                    <input
                      value={first_Closure}
                      type="datetime-local"
                      onChange={(e) => setFirstClosure(e.target.value)}
                      style={{ height: "3.5em", width: "auto" }}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnForm d-flex justify-content-evenly">
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleEditEvent}
              >
                Submit
              </button>

              <button onClick={handleClose} className="btn btn-danger">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditEvent;
