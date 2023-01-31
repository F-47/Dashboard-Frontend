import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useFetch from "../Utils/useFetch";

const Home = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  let { isPending, data } = useFetch(`${process.env.REACT_APP_URL}getAllprojects`);

  if (isLoading || isPending) {
    return (
      <div
        role="status"
        className="flex justify-center items-end px-3 py-3 h-96 md:py-0 md:-mt-7 md:ml-60"
      >
        <svg
          aria-hidden="true"
          className="w-28 h-28 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-black"
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
      <div className="flex items-center justify-between h-20 w-full mb-4 px-7 capitalize rounded bg-gray-50 text-black ring-2 ring-gray-400">
        <div className="logo text-2xl">Dashboard</div>
        {isAuthenticated && (
          <button className="bg-gray-900 hover:bg-gray-700 px-6 py-1 rounded-lg text-white">
            Add
          </button>
        )}
      </div>
      <table className="table-auto w-full rounded bg-white ">
        <thead className="bg-gray-100">
          <tr className="text-left text-lg p-3">
            <th className="px-7 py-3">Project</th>
            <th className="px-7 py-3">Members</th>
            <th className="px-7 py-3">Last Updated</th>
            <th className="px-7 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item)=>{
            let date = new Date(item.date)
            return <tr className="border-b-2 border-gray-200" key={item._id}>
            <td className="px-7 py-3 font-semibold">
              <Link to={`project/${item._id}`} className="hover:text-gray-600">
                {item.projectName}
              </Link>
            </td>
            <td className="px-7 py-3">
              <div className="mt-3 flex items-center">
                {item.Members.map((member,index)=>{
                  return <img key={index} className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src={member.image} alt={member.name}/>
                })}
                <div className="text-gray-500">{item.Members.length===1 ? "":"+1"+item.Members.length}</div>
              </div>
            </td>
            <td className="px-7 py-3 text-gray-400">{date.toDateString()}</td>
            <td className="px-7">
              <button className="text-blue-500 hover:text-blue-300 cursor-pointer ">
                Edit
              </button>
            </td>
          </tr>
          })}
          
        </tbody>
      </table>
    </div>
  );
};

export default Home;
