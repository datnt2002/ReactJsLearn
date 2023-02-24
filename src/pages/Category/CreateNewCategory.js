import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Input from "../../components/Tags/Input";
import Category from "./Category";
import { apiCategory } from "../../api/Api";
import "./category.css";

function CreateNewCategory() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const addedDate = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = { name, content, addedDate };
    // const options = ;

    fetch(apiCategory, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("cannot Post"));
  };

  return (
    <>
      <div className="container createCate">
        <div className="row">
          <div className="col-12">
            <h1>Create New Category</h1>
          </div>
          <div className="card">
            <form>
              <div class="mb-3">
                <Input
                  label="Name"
                  placeholder="Name of category"
                  className="form-control"
                  onSetState={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3">
                <Input
                  label="Content"
                  placeholder="Description of category"
                  className="form-control"
                  onSetState={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex justify-content-evenly">
                <button
                  type="submit"
                  class="btn btn-success"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <Link to="/Category">
                  <button type="cancel" class="btn btn-danger">
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/Category" element={<Category />}>
          {" "}
        </Route>
      </Routes>
    </>
  );
}

export default CreateNewCategory;
