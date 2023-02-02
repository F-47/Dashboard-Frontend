import { useState } from "react";
import useFetch from "../Utils/useFetch";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  let [projectName, setProjectName] = useState("");
  let [showAddModal, setShowAddModal] = useState(false);
  let [showMembersBox, setShowMembersBox] = useState(false);
  let [checkedMemberValues, setCheckedMemberValues] = useState([]);
  let [category, setCategory] = useState("");
  let [errorMsg, setErrorMsg] = useState("");
  let colors = ["red", "blue", "green", "purple"];
  const { isAuthenticated, isLoading } = useAuth0();
  let [projects, setProjects, isProjectsPending] = useFetch(
    `${process.env.REACT_APP_URL}getAllprojects`
  );

  function handleCheckBox(event) {
    let { value, checked } = event.target;
    if (checked) {
      setCheckedMemberValues([
        ...checkedMemberValues,
        {
          memberName: value,
          memberImage: event.target.getAttribute("data-img"),
        },
      ]);
    } else {
      setCheckedMemberValues(
        checkedMemberValues.filter((item) => item.memberName !== value)
      );
    }
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (category === "") {
      setErrorMsg("Please choose a category");
    }
    let project = {
      projectName,
      Members: checkedMemberValues,
      category,
    };
    let response = await fetch(process.env.REACT_APP_URL + "createProject", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (response.ok) {
      let newProject = await response.json();
      setProjectName("");
      setShowAddModal(false);
      setProjects([...projects, newProject]);
      setCheckedMemberValues([]);
      setCategory("");
      setShowMembersBox(false);
    } else if (response.status === 403) {
      let error = await response.json();
      setErrorMsg(error.message);
    } else {
      console.log("error occured");
    }
  };

  if (isLoading || isProjectsPending) {
    return (
      <div
        role="status"
        className="flex justify-center items-end px-3 py-3 h-96 md:py-0 md:-mt-7 md:ml-60"
      >
        <svg
          aria-hidden="true"
          className="w-28 h-28 mr-2 text-gray-200 animate-spin fill-black"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="px-3 py-3 md:py-0 md:-mt-7 md:ml-60">
      <div className="flex items-center justify-between h-20 w-full mb-4 px-7 capitalize bg-gray-50 text-black border-b-2 border-gray-300 ring-gray-400">
        <div className="logo text-2xl">Dashboard</div>
        {isAuthenticated && (
          <>
            <button
              className="bg-teal-700 hover:bg-teal-800 px-6 py-1 rounded-lg text-white"
              onClick={() => setShowAddModal(!showAddModal)}
            >
              Add
            </button>
            {showAddModal && (
              <>
                {/* Overlay */}
                <div
                  className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                  onClick={() => setShowAddModal(false)}
                  id="my-modal"
                ></div>
                {/* Modal  */}
                <div className="px-6 py-9 w-[500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md bg-white z-10">
                  <form onSubmit={handleSubmit}>
                    {errorMsg !== "" && (
                      <div className="mb-3 text-red-600 text-center">
                        {errorMsg}
                      </div>
                    )}
                    <div className="relative z-0 w-full mb-6">
                      <input
                        type="text"
                        name="projectName"
                        id="projectName"
                        value={projectName}
                        className="block peer-:bg-red-400 py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="projectName"
                        className={`absolute text-xl duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  ${
                          projectName !== ""
                            ? "text-blue-500 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        Project Name
                      </label>
                    </div>
                    {/* CheckBox  */}
                    <div className="relative z-0 w-full mb-6">
                      <div
                        className={`cursor-pointer border-b-2 ring-slate-600 w-full text-left text-xl relative ${
                          checkedMemberValues.length > 0
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => setShowMembersBox(!showMembersBox)}
                      >
                        Choose Members
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-400 absolute right-0 top-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                        />
                      </svg>

                      {showMembersBox && (
                        <ul className=" space-y-3 text-sm border-2 border-gray-200 py-4 px-3 1">
                          <li>
                            <div className="flex items-center">
                              <input
                                id="checkbox-item-1"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-500  transition duration-200 float-left mr-2 cursor-pointer"
                                type="checkbox"
                                onChange={handleCheckBox}
                                value="Fares"
                                data-img="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
                              />
                              <label
                                htmlFor="checkbox-item-1"
                                className="ml-2 text-lg font-medium text-gray-600 cursor-pointer peer-checked:text-blue-500"
                              >
                                Fares
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <input
                                id="checkbox-item-2"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-500  transition duration-200 float-left mr-2 cursor-pointer"
                                type="checkbox"
                                onChange={handleCheckBox}
                                value="Hesham"
                                data-img="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600"
                              />
                              <label
                                htmlFor="checkbox-item-2"
                                className="ml-2 text-lg font-medium text-gray-600 cursor-pointer"
                              >
                                Hesham
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <input
                                id="checkbox-item-3"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-500  transition duration-200 float-left mr-2 cursor-pointer"
                                type="checkbox"
                                onChange={handleCheckBox}
                                value="Gouda"
                                data-img="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600"
                              />
                              <label
                                htmlFor="checkbox-item-3"
                                className="ml-2 text-lg font-medium text-gray-600 cursor-pointer"
                              >
                                Gouda
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <input
                                id="checkbox-item-4"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-500  transition duration-200 float-left mr-2 cursor-pointer"
                                type="checkbox"
                                onChange={handleCheckBox}
                                value="Ahmed"
                                data-img="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1600"
                              />
                              <label
                                htmlFor="checkbox-item-4"
                                className="ml-2 text-lg font-medium text-gray-600 cursor-pointer"
                              >
                                Ahmed
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <input
                                id="checkbox-item-5"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-500  transition duration-200 float-left mr-2 cursor-pointer"
                                type="checkbox"
                                onChange={handleCheckBox}
                                value="Beshr"
                                data-img="https://images.pexels.com/photos/3875679/pexels-photo-3875679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              />
                              <label
                                htmlFor="checkbox-item-5"
                                className="ml-2 text-lg font-medium text-gray-600 cursor-pointer"
                              >
                                Beshr
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <input
                                id="checkbox-item-6"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-500 transition duration-200 float-left mr-2 cursor-pointer"
                                type="checkbox"
                                onChange={handleCheckBox}
                                value="Shamndy"
                                data-img="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              />
                              <label
                                htmlFor="checkbox-item-6"
                                className="ml-2 text-lg font-medium text-gray-600 cursor-pointer"
                              >
                                Shamndy
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <input
                                id="checkbox-item-7"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-500 transition duration-200 float-left mr-2 cursor-pointer"
                                type="checkbox"
                                onChange={handleCheckBox}
                                value="Mohab"
                                data-img="https://images.pexels.com/photos/1466561/pexels-photo-1466561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              />
                              <label
                                htmlFor="checkbox-item-7"
                                className="ml-2 text-lg font-medium text-gray-600 cursor-pointer"
                              >
                                Mohab
                              </label>
                            </div>
                          </li>
                        </ul>
                      )}
                    </div>

                    {/* Radio  */}
                    <div className="relative z-0 w-full mb-6">
                      <div
                        className={`border-b-2 w-full text-left text-xl  relative ${
                          category !== "" ? "text-blue-500" : "text-gray-500"
                        }`}
                      >
                        Category
                      </div>
                      <div className="flex items-center pl-3 pt-3 pb-3">
                        <input
                          id="radio-1"
                          type="radio"
                          value="Enginnering"
                          name="bordered-radio"
                          className="peer w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500"
                          checked={category === "Enginnering"}
                          onChange={() => setCategory("Enginnering")}
                        />
                        <label
                          htmlFor="radio-1"
                          className="peer-checked:text-blue-500  w-full ml-2 text-md  text-gray-600"
                        >
                          Enginnering
                        </label>
                      </div>
                      <div className="flex items-center pl-3 pb-3">
                        <input
                          id="radio-2"
                          type="radio"
                          value="Business"
                          name="bordered-radio"
                          className="peer w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500"
                          checked={category === "Business"}
                          onChange={() => setCategory("Business")}
                        />
                        <label
                          htmlFor="radio-2"
                          className="peer-checked:text-blue-500  w-full ml-2 text-md  text-gray-600"
                        >
                          Business
                        </label>
                      </div>
                      <div className="flex items-center pl-3 pb-3">
                        <input
                          id="radio-3"
                          type="radio"
                          value="Programming"
                          name="bordered-radio"
                          className="peer w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500"
                          checked={category === "Programming"}
                          onChange={() => setCategory("Programming")}
                        />
                        <label
                          htmlFor="radio-3"
                          className="peer-checked:text-blue-500  w-full ml-2 text-md  text-gray-600"
                        >
                          Programming
                        </label>
                      </div>
                      <div className="flex items-center pl-3 pb-3">
                        <input
                          id="radio-4"
                          type="radio"
                          value="Sport"
                          name="bordered-radio"
                          className="peer w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500"
                          checked={category === "Sport"}
                          onChange={() => setCategory("Sport")}
                        />
                        <label
                          htmlFor="radio-4"
                          className="peer-checked:text-blue-500  w-full ml-2 text-md  text-gray-600"
                        >
                          Sport
                        </label>
                      </div>
                      <div className="flex items-center pl-3 pb-3">
                        <input
                          id="radio-5"
                          type="radio"
                          value="Software"
                          name="bordered-radio"
                          className="peer w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500"
                          checked={category === "Software"}
                          onChange={() => setCategory("Software")}
                        />
                        <label
                          htmlFor="radio-5"
                          className="peer-checked:text-blue-500  w-full ml-2 text-md  text-gray-600"
                        >
                          Software
                        </label>
                      </div>
                      <div className="flex items-center pl-3 pb-3">
                        <input
                          id="radio-6"
                          type="radio"
                          value="Medical"
                          name="bordered-radio"
                          className="peer w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500"
                          checked={category === "Medical"}
                          onChange={() => setCategory("Medical")}
                        />
                        <label
                          htmlFor="radio-6"
                          className="peer-checked:text-blue-500  w-full ml-2 text-md  text-gray-600"
                        >
                          Medical
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-gray-900 w-full hover:bg-gray-700 px-2 py-1 rounded-xl text-white text-xl"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <table className="table-fixed w-full rounded bg-white ">
        <thead className="bg-gray-100">
          <tr className="text-left text-lg p-3">
            <th className="px-7 py-3">Project</th>
            <th className="px-7 py-3">Members</th>
            <th className="px-7 py-3">Category</th>
            <th className="px-7 py-3">Last Updated</th>
            <th className="px-7 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => {
            let date = new Date(item.date);
            return (
              <tr className="border-b-2 border-gray-200" key={item._id}>
                <td className="px-7 py-3 font-semibold">
                  <Link to={`project/${item._id}`} className="relative">
                    <div
                      className={`w-3 h-3 bg-${
                        colors[index > 3 ? index - 4 : index]
                      }-400 rounded-3xl absolute -left-1 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                    ></div>
                    <div className="hover:text-gray-600 ml-3 capitalize w-fit">
                      {item.projectName}
                    </div>
                  </Link>
                </td>
                <td className="px-7 py-3">
                  <div className="mt-3 flex items-center">
                    {item.Members.slice(0, 4).map((member, index) => {
                      return (
                        <img
                          key={index}
                          className="inline-block h-9 w-9 object-cover object-center rounded-full ring-2 ring-white"
                          src={member.memberImage}
                          alt={member.memberName}
                        />
                      );
                    })}
                    {item.Members.length - 4 > 0 ? (
                      <div className="text-gray-500 ml-3">
                        +{item.Members.length - 4}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
                <td className="px-7 py-3 capitalize text-gray-500">
                  {item.category || "Not added"}
                </td>
                <td className="px-7 py-3 text-gray-400">
                  {date.toDateString()}
                </td>
                <td className="px-7">
                  <button className="text-blue-500 hover:text-blue-300 cursor-pointer ">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
